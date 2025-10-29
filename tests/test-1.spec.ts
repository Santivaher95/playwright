import { test, expect } from '@playwright/test';

// Es una buena práctica usar variables de entorno para las credenciales, 
// pero para este ejemplo, usaremos el texto directamente como lo solicitaste.
const EMAIL_ADDRESS = 'santivaherfifa@gmail.com';

test('FIfICA login attempt - fill email', async ({ page }) => {
  await page.goto('https://www.ea.com/ea-sports-fc/ultimate-team/web-app/');
  await expect(page).toHaveTitle('FC Ultimate Team Web App - EA SPORTS Official Site');

  // Playwright esperará automáticamente hasta que el botón con el texto 'Login'
  // esté visible, habilitado y listo para ser clickeado.
  await page.getByText('Login').click();

  // Aserción para verificar que la navegación ha funcionado.
  await expect(page).toHaveURL(/.*login/);
  
  // ----------------------------------------------------------------------
  // PASO AÑADIDO: Rellenar el campo de texto con el correo electrónico
  // ----------------------------------------------------------------------
  await page.getByRole('textbox', { name: 'Phone or Email' }).fill(EMAIL_ADDRESS);


  await page.getByText('NEXT').click();

   await page.getByRole('textbox', { name: 'Password' }).fill('Fasa3113');

    await page.getByText('SIGN IN').click();
  // Si deseas continuar con el inicio de sesión, el siguiente paso 
  // probablemente sería hacer clic en un botón de "Next" o "Continue".
  // Por ejemplo: await page.getByRole('button', { name: 'Continue' }).click();

});