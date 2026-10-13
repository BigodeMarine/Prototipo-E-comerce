const { test, expect } = require('@playwright/test');
const errors = new WeakMap();

test.beforeEach(async ({ page }) => {
  const messages = [];
  errors.set(page, messages);
  page.on('pageerror', error => messages.push(error.message));
  await page.goto('/');
});

test.afterEach(async ({ page }) => {
  expect(errors.get(page), 'Não deve haver erros JavaScript na página').toEqual([]);
});

test('explora o catálogo por categoria, preço e busca', async ({ page }) => {
  await expect(page.locator('.product')).toHaveCount(10);
  await page.locator('.tab[data-category="Anéis"]').click();
  await expect(page.locator('.product')).toHaveCount(3);
  await page.locator('#catalog-search').fill('eclipse');
  await expect(page.locator('.product-title')).toHaveText('Anel Eclipse');
  await page.locator('#clear-filters').click();
  await page.locator('#sort').selectOption('low');
  await expect(page.locator('.product-title').first()).toHaveText('Argolas Arco');
  await page.locator('#search-open').click();
  await page.locator('#global-search').fill('colar');
  await page.locator('#search-form button[type="submit"]').click();
  await expect(page.locator('.product')).toHaveCount(2);
});

test('salva favoritos e mantém a escolha após recarregar', async ({ page }) => {
  await page.locator('[data-favorite="orbita"]').click();
  await page.reload();
  await page.locator('#favorites-open').click();
  await expect(page.locator('.product')).toHaveCount(1);
  await expect(page.locator('.product-title')).toHaveText('Anel Órbita');
  await page.locator('[data-favorite="orbita"]').click();
  await expect(page.locator('.empty')).toBeVisible();
});

test('mantém a sacola e conclui uma compra demonstrativa', async ({ page }) => {
  await page.locator('[data-detail="orbita"]').first().click();
  await page.locator('#product-variant').selectOption('Aro 16');
  await page.locator('#add-to-cart').click();
  await page.locator('#cart-open').click();
  await expect(page.locator('.cart-item')).toContainText('Aro 16');
  await page.locator('[data-qty="1"]').click();
  await expect(page.locator('#cart-count')).toHaveText('2');
  await expect(page.locator('#cart-dialog .total')).toContainText('578,00');
  await page.locator('#cart-dialog .close').click();
  await page.reload();
  await expect(page.locator('#cart-count')).toHaveText('2');
  await page.locator('#cart-open').click();
  await page.locator('#cep').fill('123');
  await page.locator('#calculate-shipping').click();
  await expect(page.locator('#shipping-result')).toContainText('8 números');
  await page.locator('#cep').fill('01001-000');
  await page.locator('#calculate-shipping').click();
  await expect(page.locator('#cart-dialog .total')).toContainText('597,90');
  await page.locator('#start-checkout').click();
  await page.locator('#delivery-form button[type="submit"]').click();
  await page.locator('#payment').selectOption('Cartão');
  await expect(page.locator('#payment-note')).toContainText('Não informe dados de cartão');
  await page.locator('#confirm-demo').click();
  await expect(page.locator('#checkout-body')).toContainText('Nenhum pagamento foi realizado');
  await expect(page.locator('#cart-count')).toHaveText('0');
});

test('adapta o layout a telas pequenas e abre o menu móvel', async ({ page }) => {
  await page.evaluate(() => document.fonts.ready);
  for (const width of [320, 390, 768, 1000, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), { message: `Sem rolagem horizontal em ${width}px` }).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('#menu-toggle').click();
  await expect(page.locator('#menu-toggle')).toHaveAttribute('aria-expanded', 'true');
  await page.locator('#nav a').first().click();
  await expect(page.locator('#menu-toggle')).toHaveAttribute('aria-expanded', 'false');
});

test('renderiza o anel 3D, anima e respeita movimento reduzido', async ({ page }) => {
  const jewel = page.locator('#hero-jewel');
  await expect(jewel).toHaveAttribute('data-rendered', '3d');
  const first = await jewel.screenshot();
  await expect.poll(async () => !(await jewel.screenshot()).equals(first), { message: 'A imagem do anel deve mudar durante a rotação' }).toBe(true);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  // Two animation frames let the preference change settle before sampling.
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const paused = await jewel.screenshot();
  await page.waitForTimeout(250);
  expect((await jewel.screenshot()).equals(paused), 'A joia fica estática com movimento reduzido').toBe(true);
});
