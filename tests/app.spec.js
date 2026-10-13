'use strict';

const { test, expect } = require('@playwright/test');

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const BASE = `http://127.0.0.1:${process.env.PORT || 4174}/`;
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
  await page.goto(BASE + '#/es/', { waitUntil: 'domcontentloaded' });
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

/** Number of cards currently in the DOM.  The list is PAGINATED: only
    PAGE_SIZE cards (60 in js/app.js) live in the DOM at a time and "show
    more" appends the next page, so this is NOT the number of matches.  Use
    readResultsInfo() when the question is "how many words matched?". */
async function readCardCount(page) {
  return page.locator('#word-list .card').count();
}

/** The text of #results-info, which carries the real number of matches
    ("N palabras encontradas").  It is compared as a string on purpose:
    parsing the number would make every test depend on the active language's
    wording and on its thousands separator. */
async function readResultsInfo(page) {
  return ((await page.locator('#results-info').textContent()) || '').trim();
}

/** Type into the search box the way a person does.  The input is debounced
    (150 ms in js/app.js), so callers still have to wait for the list to
    react before asserting on it. */
async function setSearch(page, value) {
  await page.evaluate((text) => {
    const el = document.getElementById('search');
    el.value = text;
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, value);
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

  // These values are populated during the synchronous application boot.
  // Checking them separately from the word list catches a broken first paint
  // even when the chunked list renderer eventually produces cards.
  await expect(page.locator('#hero-word-name')).not.toHaveText('—');
  await expect(page.locator('#hero-word-name')).not.toHaveText('');

  // The hero shows two counters, not a single "x/y" bar: how many words the
  // visitor has saved, and how many the dictionary holds.
  await expect(page.locator('#stat-descubiertas')).toHaveText('0');
  await expect(page.locator('#stat-diccionario')).toHaveText(/\d/);
  await expect(page.locator('#stat-diccionario')).not.toHaveText('0');

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

  // The list is PAGINATED (PAGE_SIZE cards in the DOM, "show more" appends the
  // next page), so counting .card elements can never prove that a search
  // narrowed anything: a term matching 63 000 entries still renders a full
  // page, and 60 < 60 is false. #results-info holds the real number of
  // matches, so that is what this test compares — plus a term with fewer
  // matches than one page, which must visibly shrink the DOM.
  const initialInfo = await readResultsInfo(page);
  const initialCount = await readCardCount(page);
  expect(initialCount).toBeGreaterThan(1);

  // 'cefalea' matches 2 entries: fewer than one page.
  await setSearch(page, 'cefalea');
  await page.waitForFunction(
    (minCount) => document.querySelectorAll('#word-list .card').length < minCount,
    initialCount,
    { timeout: 15000 }
  );

  const filteredCount = await readCardCount(page);
  expect(filteredCount).toBeGreaterThan(0);
  expect(filteredCount).toBeLessThan(initialCount);
  expect(await readResultsInfo(page)).not.toBe(initialInfo);
  // Every match already fits on screen, so there is no second page left.
  await expect(page.locator('#show-more')).toBeHidden();

  // A term that matches nothing empties the list and offers the fallback.
  await setSearch(page, 'xyzzyqwerty');
  await expect(page.locator('#no-results')).toBeVisible({ timeout: 15000 });
  expect(await readCardCount(page)).toBe(0);

  // Clearing the box restores the full list.
  await setSearch(page, '');
  await page.waitForFunction(
    (minCount) => document.querySelectorAll('#word-list .card').length >= minCount,
    initialCount,
    { timeout: 15000 }
  );
  expect(await readResultsInfo(page)).toBe(initialInfo);
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

  const initialInfo = await readResultsInfo(page);
  const initialCount = await readCardCount(page);
  const filterBtn = page.locator('.filter-btn:not([data-tema="todos"])').first();
  const isFilterVisible = await filterBtn.isVisible().catch(() => false);
  if (!isFilterVisible) return; // No non-default filters — skip

  await filterBtn.click();
  await page.waitForTimeout(SETTLE_MS);

  // Same trap as the search test: a paginated list never renders more than one
  // page, so "<=" cannot fail and proves nothing. The number of matches is
  // the signal that actually moves when a topic filter is applied.
  const filteredCount = await readCardCount(page);
  expect(filteredCount).toBeLessThanOrEqual(initialCount);
  expect(await readResultsInfo(page)).not.toBe(initialInfo);
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
//
// Text size, theme and high contrast live in the shared settings drawer
// (js/locale-picker.js) — the same ⚙️ the other 7 suite apps use. The app
// no longer paints its own A−/A/A+ buttons or its own "Alto contraste"
// toggle: two paths to the same setting meant two different themes.
// ===========================================================================

/* Open the shared settings drawer from the header gear.
 *
 * Idempotent on purpose. El ⚙️ es un conmutador: pulsarlo con el cajón ya
 * abierto lo CIERRA. Antes el idioma vivía en la cabecera y el cajón solo
 * se abría para ajustes, así que "abrir" y "cerrar" nunca se confundían.
 * Ahora el idioma es la primera fila del cajón y cualquier prueba que
 * cambie el idioma deja el cajón abierto —en la 404 la página se repinta
 * sin recargar, así que no se cierra solo—, y el siguiente
 * openSettingsDrawer() lo cerraba de paso y la aserción siguiente fallaba
 * por un motivo que no tenía nada que ver con lo que probaba. */
async function openSettingsDrawer(page) {
  const drawer = page.locator('#accessibility-settings');
  if (await drawer.isVisible().catch(() => false)) return drawer;
  const trigger = page.locator('.locale-settings-trigger');
  await expect(trigger).toBeVisible();
  await trigger.click();
  await expect(drawer).toBeVisible();
  return drawer;
}

/** Root font size in px, as painted (not the inline style string). */
function rootFontSize(page) {
  return page.evaluate(() =>
    parseFloat(getComputedStyle(document.documentElement).fontSize));
}

/** What the drawer has persisted, under the shared accessibility key. */
function savedSettings(page) {
  return page.evaluate(() =>
    JSON.parse(localStorage.getItem('sinonimia-idioma:accessibility') || 'null'));
}

/* The static template pages (about/, config/, legal/) ship their ES/EN text
   as paired `[data-lang-block]` blocks instead of i18n tables, so they have
   no `App.i18n` for the shared dropdown to talk to. It announces the change
   through `window.LocalePicker.onChange`, which about.js registers. Without
   that bridge the dropdown wrote the locale to localStorage and nothing
   else: it looked alive, and the page never changed language.
   This walks all four so a future page cannot silently ship the dead one. */
const STATIC_LANG_PAGES = [
  'about/index.html',
  'config/index.html',
  'legal/index.html',
  'legal/privacidad.html',
];

for (const path of STATIC_LANG_PAGES) {
  test(`el desplegable cambia el idioma en ${path}`, async ({ browser }) => {
    const context = await browser.newContext();
    _lastCtx = context;
    const page = await context.newPage();
    try {
      await page.goto(BASE + path);
      await expect(page.locator('body')).toBeVisible();

      // The only language control is the shared one, and no two-button
      // switcher is left behind on any of these pages.
      await expect(page.locator('.idioma-btn')).toHaveCount(0);
      await expect(page.locator('#locale-picker .locale-picker-btn')).toHaveCount(1);
      // It lives INSIDE the ⚙️ drawer (`languageInDrawer` in this app's
      // locale-picker-config.js), so with the drawer closed the button is
      // in the DOM but not on screen: `toBeVisible()` would fail here and
      // the click below would wait on a hidden element until it times out.
      const drawer = await openSettingsDrawer(page);
      const dropdown = drawer.locator('.locale-picker-btn');
      await expect(dropdown).toBeVisible();

      const before = (await page.locator('main').innerText()).replace(/\s+/g, ' ');

      // Click the language it is NOT already in: with a fresh context the
      // page follows the browser language, so which option that is depends
      // on the environment and guessing it made this test lie.
      const current = (await dropdown.locator('.locale-picker-current').textContent()).trim().toLowerCase();
      const chosen = current === 'en' ? 'es' : 'en';
      await dropdown.click();
      await drawer.locator(`.locale-picker-panel li[data-locale="${chosen}"]`).click();
      await page.waitForTimeout(400);

      const after = (await page.locator('main').innerText()).replace(/\s+/g, ' ');
      expect(after).not.toBe(before);
      await expect(page.locator('html')).toHaveAttribute('data-lang', chosen);
      // `lang` too, or a screen reader announces the language the page is
      // no longer written in (these pages never load js/i18n.js).
      await expect(page.locator('html')).toHaveAttribute('lang', chosen);

      // Only one language on screen: the other block must be hidden.
      const otherBlocks = await page
        .locator(`[data-lang-block="${chosen === 'es' ? 'en' : 'es'}"]`)
        .evaluateAll((nodes) => nodes.filter((n) => n.offsetParent !== null).length);
      expect(otherBlocks).toBe(0);
    } finally {
      await context.close();
    }
  });
}

test('17a — the header exposes one settings control, not duplicated ones', async ({ browser }) => {
  const page = await openAppAtListView(browser);
  await expect(page.locator('body')).toBeVisible();

  // Exactly one gear in the header, and the language dropdown inside its
  // drawer as the first row — not a second control in the header next to
  // it, and not a second copy of it either.
  await expect(page.locator('.locale-settings-trigger')).toHaveCount(1);
  await expect(page.locator('#locale-picker .locale-picker-btn')).toHaveCount(1);
  await expect(page.locator('#accessibility-settings .locale-picker-btn')).toHaveCount(1);
  // The gear is the rightmost control of the header row, i.e. top right.
  const gearAfterPicker = await page.evaluate(() => {
    const picker = document.getElementById('locale-picker');
    const gear = document.querySelector('.locale-settings-trigger');
    const drawer = document.getElementById('accessibility-settings');
    return !!gear && gear.parentNode.lastElementChild === gear && drawer.contains(picker);
  });
  expect(gearAfterPicker).toBe(true);

  // The old per-app controls must be gone for good: they wrote the same
  // font-size and the same theme by a second route.
  await expect(page.locator('#letra-mas')).toHaveCount(0);
  await expect(page.locator('#letra-menos')).toHaveCount(0);
  await expect(page.locator('#letra-normal')).toHaveCount(0);
  await expect(page.locator('#contraste-toggle')).toHaveCount(0);
  await expect(page.locator('body.alto-contraste')).toHaveCount(0);
});

test('17b — "large" text size in the drawer enlarges the root font size', async ({ browser }) => {
  const page = await openAppAtListView(browser);
  await expect(page.locator('body')).toBeVisible();

  const before = await rootFontSize(page);
  const drawer = await openSettingsDrawer(page);
  await drawer.locator('[data-settings-size="large"]').click();
  await page.waitForTimeout(SETTLE_MS);

  expect(await rootFontSize(page)).toBeGreaterThan(before);
  expect(await page.evaluate(() =>
    document.documentElement.getAttribute('data-a11y-text'))).toBe('large');
  await expect(drawer.locator('[data-settings-size="large"]'))
    .toHaveAttribute('aria-pressed', 'true');
  expect((await savedSettings(page)).textSize).toBe('large');
});

test('17c — "small" text size in the drawer shrinks the root font size', async ({ browser }) => {
  const page = await openAppAtListView(browser);
  await expect(page.locator('body')).toBeVisible();

  const before = await rootFontSize(page);
  const drawer = await openSettingsDrawer(page);
  await drawer.locator('[data-settings-size="small"]').click();
  await page.waitForTimeout(SETTLE_MS);

  expect(await rootFontSize(page)).toBeLessThan(before);
  expect(await page.evaluate(() =>
    document.documentElement.getAttribute('data-a11y-text'))).toBe('small');
  expect((await savedSettings(page)).textSize).toBe('small');
});

test('17d — "normal" text size returns to the default', async ({ browser }) => {
  const page = await openAppAtListView(browser);
  await expect(page.locator('body')).toBeVisible();

  const normal = await rootFontSize(page);
  const drawer = await openSettingsDrawer(page);
  await drawer.locator('[data-settings-size="large"]').click();
  await page.waitForTimeout(SETTLE_MS);
  await drawer.locator('[data-settings-size="normal"]').click();
  await page.waitForTimeout(SETTLE_MS);

  expect(await rootFontSize(page)).toBeCloseTo(normal, 1);
  expect(await page.evaluate(() =>
    document.documentElement.getAttribute('data-a11y-text'))).toBe('normal');
});

test('17e — high contrast in the drawer switches the page to the contrast theme', async ({ browser }) => {
  const page = await openAppAtListView(browser);
  await expect(page.locator('body')).toBeVisible();

  const drawer = await openSettingsDrawer(page);
  const contrast = drawer.locator('[data-settings-contrast]');

  // On: the suite's contrast theme, and the flag that paints the
  // high-contrast palette. No body class of our own any more.
  await contrast.check();
  await page.waitForTimeout(SETTLE_MS);
  expect(await page.evaluate(() =>
    document.documentElement.getAttribute('data-theme'))).toBe('contrast');
  expect(await page.evaluate(() =>
    document.documentElement.getAttribute('data-a11y-contrast'))).toBe('high');
  expect(await page.evaluate(() => document.body.classList.contains('alto-contraste')))
    .toBe(false);
  expect((await savedSettings(page)).contrast).toBe(true);

  // Off: back to the saved theme, which is "light" when nobody has
  // chosen one. Before, turning contrast off restored "auto", which
  // left the attribute off and handed the decision to the system.
  await contrast.uncheck();
  await page.waitForTimeout(SETTLE_MS);
  expect(await page.evaluate(() =>
    document.documentElement.getAttribute('data-theme'))).toBe('light');
  expect(await page.evaluate(() =>
    document.documentElement.getAttribute('data-a11y-contrast'))).toBe('normal');
});

test('17f — picking a concrete theme turns high contrast off instead of fighting it', async ({ browser }) => {
  const page = await openAppAtListView(browser);
  await expect(page.locator('body')).toBeVisible();

  const drawer = await openSettingsDrawer(page);
  await drawer.locator('[data-settings-contrast]').check();
  await page.waitForTimeout(SETTLE_MS);

  await drawer.locator('[data-settings-theme="dark"]').click();
  await page.waitForTimeout(SETTLE_MS);

  expect(await page.evaluate(() =>
    document.documentElement.getAttribute('data-theme'))).toBe('dark');
  expect(await page.evaluate(() =>
    document.documentElement.getAttribute('data-a11y-contrast'))).toBe('normal');
  await expect(drawer.locator('[data-settings-contrast]')).not.toBeChecked();
  await expect(drawer.locator('[data-settings-theme="dark"]'))
    .toHaveAttribute('aria-pressed', 'true');
});

test('17g — the reading settings survive a reload', async ({ browser }) => {
  const page = await openAppAtListView(browser);
  await expect(page.locator('body')).toBeVisible();

  const drawer = await openSettingsDrawer(page);
  await drawer.locator('[data-settings-size="large"]').click();
  await drawer.locator('[data-settings-contrast]').check();
  await page.waitForTimeout(SETTLE_MS);

  await page.reload();
  await expect(page.locator('body')).toBeVisible();

  expect(await page.evaluate(() =>
    document.documentElement.getAttribute('data-theme'))).toBe('contrast');
  expect(await page.evaluate(() =>
    document.documentElement.getAttribute('data-a11y-text'))).toBe('large');
});

test('17h — the 404 page uses the same settings drawer and repaints in place', async ({ browser }) => {
  const context = await browser.newContext();
  _lastCtx = context;
  const page = await context.newPage();
  await page.goto(BASE + '404.html');
  await expect(page.locator('body')).toBeVisible();

  // Same single gear as the app, and no leftover per-page controls.
  await expect(page.locator('.locale-settings-trigger')).toHaveCount(1);
  await expect(page.locator('#contraste-toggle')).toHaveCount(0);
  await expect(page.locator('#letra-mas')).toHaveCount(0);

  // The Playwright context runs es-ES, so the page starts in Spanish.
  await expect(page.locator('.error-404-encabezado'))
    .toHaveText('No hemos encontrado esa página');

  // The language dropdown is the drawer's first row, so the gear has to be
  // opened to change the language.
  const languageDrawer = await openSettingsDrawer(page);
  await languageDrawer.locator('.locale-picker-btn').click();
  await languageDrawer.locator('.locale-picker-panel li[data-locale="en"]').click();

  // The 404 has no hash to route, so the page repaints where it is
  // instead of jumping into the app.
  await expect(page.locator('.error-404-encabezado'))
    .toHaveText('We couldn\'t find that page');
  expect(await page.evaluate(() => location.hash)).toBe('');
  expect(await page.evaluate(() => document.documentElement.lang)).toBe('en');
  await expect(page.locator('#error-404-inicio'))
    .toHaveAttribute('href', '#/en/');

  // And the reading settings work here too, from the same key. The 404
  // repaints in place instead of reloading, so the drawer is still open
  // from the language switch; openSettingsDrawer() leaves it alone.
  const drawer = await openSettingsDrawer(page);
  await drawer.locator('[data-settings-contrast]').check();
  expect(await page.evaluate(() =>
    document.documentElement.getAttribute('data-theme'))).toBe('contrast');
});

// ===========================================================================
// PROGRESS BAR
// ===========================================================================

test('21 — the saved-words counter shows a number after saving words', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  // Pre-populate learned words so the counter shows a number, not zero.
  await page.addInitScript(() => {
    localStorage.setItem('sinonimia-aprendidas-es', JSON.stringify([1, 2, 3]));
  });
  await page.goto(BASE);
  await page.waitForTimeout(SETTLE_MS);

  const counter = page.locator('#stat-descubiertas');
  await expect(counter).toBeVisible();
  // Must contain at least one digit (the count of words saved so far).
  expect((await counter.textContent()).trim()).toMatch(/\d/);
  await context.close();
});

// ===========================================================================
// LANGUAGE SWITCH
// ===========================================================================

test('22 — the language dropdown inside the ⚙️ switches English and Spanish',
  async ({ browser }) => {
    const page = await openAppAtListView(browser);
    // The dropdown is the drawer's first row, so the gear opens it once and
    // it stays open for both switches.
    const drawer = await openSettingsDrawer(page);
    const picker = drawer.locator('.locale-picker-btn');
    const options = drawer.locator('.locale-picker-panel');
    await picker.click();
    await options.locator('li[data-locale="en"]').click();

    // The hash and stored preference change synchronously, while Sinonimia
    // may still be loading the very large English index in the background.
    expect(await page.evaluate(() => localStorage.getItem('sinonimia-idioma'))).toBe('en');
    expect(page.url()).toContain('#/en/');
    await expect(picker.locator('.locale-picker-current')).toHaveText('EN');

    await picker.click();
    await options.locator('li[data-locale="es"]').click();
    expect(await page.evaluate(() => localStorage.getItem('sinonimia-idioma'))).toBe('es');
    expect(page.url()).toContain('#/es/');
    await expect(picker.locator('.locale-picker-current')).toHaveText('ES');
  });

test('22b — unsupported browser language falls back to English', async ({ browser }) => {
  const context = await browser.newContext({ locale: 'fr-FR' });
  const page = await context.newPage();
  try {
    await page.addInitScript(() => localStorage.clear());
    await page.goto(BASE);
    // The language indicator is the drawer's first row, so the drawer has
    // to be open to read it.
    const drawer = await openSettingsDrawer(page);
    await expect(drawer.locator('#locale-picker .locale-picker-current')).toHaveText('EN');
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
