import { test, expect } from '@playwright/test';

test.describe('Zero-Vault Functional Flow', () => {
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'Password123!';

    test('should register, login, and manage vault entries', async ({ page }) => {
        test.setTimeout(90000); // Increase timeout to 90s

        // --- 1. Registration ---
        await page.goto('/');
        await expect(page.locator('h1')).toContainText('Zero-Knowledge', { timeout: 10000 });

        await page.click('text=Create Vault');
        await page.waitForURL(/\/register/, { timeout: 10000 });

        await page.fill('input[type="email"]', testEmail);
        await page.locator('input[type="password"]').first().fill(testPassword);
        await page.locator('input[type="password"]').nth(1).fill(testPassword);

        // Click and wait separately
        await page.click('button:has-text("Create Vault")');
        await page.waitForURL(/\/unlock/, { timeout: 20000 }); // Backend may take time

        // --- 2. Unlock/Login ---
        await page.fill('input[type="password"]', testPassword);
        await page.click('button:has-text("Unlock")');
        await page.waitForURL(/\/dashboard/, { timeout: 20000 });

        await expect(page.locator('h1')).toContainText('Your Vault');

        // --- 3. Manage Entries ---

        // Create new entry
        await page.click('button:has-text("Add Entry")');
        await expect(page.locator('h2:has-text("Add New Entry")')).toBeVisible({ timeout: 5000 });

        await page.fill('input[placeholder="Website Name"]', 'Test Site');
        await page.fill('input[placeholder="Username"]', 'testuser');
        await page.fill('input[placeholder="Password"]', 'secret123');
        await page.click('button:has-text("Save Entry")');

        // Verify entry exists
        await expect(page.locator('text=Test Site')).toBeVisible({ timeout: 5000 });

        // Edit entry
        await page.click('button:has(svg.lucide-edit)');
        await page.fill('input[placeholder="Website Name"]', 'Updated Site');
        await page.click('button:has-text("Save Entry")');
        await expect(page.locator('text=Updated Site')).toBeVisible();

        // Favorite entry
        const entryCard = page.locator('div.glass-panel', { hasText: 'Updated Site' });
        await entryCard.locator('button:has(svg.lucide-star)').click();

        // Search entry
        await page.fill('input[placeholder*="Search"]', 'Updated');
        await expect(page.locator('text=Updated Site')).toBeVisible();

        // Delete entry
        await entryCard.locator('button:has(svg.lucide-trash2)').click();
        await page.click('button:has-text("Delete")');
        await expect(page.locator('text=Updated Site')).not.toBeVisible();
    });
});
