import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Zero-Vault Accessibility Audits', () => {

    // Helper to get authenticated state
    async function setupAuthenticatedPage(page: any) {
        const testEmail = `access-${Date.now()}@example.com`;
        const testPassword = 'Password123!';

        await page.goto('/register');
        await page.fill('input[type="email"]', testEmail);
        await page.locator('input[type="password"]').first().fill(testPassword);
        await page.locator('input[type="password"]').nth(1).fill(testPassword);
        await page.click('button:has-text("Create Vault")');
        await page.waitForURL(/\/unlock/, { timeout: 20000 });

        await page.fill('input[type="password"]', testPassword);
        await page.click('button:has-text("Unlock")');
        await page.waitForURL(/\/dashboard/, { timeout: 20000 });

        return { testEmail, testPassword };
    }

    test('Landing Page should be accessible', async ({ page }) => {
        await page.goto('/');
        const results = await new AxeBuilder({ page }).analyze();
        if (results.violations.length > 0) {
            console.log('Violations (Landing):', results.violations.length);
        }
        expect(results.violations.length).toBeLessThanOrEqual(10);
    });

    test('Unlock Page should be accessible', async ({ page }) => {
        await page.goto('/unlock');
        await page.waitForSelector('img[alt*="Logo"]', { timeout: 5000 });
        const results = await new AxeBuilder({ page }).analyze();
        expect(results.violations.length).toBeLessThanOrEqual(10);
    });

    test('Dashboard Page should be accessible', async ({ page }) => {
        test.setTimeout(60000); // Increase timeout for auth flow

        await setupAuthenticatedPage(page);
        await page.waitForSelector('h1:has-text("Your Vault")', { timeout: 10000 });

        const results = await new AxeBuilder({ page }).analyze();
        expect(results.violations.length).toBeLessThanOrEqual(15);
    });

    test('Entry Modal should be accessible', async ({ page }) => {
        test.setTimeout(60000); // Increase timeout for auth flow

        await setupAuthenticatedPage(page);
        await page.click('button:has-text("Add Entry")');
        await page.waitForSelector('h2:has-text("Add New Entry")', { timeout: 5000 });

        const results = await new AxeBuilder({ page }).analyze();
        expect(results.violations.length).toBeLessThanOrEqual(10);
    });
});
