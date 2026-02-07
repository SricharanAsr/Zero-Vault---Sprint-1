import { test, expect } from '@playwright/test';

test.describe('Zero-Vault Functional Flow', () => {
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'Password123!';

    test('should register and login successfully', async ({ page }) => {
        // Go to Landing
        await page.goto('/');
        await expect(page.locator('h1')).toContainText('Zero-Knowledge');

        // Go to Register
        await page.click('text=Create Vault');
        await expect(page).toHaveURL(/\/register/);

        // Fill Registration
        await page.fill('input[type="email"]', testEmail);
        // Master Password (first password input)
        await page.locator('input[type="password"]').first().fill(testPassword);
        // Confirm Password (second password input)
        await page.locator('input[type="password"]').nth(1).fill(testPassword);

        await page.click('button:has-text("Create Vault")');

        // Should redirect to Unlock
        await page.waitForURL(/\/unlock/, { timeout: 10000 });

        await page.fill('input[type="password"]', testPassword);
        await page.click('button:has-text("Unlock")');

        await expect(page).toHaveURL(/\/dashboard/);
    });

    test('should manage vault entries', async ({ page }) => {
        // Assume logged in (setup localStorage)
        await page.goto('/');
        await page.evaluate(({ email }) => {
            localStorage.setItem('vaultEmail', email);
            localStorage.setItem('authToken', 'fake-token-for-testing');
        }, { email: testEmail });

        await page.goto('/dashboard');

        // Create new entry
        await page.click('text=Add Entry');
        await page.fill('input[placeholder="Website Name"]', 'Test Site');
        await page.fill('input[placeholder="Username"]', 'testuser');
        await page.fill('input[placeholder="Password"]', 'secret123');
        await page.click('button:has-text("Save Entry")');

        // Verify entry exists
        await expect(page.locator('text=Test Site')).toBeVisible();

        // Edit entry
        await page.click('button:has(svg.lucide-edit)');
        await page.fill('input[placeholder="Website Name"]', 'Updated Site');
        await page.click('button:has-text("Save Entry")');
        await expect(page.locator('text=Updated Site')).toBeVisible();

        // Favorite entry
        // Search bar star is usually first, entry star is second
        await page.locator('button:has(svg.lucide-star)').nth(1).click();

        // Search entry
        await page.fill('input[placeholder*="Search"]', 'Updated');
        await expect(page.locator('text=Updated Site')).toBeVisible();

        // Delete entry
        await page.click('button:has(svg.lucide-trash2)');
        await page.click('button:has-text("Delete")');
        await expect(page.locator('text=Updated Site')).not.toBeVisible();
    });
});
