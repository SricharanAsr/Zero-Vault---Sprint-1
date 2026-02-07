import { test, expect } from '@playwright/test';

test.describe('Zero-Vault Performance Testing', () => {
    test('should handle 10,000 vault entries with acceptable performance', async ({ page }) => {
        const testEmail = 'perf-test@example.com';

        // Pre-populate 10k entries in localStorage
        const entries = Array.from({ length: 10000 }, (_, i) => ({
            id: i + 1,
            website: `Site ${i + 1}.com`,
            username: `user${i + 1}`,
            password: `pass${i + 1}`,
            category: i % 5 === 0 ? 'Work' : 'Personal',
            isFavorite: i % 10 === 0
        }));

        await page.goto('/');
        await page.evaluate(({ email, data }) => {
            localStorage.setItem('vaultEmail', email);
            localStorage.setItem('authToken', 'fake-token');
            localStorage.setItem(`vaultEntries_${email}`, JSON.stringify(data));
        }, { email: testEmail, data: entries });

        // Measure Dashboard Load Time
        const startLoad = Date.now();
        await page.goto('/dashboard');
        // Wait for any entry to load
        await page.waitForSelector('text=Site', { timeout: 15000 });
        const loadTime = Date.now() - startLoad;

        console.log(`Vault Load (10k entries): ${loadTime}ms`);
        expect(loadTime).toBeLessThan(3000); // Target < 3s for 10k items

        // Measure Search Latency
        const startSearch = Date.now();
        await page.fill('input[placeholder*="Search"]', 'Site 9999');
        await expect(page.locator('text=Site 9999.com')).toBeVisible();
        const searchTime = Date.now() - startSearch;

        console.log(`Search Latency (10k entries): ${searchTime}ms`);
        expect(searchTime).toBeLessThan(500); // Search should be fast
    });
});
