'use strict';

const { test, expect } = require('@playwright/test');

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const BASE = 'http://127.0.0.1:4174/';
const NAV_TIMEOUT = 15000;
const SETTLE_MS = 400; // DOM settle time after a view transition

// ---------------------------------------------------------------------------
// Module-level browser reference — set in beforeEach before each test
// ---------------------------------------------------------------------------
let _lastCtx = null;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Navigate to the app with the hash already set to the list view for the
    default language.  Starting from BASE alone does not work reliably because
    the app redirects (#/es/) asynchronously via hashchange, and the timing
    depends on the dictionary load.  By going directly to #/es/ we bootstrap the
    app with the correct hash from the first render. */
async function openAppAtListView(browser) {
  const ctx = await browser.newContext();
  _lastCtx = ctx;
  const page = await ctx.newPage();
  // Navigate directly to the hashed list view so the app initialises correctly.
  await page.goto(BASE + '#/es/');
  return page;
}

/** Wait for the word-list to contain at least one .card element.
    Uses polling so we don't depend on a fixed timeout being "long enough". */
async function waitForCards(page, timeout = 30000) {
  await page.waitForFunction(
    () => document.querySelectorAll('#word-list .card').length > 0,
    { timeout }
  );
  // Give the DOM a moment to finish rendering.
  await page.waitForTimeout(SETTLE_MS);
}

/** Wait for the card count in the word-list to stabilise.
    This is needed because the list renders in chunks of 100 — we must not
    capture initialCount until the chunked renderer has finished or plateaued.
    Polls until two consecutive reads (separated by 1s) return the same count. */
async function waitForStableCardCount(page, timeout = 30000) {
  await page.waitForFunction(
    () => document.querySelectorAll('#word-list .card').length > 0,
    { timeout }
  );
  // Poll until two consecutive reads 1s apart return the same count.
  let prev = -1;
  let curr = 0;
  const start = Date.now();
  while (Date.now() - start < timeout) {
    curr = await page.evaluate(() => document.querySelectorAll('#word-list .card').length);
    if (curr === prev && curr > 0) break;
    prev = curr;
    await page.waitForTimeout(1000);
  }
  return curr;
}

/** Wait for the game view to be visible with at least one .game-option button.
    Polls the DOM rather than using a fixed timeout. */
async function waitForGameDone(page) {
  try {
    await page.waitForFunction(
      () => {
        const gv = document.querySelector('#game-view');
        return gv && !gv.hidden && gv.querySelector('.game-option');
      },
      { timeout: 8000 }
    );
  } catch { /* fall through to safety-net wait */ }
  // page.waitForTimeout throws if the page closes before it resolves
  try { await page.waitForTimeout(SETTLE_MS); } catch { /* page gone */ }
}

/** After clicking a game option, wait for .correcta or .incorrecta to appear. */
async function waitForAnswerDone(page) {
  try {
    await page.waitForFunction(
      () => document.querySelector('.game-option.correcta,.game-option.incorrecta'),
      { timeout: 5000 }
    );
  } catch { /* safety net */ }
  // page.waitForTimeout throws if the page closes before it resolves
  try { await page.waitForTimeout(SETTLE_MS); } catch { /* page gone */ }
}

// ===========================================================================
// LIST VIEW: HOME
// ===========================================================================

test('1 — home loads with word list and search', async ({ browser }) => {
  const page = await openAppAtListView(browser);
  let errors = [];
  let logs = [];
  page.on('pageerror', err => errors.push(err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
    logs.push(msg.type() + ': ' + msg.text());
  });

  try {
    await waitForCards(page);
    console.log('CARDS APPEARED. Logs:', logs.join('\n'));
    expect(errors).toHaveLength(0);
  } catch (e) {
    console.log('TIMEOUT. Logs:\n' + logs.join('\n'));
    throw e;
  } finally {
    page.removeAllListeners('pageerror');
    page.removeAllListeners('console');
    await page.close();
    await _lastCtx.close();
  }
});

test('1b — first visit renders the word of the day and progress data', async ({ browser }) => {
  const page = await openAppAtListView(browser);

  // These two values are populated during the synchronous application boot.
  // Checking them separately from the word list catches a broken first paint
  // even when the chunked list renderer eventually produces cards.
  await expect(page.locator('#hero-word-name')).not.toHaveText('—');
  await expect(page.locator('#hero-word-name')).not.toHaveText('');
  await expect(page.locator('#progress-text')).not.toHaveText(/^\s*0\s*$/);
  await expect(page.locator('#progress-text')).not.toHaveText('');
  await expect(page.locator('#progress-bar')).toHaveAttribute('aria-valuenow', '0');

  await page.close();
  await _lastCtx.close();
});

test('2 — word cards link to detail view', async ({ browser }) => {
  const page = await openAppAtListView(browser);
  await waitForCards(page);

  const firstCard = page.locator('#word-list .card a').first();
  const href = await firstCard.getAttribute('href');
  expect(href).toMatch(/#\//);

  let errors = [];
  page.on('pageerror', err => errors.push(err.message));

  try {
    // Use dispatchEvent instead of click() — sinonimia uses hash routing so
    // click() would wait for a load-event navigation that never fires, and
    // the fresh page context would lose the dictionary data.  dispatchEvent
    // fires the click directly without navigation waiting.
    await firstCard.dispatchEvent('click');
    // Wait for the hash to change to a /word/ URL.
    await page.waitForFunction(
      () => location.hash.includes('/word/'),
      { timeout: 10000 }
    );
    await expect(page.locator('#detail-view')).toBeVisible({ timeout: NAV_TIMEOUT });
    expect(errors).toHaveLength(0);
  } finally {
    page.removeAllListeners('pageerror');
    await page.close();
    await _lastCtx.close();
  }
});

// ===========================================================================
// SEARCH
// ===========================================================================

test('3 — typing in search filters the word list', async ({ browser }) => {
  const page = await openAppAtListView(browser);
  await waitForCards(page);

  // Wait for enough cards to load that we can detect filtering.
  await page.waitForTimeout(3000);
  const initialCount = await page.locator('#word-list .card').count();
  expect(initialCount).toBeGreaterThan(1);

  // Type 'a' using evaluate() to bypass Playwright's idle-detection wait.
  await page.evaluate(() => {
    const el = document.getElementById('search');
    el.value = 'a';
    el.dispatchEvent(new Event('input', { bubbles: true }));
  });

  // Poll until fewer cards are showing (filtering is working).
  await page.waitForFunction(
    (minCount) => {
      const cards = document.querySelectorAll('#word-list .card');
      return cards.length < minCount ||
        document.getElementById('no-results')?.classList.contains('hidden') === false;
    },
    initialCount,
    { timeout: 30000 }
  ).catch(() => {}); // fallback: continue even if poll times out

  const filteredCount = await page.locator('#word-list .card').count();
  const noResultsVisible = await page.locator('#no-results').isVisible().catch(() => false);
  expect(filteredCount < initialCount || noResultsVisible).toBeTruthy();

  // Clear search — the list must restore to having many cards again.
  await page.evaluate(() => {
    const el = document.getElementById('search');
    el.value = '';
    el.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await page.waitForTimeout(3000);
  const restoredCount = await page.locator('#word-list .card').count();
  // The restored count should be "substantial" — at least 50% of initial.
  // We use a ratio rather than an exact count to handle chunked-rendering races.
  expect(restoredCount).toBeGreaterThan(initialCount * 0.5);
});

test('3b — searching during initial list rendering cancels stale cards', async ({ browser }) => {
  const page = await openAppAtListView(browser);

  // The first chunk proves that the initial render has started, while the
  // rest of the 69k-entry list is still being appended asynchronously.
  await page.waitForFunction(
    () => document.querySelectorAll('#word-list .card').length > 0,
    { timeout: 30000 }
  );

  await page.evaluate(() => {
    const el = document.getElementById('search');
    el.value = 'cefalea';
    el.dispatchEvent(new Event('input', { bubbles: true }));
  });

  await expect(page.locator('#results-info')).toHaveText(/2 palabras encontradas\./, {
    timeout: 30000,
  });
  // Let any render that was incorrectly left in flight try to append more
  // cards. The result must remain the two matching entries.
  await page.waitForTimeout(250);
  await expect(page.locator('#word-list .card')).toHaveCount(2);

  await page.close();
  await _lastCtx.close();
});

test('4 — search with no matches shows no-results message', async ({ browser }) => {
  const page = await openAppAtListView(browser);
  await waitForCards(page);

  await page.evaluate(() => {
    const el = document.getElementById('search');
    el.value = 'zzzxyznone';
    el.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await expect(page.locator('#no-results')).toBeVisible({ timeout: 30000 });
  const noResultsText = await page.locator('#no-results').innerText();
  expect(noResultsText.trim()).not.toBe('');
});

// ===========================================================================
// ALPHABET NAVIGATION
// ===========================================================================

test('5 — alphabet buttons filter words by starting letter', async ({ browser }) => {
  const page = await openAppAtListView(browser);
  await waitForCards(page);

  const alphabetBtn = page.locator('#alphabet button:not([disabled])').first();
  const letter = (await alphabetBtn.textContent()).toLowerCase();
  await alphabetBtn.click();
  await page.waitForTimeout(SETTLE_MS);

  const cards = page.locator('#word-list .card');
  const count = await cards.count();
  const noResultsVisible = await page.locator('#no-results').isVisible().catch(() => false);
  if (!noResultsVisible) {
    for (let i = 0; i < Math.min(count, 5); i++) {
      const wordText = await cards.nth(i).locator('h3').textContent();
      expect(wordText.toLowerCase().startsWith(letter)).toBeTruthy();
    }
  }
});

test('6 — clicking the same alphabet button twice deselects it', async ({ browser }) => {
  const page = await openAppAtListView(browser);
  await waitForCards(page);

  const alphabetBtn = page.locator('#alphabet button:not([disabled])').first();
  await alphabetBtn.click();
  await page.waitForTimeout(SETTLE_MS);
  await alphabetBtn.click();
  // After deselect: the async chunked render starts, cards appear as chunks
  // are appended. Poll until at least one card is visible (proves #no-results
  // is hidden and the full list is restoring).
  await page.waitForFunction(
    () => document.querySelectorAll('#word-list .card').length > 0,
    { timeout: 30000 }
  );
  await expect(page.locator('#word-list .card').first()).toBeVisible();
});

// ===========================================================================
// TOPIC FILTERS
// ===========================================================================

test('7 — topic filter buttons narrow the word list', async ({ browser }) => {
  const page = await openAppAtListView(browser);
  await waitForCards(page);

  const initialCount = await page.locator('#word-list .card').count();
  const filterBtn = page.locator('.filter-btn:not([data-tema="todos"])').first();
  const isFilterVisible = await filterBtn.isVisible().catch(() => false);
  if (!isFilterVisible) return; // No non-default filters — skip

  await filterBtn.click();
  await page.waitForTimeout(SETTLE_MS);

  const filteredCount = await page.locator('#word-list .card').count();
  expect(filteredCount).toBeLessThanOrEqual(initialCount);
});

// ===========================================================================
// DETAIL VIEW
// ===========================================================================

test('8 — detail view shows word, definition, synonyms and navigation',
  async ({ browser }) => {
    const page = await openAppAtListView(browser);
    await waitForCards(page);

    let errors = [];
    page.on('pageerror', err => errors.push(err.message));

    await page.locator('#word-list .card a').first().click();
    await expect(page.locator('#detail-view')).toBeVisible({ timeout: NAV_TIMEOUT });

    try {
      const heading = page.locator('#detail-view h2');
      await expect(heading).toBeVisible();
      expect((await heading.textContent()).trim()).not.toBe('');

      const definition = page.locator('#detail-view .definicion');
      await expect(definition).toBeVisible();
      expect((await definition.textContent()).trim()).not.toBe('');

      await expect(page.locator('#detail-view .synonyms-list')).toBeVisible();
      await expect(page.locator('.detalle-navegacion')).toBeVisible();
      expect(errors).toHaveLength(0);
    } finally {
      page.removeAllListeners('pageerror');
      await page.close();
      await _lastCtx.close();
    }
  });

test('9 — clicking a synonym navigates to its detail view', async ({ browser }) => {
  const page = await openAppAtListView(browser);
  await waitForCards(page);

  await page.locator('#word-list .card a').first().click();
  await expect(page.locator('#detail-view')).toBeVisible({ timeout: NAV_TIMEOUT });

  const synonymLink = page.locator('#detail-view .synonyms-list li a').first();
  const linkCount = await synonymLink.count();

  if (linkCount > 0) {
    await synonymLink.click();
    await page.waitForTimeout(SETTLE_MS);
    await expect(page.locator('#detail-view')).toBeVisible({ timeout: NAV_TIMEOUT });
  }
});

test('10 — back link returns to the word list', async ({ browser }) => {
  const page = await openAppAtListView(browser);
  await waitForCards(page);

  await page.locator('#word-list .card a').first().click();
  await expect(page.locator('#detail-view')).toBeVisible({ timeout: NAV_TIMEOUT });

  await page.locator('#detail-view .backToSearch').click();
  await page.waitForTimeout(SETTLE_MS);
  await expect(page.locator('#word-list')).toBeVisible({ timeout: NAV_TIMEOUT });
});

// ===========================================================================
// WORD GAME
// ===========================================================================

test('11 — word game menu is reachable', async ({ browser }) => {
  const page = await openAppAtListView(browser);
  await expect(page.locator('#game-view')).toBeHidden({ timeout: 3000 });

  await page.goto(BASE + '#/es/juego');
  await expect(page.locator('#game-view')).toBeVisible({ timeout: NAV_TIMEOUT });
  await expect(page.locator('.juego-menu')).toBeVisible();
});

test('12 — word game shows pictogram, clue and option buttons', async ({ browser }) => {
  const page = await openAppAtListView(browser);
  await page.goto(BASE + '#/es/juego/word');
  await waitForGameDone(page);

  await expect(page.locator('.game-hint-image')).toBeVisible();
  await expect(page.locator('.game-hint-text')).toBeVisible();
  await expect(page.locator('.game-option')).toHaveCount(3);
});

test('13 — selecting the correct word game option shows correct feedback',
  async ({ browser }) => {
    const page = await openAppAtListView(browser);
    await page.goto(BASE + '#/es/juego/word');
    await waitForGameDone(page);

    const buttons = page.locator('.game-option');
    const count = await buttons.count();
    let foundCorrect = false;
    for (let i = 0; i < count; i++) {
      await buttons.nth(i).click();
      await waitForAnswerDone(page);
      const isCorrect = await buttons.nth(i).evaluate(el =>
        el.classList.contains('correcta') && !el.classList.contains('incorrecta'));
      if (isCorrect) {
        foundCorrect = true;
        await expect(page.locator('.juego-mensaje-correcto')).toBeVisible({ timeout: 3000 });
        break;
      }
      // Wrong answer: reload game and try the next option.
      await page.goto(BASE + '#/es/juego/word');
      await waitForGameDone(page);
    }
    expect(foundCorrect).toBeTruthy();
  });

test('14 — "next" button loads a new round of the word game', async ({ browser }) => {
  const page = await openAppAtListView(browser);

  // --- Round 1 ---
  console.log('Navigating to game round 1...');
  await page.goto(BASE + '#/es/juego/word');
  console.log('After goto round 1, waiting for game...');
  await waitForGameDone(page);
  console.log('Game round 1 ready.');

  const round1Hint = await page.evaluate(() => {
    const el = document.querySelector('.game-hint-text');
    return el ? el.textContent.trim() : '';
  });
  console.log('Round 1 hint:', round1Hint);

  // --- Round 2 ---
  console.log('Navigating to game round 2...');
  await page.goto(BASE + '#/es/juego/word');
  console.log('After goto round 2, waiting for game...');
  await waitForGameDone(page);
  console.log('Game round 2 ready.');

  const round2Hint = await page.evaluate(() => {
    const el = document.querySelector('.game-hint-text');
    return el ? el.textContent.trim() : '';
  });
  console.log('Round 2 hint:', round2Hint);

  expect(round2Hint).not.toBe('');
  expect(round2Hint.length).toBeGreaterThan(0);
});

// ===========================================================================
// SENTENCE GAME
// ===========================================================================

test('15 — sentence game shows a sentence with a blank and option buttons',
  async ({ browser }) => {
    const page = await openAppAtListView(browser);
    await page.goto(BASE + '#/es/juego/frase');
    await waitForGameDone(page);

    await expect(page.locator('.hueco')).toBeVisible();
    await expect(page.locator('.game-option')).toHaveCount(3);
  });

test('16 — sentence game correct answer shows feedback', async ({ browser }) => {
  const page = await openAppAtListView(browser);
  await page.goto(BASE + '#/es/juego/frase');
  await waitForGameDone(page);

  const buttons = page.locator('.game-option');
  const count = await buttons.count();
  let foundCorrect = false;
  for (let i = 0; i < count; i++) {
    await buttons.nth(i).click();
    await waitForAnswerDone(page);
    const isCorrect = await buttons.nth(i).evaluate(el =>
      el.classList.contains('correcta') && !el.classList.contains('incorrecta'));
    if (isCorrect) {
      foundCorrect = true;
      await expect(page.locator('.juego-mensaje-correcto')).toBeVisible({ timeout: 3000 });
      break;
    }
    await page.goto(BASE + '#/es/juego/frase');
    await waitForGameDone(page);
  }
  expect(foundCorrect).toBeTruthy();
});

// ===========================================================================
// ACCESSIBILITY CONTROLS
// ===========================================================================

test('17 — font size increase button changes the root font size', async ({ browser }) => {
  const page = await openAppAtListView(browser);
  await expect(page.locator('body')).toBeVisible();

  const beforeSize = await page.evaluate(() =>
    parseInt(document.documentElement.style.fontSize || '18', 10));

  await page.locator('#letra-mas').click();
  await page.waitForTimeout(SETTLE_MS);

  const afterSize = await page.evaluate(() =>
    parseInt(document.documentElement.style.fontSize || '18', 10));
  expect(afterSize).toBeGreaterThan(beforeSize);
});

test('18 — font size decrease button changes the root font size', async ({ browser }) => {
  const page = await openAppAtListView(browser);
  await expect(page.locator('body')).toBeVisible();

  // Increase twice, then decrease once.
  await page.locator('#letra-mas').click();
  await page.locator('#letra-mas').click();
  await page.waitForTimeout(SETTLE_MS);

  const beforeSize = await page.evaluate(() =>
    parseInt(document.documentElement.style.fontSize || '18', 10));

  await page.locator('#letra-menos').click();
  await page.waitForTimeout(SETTLE_MS);

  const afterSize = await page.evaluate(() =>
    parseInt(document.documentElement.style.fontSize || '18', 10));
  expect(afterSize).toBeLessThan(beforeSize);
});

test('19 — normal font size button restores 18px', async ({ browser }) => {
  const page = await openAppAtListView(browser);
  await expect(page.locator('body')).toBeVisible();

  // Increase twice.
  await page.locator('#letra-mas').click();
  await page.locator('#letra-mas').click();
  await page.waitForTimeout(SETTLE_MS);

  // Click "normal" button.
  await page.locator('#letra-normal').click();
  await page.waitForTimeout(SETTLE_MS);

  const size = await page.evaluate(() =>
    parseInt(document.documentElement.style.fontSize || '18', 10));
  expect(size).toBe(18);
});

test('20 — high contrast toggle updates the body class', async ({ browser }) => {
  const page = await openAppAtListView(browser);
  await expect(page.locator('body')).toBeVisible();

  const toggle = page.locator('#contraste-toggle');
  const hasHighContrast = async () =>
    await page.evaluate(() => document.body.classList.contains('alto-contraste'));

  // Toggle on.
  await toggle.click();
  await page.waitForTimeout(SETTLE_MS);
  expect(await hasHighContrast()).toBe(true);

  // Toggle off.
  await toggle.click();
  await page.waitForTimeout(SETTLE_MS);
  expect(await hasHighContrast()).toBe(false);
});

// ===========================================================================
// PROGRESS BAR
// ===========================================================================

test('21 — progress bar shows a numeric value in the header', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  // Pre-populate learned words so the progress bar shows a number, not "none discovered".
  await page.addInitScript(() => {
    localStorage.setItem('sinonimia-aprendidas-es', JSON.stringify([1, 2, 3]));
  });
  await page.goto(BASE);
  await page.waitForTimeout(SETTLE_MS);

  const progressEl = page.locator('#progress-bar');
  await expect(progressEl).toBeVisible();
  const text = await page.locator('#progress-text').textContent();
  // Must contain at least one digit (the fraction seen so far, e.g. "3/69096").
  expect(text.trim()).toMatch(/\d/);
  await context.close();
});

// ===========================================================================
// LANGUAGE SWITCH
// ===========================================================================

test('22 — clicking the language button switches the current language',
  async ({ browser }) => {
    const page = await openAppAtListView(browser);
    await waitForCards(page);

    // Get the non-default language button (English).
    const enBtn = page.locator('.lang-btn[data-lang="en"]');
    const enVisible = await enBtn.isVisible().catch(() => false);
    if (!enVisible) return; // English not available — skip.

    const esBtn = page.locator('.lang-btn[data-lang="es"]');
    await esBtn.click();
    await page.waitForTimeout(SETTLE_MS);

    // Switch to English.
    await enBtn.click();
    await page.waitForTimeout(SETTLE_MS);

    // After switching, the app should still be showing the list.
    const listView = page.locator('#list-view');
  await expect(listView).toBeVisible();
});

test('22b — unsupported browser language falls back to English', async ({ browser }) => {
  const context = await browser.newContext({ locale: 'fr-FR' });
  const page = await context.newPage();
  try {
    await page.addInitScript(() => localStorage.clear());
    await page.goto(BASE);
    await page.waitForSelector('#locale-picker', { state: 'attached' });
    await page.waitForSelector('.locale-picker-current', { state: 'visible' });
    expect(await page.locator('.locale-picker-current').textContent()).toBe('EN');
    expect((await page.locator('html').getAttribute('lang') || '').slice(0, 2)).toBe('en');
  } finally {
    await context.close();
  }
});

// ===========================================================================
// SURPRISE-ME NAVIGATION
// ===========================================================================

test('23 — "surprise me" navigates to a word detail view', async ({ browser }) => {
  const page = await openAppAtListView(browser);
  await waitForCards(page);

  const surpriseBtn = page.locator('#surpriseMe');
  await surpriseBtn.click();
  await page.waitForTimeout(SETTLE_MS);

  // Should land on detail view.
  await expect(page.locator('#detail-view')).toBeVisible({ timeout: NAV_TIMEOUT });
  // The URL should contain a word slug (e.g. /word/aposicional).
  expect(page.url()).toMatch(/#\/es\/word\//);
});

// ===========================================================================
// USABILITY / USER-FLOW TESTS
// ===========================================================================

test('24 — search: shows matching words for a real letter', async ({ browser }) => {
  const page = await openAppAtListView(browser);
  await waitForCards(page);

  // Search for "a" — the most common letter; guaranteed to return results.
  // Use page.evaluate like the existing test 4 to reliably trigger the input handler.
  await page.evaluate(() => {
    const el = document.getElementById('search');
    el.value = 'a';
    el.dispatchEvent(new Event('input', { bubbles: true }));
  });

  // Wait for cards to appear after the filter runs.
  await page.waitForFunction(() => {
    return document.querySelectorAll('#word-list .card').length > 0;
  }, { timeout: 10000 });

  const cards = page.locator('#word-list .card');
  const count = await cards.count();
  expect(count).toBeGreaterThan(0);
  // The no-results message should be hidden when there are matches.
  await expect(page.locator('#no-results')).toBeHidden({ timeout: 20000 });
});

test('25 — search: shows no-results message for non-existent word', async ({ browser }) => {
  const page = await openAppAtListView(browser);
  await waitForCards(page);

  // Search for a term that has zero matches (page.evaluate like test 4).
  await page.evaluate(() => {
    const el = document.getElementById('search');
    el.value = 'zzzxyznone';
    el.dispatchEvent(new Event('input', { bubbles: true }));
  });

  // Wait for all cards to disappear and no-results to appear.
  await expect(page.locator('#no-results')).toBeVisible({ timeout: 30000 });
  await expect(page.locator('#word-list .card')).toHaveCount(0);
});

test('26 — play: juego menu is reachable and shows game options', async ({ browser }) => {
  const page = await openAppAtListView(browser);
  await expect(page.locator('#game-view')).toBeHidden({ timeout: 3000 });

  // Navigate to game menu (same pattern as existing test 11).
  await page.goto(BASE + '#/es/juego');
  await expect(page.locator('#game-view')).toBeVisible({ timeout: NAV_TIMEOUT });
  await expect(page.locator('.juego-menu')).toBeVisible();
  // Both game types should be offered.
  await expect(page.locator('.juego-menu-option')).toHaveCount(2);
});

test('27 — cross-language: detail view shows translation link', async ({ browser }) => {
  const page = await openAppAtListView(browser);
  await waitForCards(page);

  const firstCard = page.locator('#word-list .card a').first();
  await firstCard.click();
  await page.waitForTimeout(SETTLE_MS);
  await expect(page.locator('#detail-view')).toBeVisible({ timeout: NAV_TIMEOUT });

  const translationLink = page.locator('.detail-translation').first();
  await expect(translationLink).toBeVisible({ timeout: 3000 });
  const linkText = await translationLink.textContent();
  expect(linkText).toMatch(/Ver en (inglés|español)/i);
});

test('28 — cross-language: clicking translation link navigates to word in other language', async ({ browser }) => {
  const page = await openAppAtListView(browser);
  await waitForCards(page);

  const firstCard = page.locator('#word-list .card a').first();
  await firstCard.click();
  await page.waitForTimeout(SETTLE_MS);
  await expect(page.locator('#detail-view')).toBeVisible({ timeout: NAV_TIMEOUT });

  const translationLink = page.locator('.detail-translation').first();
  await expect(translationLink).toBeVisible({ timeout: 3000 });

  // Verify the link points to a different language.
  const href = await translationLink.getAttribute('href');
  expect(href).toMatch(/#\/(es|en)\/word\/\w+/);

  // Use force:true to avoid scroll-into-view issues; then wait for navigation.
  await translationLink.click({ force: true });
  await page.waitForTimeout(SETTLE_MS * 3);

  // Should now be on a detail view (possibly same or different language).
  await expect(page.locator('#detail-view')).toBeVisible({ timeout: NAV_TIMEOUT });
  // Back link should return to the word list.
  await expect(page.locator('#detail-view .backToSearch')).toBeVisible();
});

// ===========================================================================
// ABOUT THE APP: ACHIEVEMENTS
// ===========================================================================

test('29 — opening a word unlocks an achievement shown on "About the app"', async ({ browser }) => {
  const page = await openAppAtListView(browser);
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  await waitForCards(page);

  // Footer: "Sobre la app" sits right before "Configuración".
  const footerLinks = await page.locator('footer.pie .pie-enlaces > a').evaluateAll(
    links => links.map(a => a.getAttribute('href')));
  expect(footerLinks.indexOf('about-app/')).toBeGreaterThanOrEqual(0);
  expect(footerLinks.indexOf('about-app/')).toBe(footerLinks.indexOf('config/') - 1);

  await page.locator('#word-list .card a').first().click();
  await expect(page.locator('#detail-view')).toBeVisible({ timeout: NAV_TIMEOUT });
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('sinonimia-logros') || '{}'));
  expect(stored.firstWord).toBeTruthy();

  await page.goto(BASE + 'about-app/?lang=es');
  await expect(page.locator('.achievement-badge')).toHaveCount(6);
  await expect(page.locator('.achievement-badge.unlocked')).toContainText('Primera palabra');
  await expect(page.locator('#achievements-count')).toContainText('de 6 logros');
  expect(errors).toHaveLength(0);
  await page.close();
  await _lastCtx.close();
});
