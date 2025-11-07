import { test, expect } from '@playwright/test';

const baseUrl = 'http://localhost:3000/';

test.describe('Service Wala Comprehensive Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test('should load the homepage', async ({ page }) => {
    // Check for the main heading
    await expect(page.getByRole('heading', { name: /Find.*Trusted.*Local Services/i })).toBeVisible();
    
    // Check navigation exists
    await expect(page.locator('nav')).toBeVisible();
    
    // Check for logo specifically (more robust)
    await expect(page.locator('nav').getByText('ServiceWala')).toBeVisible();
    
    // Fix: Check for stats - just check if the numbers are visible
    await expect(page.getByText('2500+')).toBeVisible();
    await expect(page.getByText('15000+')).toBeVisible();
    await expect(page.getByText('4.8★')).toBeVisible();
  });

  test('should navigate to the services page', async ({ page }) => {
    const servicesLink = page.locator('a[href="/services"]').first();
    await servicesLink.click();
    await expect(page).toHaveURL(/.*services/);
  });

  test('should handle 404 for invalid routes', async ({ page }) => {
    await page.goto(`${baseUrl}invalid-route`);
    // Check for Error 404 heading or use .first()
    await expect(page.getByText('Error 404')).toBeVisible();
    await expect(page.getByText('The service you are looking for does not exist')).toBeVisible();
  });

  test('should have state selector', async ({ page }) => {
    // Check if state selector exists
    await expect(page.getByText('Select State').first()).toBeVisible();
  });
});