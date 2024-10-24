import { test, expect } from '@playwright/test';
import { beforeEach } from 'node:test';

test.beforeEach(async ({page}) => { 
  // Acessa a página welcome
  await page.goto('https://dialogqa-pwa.dialog.cm/welcome');

  // Seleciona o login padrão
  await page.locator('[data-testid="default-welcome-access-button"]').click();

  // Realiza o login com sucesso
  await page.locator('[data-testid="login.username"]').fill('777222');
  await page.locator('[data-testid="login.password"]').fill('critical');
  await page.locator('[data-testid="login.submit"]').click();
})

test('Valida elementos da página', async ({ page }) => {
  // Valida se o elemento de perfil está visível
  await page.locator('[data-testid="header.profile"]').isVisible();

  // Acessa a Timeline
  await page.getByRole('link', { name: 'article Timeline' }).click();

  // Acessa a tela de posts
  await page.locator('[data-testid="AddPhotoAlternateIcon"]').click();

  // Valida se o botão de like está visível
  await page.locator('[data-testid="ThumbUpAltIcon"]').isVisible(); 

  // Escreve um titulo de post
  await page.locator('#outlined-basic').fill('Titulo: POC Playwright');

  // Escreve um conteudo de post
  await page.locator('[data-testid="rich-text-root"]').fill('Conteudo: POC Playwright');

});

