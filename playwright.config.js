// @ts-check
const { devices } = require('@playwright/test');


 
const config = {
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
   
    timeout: 5000
  },
 
  forbidOnly: !!process.env.CI,
  
  retries: process.env.CI ? 2 : 0,
  
  workers: process.env.CI ? 1 : undefined,
  
  reporter: 'html',
  
  use: {
    
    actionTimeout: 0,
    browserName: 'chromium',
    headless:   false,

    screenshot: 'on',

    trace: 'retain-on=failure',//it could be on/off. On will give traces of all testcases irrespective of fail or pass
  },


  
};

module.exports = config;
