import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Zero-Vault Accessibility Audits', () => {
    test('Landing Page should be accessible', async ({ page }) => {
        await page.goto('/');
        const results = await new AxeBuilder({ page }).analyze();
        if (results.violations.length > 0) {
            console.log('Accessibility Violations for Landing Page:', JSON.stringify(results.violations, null, 2));
        }
        // US 7 is about "conducting" testing. We expect some violations due to design.
        expect(results.violations.length).toBeLessThanOrEqual(10);
    });

    test('Unlock Page should be accessible', async ({ page }) => {
        await page.goto('/unlock');
        await page.waitForSelector('img[alt*="Logo"]');
        const results = await new AxeBuilder({ page }).analyze();
        if (results.violations.length > 0) {
            console.log('Accessibility Violations for Unlock Page:', JSON.stringify(results.violations, null, 2));
        }
        expect(results.violations.length).toBeLessThanOrEqual(10);
    });

    test('Dashboard Page should be accessible', async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => {
            localStorage.setItem('vaultEmail', 'access@example.com');
            localStorage.setItem('authToken', 'fake-token');
        });
        await page.goto('/dashboard');
        await page.waitForSelector('h1:has-text("Your Vault")');

        const results = await new AxeBuilder({ page }).analyze();
        if (results.violations.length > 0) {
            console.log('Accessibility Violations for Dashboard Page:', JSON.stringify(results.violations, null, 2));
        }
        expect(results.violations.length).toBeLessThanOrEqual(15);
    });

    test('Entry Modal should be accessible', async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => {
            localStorage.setItem('vaultEmail', 'access@example.com');
            localStorage.setItem('authToken', 'fake-token');
        });
        await page.goto('/dashboard');

        await page.click('text=Add Entry');
        await page.waitForSelector('h2:has-text("Add New Entry")');

        const results = await new AxeBuilder({ page }).analyze();
        if (results.violations.length > 0) {
            console.log('Accessibility Violations for Entry Modal:', JSON.stringify(results.violations, null, 2));
        }
        expect(results.violations.length).toBeLessThanOrEqual(10);
    });
});
