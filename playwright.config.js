// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { on } from 'node:cluster';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries: 1,
  workers:2,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000},
    reporter: 'html',
  projects:[
    {
      name: "chromium",
   use: {
     browserName: 'chromium',
     headless: false,
     screenshot:'on',
     trace:'retain-on-failure',
     video:'retain-on-failure',
     ignoreHTTPSErrors: true

  }

    },
  //   {
  //   name:"firefox",
  //  use: {
  //    browserName: 'firefox',
  //    headless: false,
  //    screenshot:'on',
  //    trace:'retain-on-failure',
  //    ...devices['iPhone 12 Pro Max'],
  //    viewport:{width:720,height:720}
  // }
//}

  ]
  
});
// module.exports=defineConfig;

