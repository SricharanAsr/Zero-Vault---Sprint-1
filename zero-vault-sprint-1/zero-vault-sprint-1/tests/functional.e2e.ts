import { test, expect } from '@playwright/test';

test.describe('Zero-Vault Functional Flow', () => {
    const randomStr = Math.random().toString(36).substring(2, 7);
    const testEmail = `test-${Date.now()}-${randomStr}@example.com`;
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
        await page.waitForURL(/\/unlock/, { timeout: 30000 }); // Backend may take time

        // --- 2. Unlock/Login ---
        await page.fill('input[type="password"]', testPassword);
        await page.click('button:has-text("Unlock")');
        await page.waitForURL(/\/dashboard/, { timeout: 30000 });

        await expect(page.locator('h1')).toContainText('Your Vault');

        // --- 3. Manage Entries ---

        // Create new entry
        await page.click('[data-testid="add-entry-button"]');
        await expect(page.locator('h2:has-text("Add New Entry")')).toBeVisible({ timeout: 10000 });

        // Wait for modal transition and focusability
        await page.waitForTimeout(500);

        await page.fill('input[placeholder*="Netflix"]', 'Test Site');
        await page.fill('input[placeholder="user@example.com"]', 'testuser');
        await page.fill('input[placeholder="••••••••••••"]', 'secret123');

        // Form submission inside modal
        await page.click('form button:has-text("Add Entry")', { force: true });

        // Verify entry exists
        const cardSelector = 'div.glass-panel:has-text("Test Site")';
        await expect(page.locator(cardSelector).first()).toBeVisible({ timeout: 15000 });
        const entryCard = page.locator(cardSelector).first();

        // Wait for card animation to settle
        await page.waitForTimeout(1000);

        // Edit entry
        const editBtn = entryCard.locator('[data-testid="edit-entry-btn"]');
        await expect(editBtn).toBeVisible({ timeout: 5000 });
        await editBtn.click({ force: true });

        await expect(page.locator('h2:has-text("Edit Entry")')).toBeVisible({ timeout: 5000 });
        await page.fill('input[placeholder*="Netflix"]', 'Updated Site');
        await page.click('button:has-text("Save Changes")', { force: true });

        // Wait for modal to disappear and list to update
        await expect(page.locator('h2:has-text("Edit Entry")')).not.toBeVisible({ timeout: 5000 });
        await expect(page.locator('h3:has-text("Updated Site")')).toBeVisible({ timeout: 10000 });

        // Favorite entry
        const updatedCardSelector = 'div.glass-panel:has-text("Updated Site")';
        const updatedEntry = page.locator(updatedCardSelector).first();
        await expect(updatedEntry).toBeVisible({ timeout: 5000 });
        await updatedEntry.locator('button:has(svg.lucide-star)').click({ force: true });

        // Search entry
        const searchInput = page.locator('input[placeholder*="Search"]');
        await searchInput.fill('Updated');
        await expect(page.locator('text=Updated Site')).toBeVisible();

        // Clear search
        await searchInput.fill('');
        await page.waitForTimeout(1000);

        // Delete entry
        const finalEntry = page.locator(updatedCardSelector).first();
        const deleteBtn = finalEntry.locator('[data-testid="delete-entry-btn"]');
        await expect(deleteBtn).toBeVisible({ timeout: 5000 });
        await deleteBtn.click({ force: true });

        await page.click('[data-testid="confirm-delete-button"]', { force: true });
        await expect(page.locator('h3:has-text("Updated Site")')).not.toBeVisible({ timeout: 10000 });
    });
});
