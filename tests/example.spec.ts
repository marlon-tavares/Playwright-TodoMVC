import { test, expect } from '@playwright/test';

test('Valida elementos da página', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');

  // Expect a title "to contain" a substring.
  await expect(page.locator('[data-testid="header"]')).toContainText('todos');

});

test('Cria um todo list', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');

    // Selecionar o campo de entrada usando data-testid e preencher com texto
    await page.locator('[data-testid="text-input"]').fill('novo item');

      // Expect a title "to contain" a substring.
  await expect(page.locator('[data-testid="header"]')).toContainText('todos');

    // Opcional: Validar se o texto foi preenchido corretamente
    const inputValue = await page.locator('[data-testid="text-input"]').inputValue();
    expect(inputValue).toBe('novo item');

     // Pressionar a tecla ENTER no campo de entrada
  await page.locator('[data-testid="text-input"]').press('Enter');

   // Esperar e verificar se o elemento com data-testid="todo-item-label" está visível
   const todoItem = page.locator('[data-testid="todo-item-label"]');
   await expect(todoItem).toBeVisible(); // Verifica se o elemento está visível na página
})
