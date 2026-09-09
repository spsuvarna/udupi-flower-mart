import { expect, test } from '@playwright/test';

test('customer can order Mallige and Jaaji through checkout', async ({ page }) => {
  await page.addInitScript(() => {
    window.open = (url) => {
      sessionStorage.setItem('lastOpenedUrl', String(url));
      return null;
    };
  });

  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Fresh Mallige & Jaaji');
  await expect(page.locator('article').filter({ hasText: 'Mallige — 1 Chendu' })).toHaveCount(1);
  await expect(page.locator('article').filter({ hasText: 'Jaaji (Jasmine)' })).toHaveCount(1);

  await page.locator('article').filter({ hasText: 'Mallige — 1 Chendu' }).getByRole('button', { name: 'ADD' }).click();
  await page.locator('article').filter({ hasText: 'Jaaji (Jasmine)' }).getByRole('button', { name: 'ADD' }).click();
  await page.getByRole('link', { name: /Shopping cart with 2 items/ }).click();

  await expect(page.getByRole('heading', { name: 'Your flower cart' })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Udupi Mallige/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Jaaji (Jasmine)' })).toBeVisible();
  await page.getByRole('link', { name: 'Continue to checkout' }).click();

  await page.getByLabel('Customer name *').fill('Asha');
  await page.getByLabel('Mobile number *').fill('9876543210');
  await page.getByLabel('Delivery address *').fill('12 Temple Road');
  await page.getByLabel('Town / city *').fill('Udupi');
  await page.getByLabel('Taluk *').fill('Udupi');
  await page.getByLabel('PIN code *').fill('576101');
  await page.getByLabel('Delivery area *').selectOption('udupi');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  await page.getByLabel('Delivery date *').fill(tomorrow.toISOString().slice(0, 10));
  await page.getByLabel('Preferred time *').selectOption({ index: 1 });
  await page.getByLabel('Payment preference *').selectOption({ index: 1 });
  await page.getByRole('button', { name: 'Confirm on WhatsApp' }).click();

  await expect(page.getByRole('heading', { name: 'Your cart is waiting for flowers' })).toBeVisible();
  const orderUrl = await page.evaluate(() => sessionStorage.getItem('lastOpenedUrl'));
  expect(orderUrl).toContain('wa.me/918296085495');
  expect(decodeURIComponent(orderUrl || '')).toContain('Udupi Mallige');
  expect(decodeURIComponent(orderUrl || '')).toContain('Jaaji (Jasmine)');
});

test('customer looking for another flower is sent to contact options', async ({ page }) => {
  await page.goto('./#/products');
  await expect(page.getByRole('heading', { name: 'Mallige Chendu, Atte & Jaaji' })).toBeVisible();
  await expect(page.getByText('Mallige — 1 Atte (4 Chendu)')).toBeVisible();
});
