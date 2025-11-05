import { test, expect } from '@playwright/test';
 
const REPO = 'playwright';
const USER = 'Santivaher95';
 
// El contexto de la solicitud es reutilizado por todas las pruebas en el archivo.
let apiContext;
 
test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
        // Todos los requests que enviamos van a este endpoint.
        baseURL: 'https://api.github.com',
        extraHTTPHeaders: {
            // Configuramos este Header como nos dicen en la docu de GitHub.
            'Accept': 'application/vnd.github.v3+json',
            // Agregamos el token de autorización a todos los requests.
            // Acá ponemos el token que generamos en GitHub.
            'Authorization': `token ${process.env.API_TOKEN}`,
        },
    });
});
 
test.afterAll(async ({ }) => {
    // Nos deshacemos de todas las respuestas al final.
    await apiContext.dispose();
});
 
test('El último issue creado es el primero en la lista', async ({ page, request }) => {
    // 1. Navegar a la página de Issues
    await page.goto(`https://github.com/${USER}/${REPO}/issues`);

    // 2. AÑADIR ESPERA EXPLÍCITA (o esperar a que el primer elemento sea visible)
    // Usaremos el selector más general del contenedor de la lista de issues para asegurar que la página ha cargado la tabla.
    await page.waitForSelector('.js-issue-row', { state: 'visible' });

    // 3. Localizar el primer Issue
    const firstIssue = page.locator(`a[data-hovercard-type='issue']`).first();

    // 4. Aserción
    await expect(firstIssue).toHaveText('[Feature] Que el framework me planche la ropa');
});