'use strict';

const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  /* Allow generous time for the very first test on a cold browser:
     the 19 MB Spanish dictionary is loaded via document.write() and
     buildIndexes() processes ~69 000 entries — this can take 60–90 s
     on a cold Chromium context.  Subsequent tests reuse the same
     dictionary cache and are fast. */
  timeout: 120000,
  expect: { timeout: 15000 },
  workers: 1,
  fullyParallel: false,
  retries: 1,
  reporter: 'line',
  use: {
    baseURL: 'http://127.0.0.1:4174/',
    locale: 'es-ES',
    serviceWorkers: 'block',
    viewport: { width: 1280, height: 900 },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    launchOptions: {
      slowMo: 0,
    },
  },
  webServer: {
    command: 'node scripts/ui-server.js',
    url: 'http://127.0.0.1:4174/',
    reuseExistingServer: true,
    timeout: 10000,
  },
});
