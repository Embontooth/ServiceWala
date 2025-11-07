const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function diagnose() {
  console.log('=== Selenium Chrome Diagnostic ===\n');
  
  console.log('1. Checking Node.js version...');
  console.log(`   Node.js: ${process.version}`);
  
  console.log('\n2. Checking Chrome location...');
  const possiblePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe'
  ];
  
  const fs = require('fs');
  let chromeFound = false;
  for (const path of possiblePaths) {
    if (fs.existsSync(path)) {
      console.log(`   ✅ Chrome found at: ${path}`);
      chromeFound = true;
      break;
    }
  }
  
  if (!chromeFound) {
    console.log('   ❌ Chrome not found in standard locations');
    console.log('   Please install Google Chrome from: https://www.google.com/chrome/');
    return;
  }
  
  console.log('\n3. Attempting to start Chrome with Selenium...');
  let driver;
  
  try {
    const options = new chrome.Options();
    options.addArguments('--disable-gpu');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    
    console.log('   Building WebDriver...');
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
    
    console.log('   ✅ Chrome started successfully!');
    
    console.log('\n4. Testing navigation...');
    await driver.get('https://www.google.com');
    console.log('   ✅ Navigation successful!');
    
    const title = await driver.getTitle();
    console.log(`   Page title: ${title}`);
    
    console.log('\n✅ ALL CHECKS PASSED! Selenium is working correctly.');
    
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('\nFull error details:');
    console.error(error);
    
    console.log('\n=== Troubleshooting Steps ===');
    console.log('1. Make sure Google Chrome is installed');
    console.log('2. Try uninstalling chromedriver: npm uninstall chromedriver');
    console.log('3. Selenium 4.6+ uses Selenium Manager (automatic driver management)');
    console.log('4. Make sure you have selenium-webdriver@4.x installed');
    console.log('5. Try: npm install selenium-webdriver@latest');
    
  } finally {
    if (driver) {
      await driver.quit();
      console.log('\n✅ Browser closed');
    }
  }
}

diagnose().catch(console.error);
