const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

const baseUrl = 'http://localhost:3000/';

describe('Service Wala Comprehensive Tests', function() {
  let driver;
  
  // Increase timeout for browser setup
  this.timeout(120000);

  // Setup: Create browser instance ONCE before all tests
  before(async function() {
    console.log('Starting Chrome browser...');
    
    // Set Chrome binary location explicitly
    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    
    const options = new chrome.Options();
    options.setChromeBinaryPath(chromePath);
    
    // Add these arguments to help with startup
    options.addArguments('--remote-debugging-port=9222');
    options.addArguments('--disable-gpu');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--disable-software-rasterizer');
    options.addArguments('--window-size=1920,1080');
    
    // Enable verbose logging
    options.setLoggingPrefs({ browser: 'ALL', driver: 'ALL' });
    
    try {
      console.log('Building WebDriver with explicit Chrome path...');
      driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
      
      console.log('Browser started successfully');
      await driver.manage().setTimeouts({ implicit: 10000, pageLoad: 30000, script: 30000 });
    } catch (error) {
      console.error('Failed to start browser:', error.message);
      console.error('Full error:', error);
      throw error;
    }
  });

  // Navigate to homepage before each test
  beforeEach(async function() {
    console.log(`Navigating to ${baseUrl}`);
    await driver.get(baseUrl);
    await driver.wait(until.elementLocated(By.css('body')), 10000);
  });

  // Teardown: Close browser ONCE after all tests
  after(async function() {
    if (driver) {
      try {
        console.log('Closing browser...');
        await driver.quit();
        console.log('Browser closed');
      } catch (error) {
        console.error('Error closing browser:', error.message);
      }
    }
  });

  it('should load the homepage', async function() {
    // Check for the main heading with "Find Trusted Local Services"
    const heading = await driver.wait(
      until.elementLocated(By.css('h1')),
      10000
    );
    const headingText = await heading.getText();
    assert(headingText.includes('Find') && headingText.includes('Trusted'), 'Main heading should contain "Find" and "Trusted"');

    // Check navigation exists
    const nav = await driver.findElement(By.css('nav'));
    assert(await nav.isDisplayed(), 'Navigation should be visible');

    // Check for logo
    const logo = await driver.findElement(By.xpath("//nav//*[contains(text(), 'ServiceWala')]"));
    assert(await logo.isDisplayed(), 'Logo should be visible');

    // Check for stats
    const stat1 = await driver.findElement(By.xpath("//*[contains(text(), '2500+')]"));
    assert(await stat1.isDisplayed(), '2500+ should be visible');

    const stat2 = await driver.findElement(By.xpath("//*[contains(text(), '15000+')]"));
    assert(await stat2.isDisplayed(), '15000+ should be visible');

    const stat3 = await driver.findElement(By.xpath("//*[contains(text(), '4.8★')]"));
    assert(await stat3.isDisplayed(), '4.8★ should be visible');
  });

  it('should navigate to the services page', async function() {
    // Find and click the services link
    const servicesLink = await driver.wait(
      until.elementLocated(By.css('a[href="/services"]')),
      10000
    );
    await servicesLink.click();

    // Wait for URL to change
    await driver.wait(until.urlContains('/services'), 10000);
    
    const currentUrl = await driver.getCurrentUrl();
    assert(currentUrl.includes('/services'), 'URL should contain /services');
  });

  it('should handle 404 for invalid routes', async function() {
    // Navigate to invalid route
    await driver.get(`${baseUrl}invalid-route`);

    // Wait for page to load
    await driver.wait(until.elementLocated(By.css('body')), 10000);

    // Check for Error 404 text
    const error404 = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Error 404')]")),
      10000
    );
    assert(await error404.isDisplayed(), 'Error 404 should be visible');

    // Check for error message
    const errorMsg = await driver.findElement(
      By.xpath("//*[contains(text(), 'The service you are looking for does not exist')]")
    );
    assert(await errorMsg.isDisplayed(), 'Error message should be visible');
  });

  it('should have state selector', async function() {
    // Check if state selector exists
    const stateSelector = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Select State')]")),
      10000
    );
    assert(await stateSelector.isDisplayed(), 'State selector should be visible');
  });
});