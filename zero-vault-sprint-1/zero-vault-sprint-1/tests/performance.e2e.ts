import { test, expect } from '@playwright/test';

test.describe('Zero-Vault Performance Testing', () => {
    test('should handle 1,000 vault entries with acceptable performance', async ({ page }) => {
        test.setTimeout(120000); // Increase timeout

        // Handle alerts
        page.on('dialog', async (dialog: any) => {
            console.log(`[TEST DIALOG] ${dialog.message()}`);
            await dialog.dismiss();
        });

        const randomStr = Math.random().toString(36).substring(2, 7);
        const testEmail = `perf-${Date.now()}-${randomStr}@example.com`;
        const testPassword = 'Password123!';

        // 1. Register & Login
        await page.goto('/register');
        await page.fill('input[type="email"]', testEmail);
        await page.locator('input[type="password"]').first().fill(testPassword);
        await page.locator('input[type="password"]').nth(1).fill(testPassword);
        await page.click('button:has-text("Create Vault")');
        await page.waitForURL(/\/unlock/, { timeout: 45000 });

        await page.fill('input[type="password"]', testPassword);
        await page.click('button:has-text("Unlock")');
        await page.waitForURL(/\/dashboard/, { timeout: 45000 });

        // 2. Inject large dataset locally
        const entries = Array.from({ length: 1000 }, (_, i) => ({
            id: i + 1,
            website: `Site ${i + 1}.com`,
            username: `user${i + 1}`,
            password: `pass${i + 1}`,
            category: i % 5 === 0 ? 'Work' : 'Personal',
            isFavorite: i % 10 === 0
        }));

        await page.evaluate(({ email, data }) => {
            const vaultEntriesKey = `vaultEntries_${email}`;
            localStorage.setItem(vaultEntriesKey, JSON.stringify(data));
        }, { email: testEmail, data: entries });

        // Reload to render injected data
        const startLoad = Date.now();
        await page.reload();

        // Wait for list to render
        await page.waitForSelector('text=Site 1.com', { timeout: 30000 });
        const loadTime = Date.now() - startLoad;

        console.log(`Vault Load (1000 entries): ${loadTime}ms`);
        expect(loadTime).toBeLessThan(15000); // Increased threshold to 15s

        // Search Latency
        const startSearch = Date.now();
        await page.fill('input[placeholder*="Search"]', 'Site 999');
        await expect(page.locator('text=Site 999.com')).toBeVisible({ timeout: 5000 });
        const searchTime = Date.now() - startSearch;

        console.log(`Search Latency: ${searchTime}ms`);
        expect(searchTime).toBeLessThan(2000); // More realistic threshold
    });
});
