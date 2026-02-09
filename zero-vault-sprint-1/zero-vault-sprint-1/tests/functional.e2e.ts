import { test, expect } from '@playwright/test';

test.describe('Zero-Vault Functional Flow', () => {
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'Password123!';

    test('should register, login, and manage vault entries', async ({ page }) => {
        // --- 1. Registration ---
        await page.goto('/');
        await expect(page.locator('h1')).toContainText('Zero-Knowledge');

        await page.click('text=Create Vault');
        await expect(page).toHaveURL(/\/register/);

        await page.fill('input[type="email"]', testEmail);
        await page.locator('input[type="password"]').first().fill(testPassword);
        await page.locator('input[type="password"]').nth(1).fill(testPassword);

        // Click Create Vault and wait for navigation
        await Promise.all([
            page.waitForURL(/\/unlock/, { timeout: 15000 }),
            page.click('button:has-text("Create Vault")')
        ]);

        // --- 2. Unlock/Login ---
        await page.fill('input[type="password"]', testPassword);
        await Promise.all([
            page.waitForURL(/\/dashboard/, { timeout: 15000 }),
            page.click('button:has-text("Unlock")')
        ]);

        await expect(page.locator('h1')).toContainText('Your Vault');

        // --- 3. Manage Entries ---

        // Create new entry
        // Use more specific selector ensuring visibility
        await page.click('button:has-text("Add Entry")');

        // Modal should appear
        await expect(page.locator('h2:has-text("Add New Entry")')).toBeVisible();

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

        // Favorite entry (Star icon)
        // Note: The first star might be the filter toggle. The entry star is usually inside the entry card.
        // We'll target the star within the entry card.
        // The entry card contains strict text "Updated Site".
        const entryCard = page.locator('div.glass-panel', { hasText: 'Updated Site' });
        await entryCard.locator('button:has(svg.lucide-star)').click();

        // Search entry
        await page.fill('input[placeholder*="Search"]', 'Updated');
        await expect(page.locator('text=Updated Site')).toBeVisible();

        // Delete entry
        await entryCard.locator('button:has(svg.lucide-trash2)').click();
        await page.click('button:has-text("Delete")'); // Confirm deletion in modal
        await expect(page.locator('text=Updated Site')).not.toBeVisible();
    });
});
