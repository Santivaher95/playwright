import { test, expect } from '@playwright/test';
 
const REPO = 'playwright';
const USER = 'Santivaher95';
 
// El contexto de la solicitud es reutilizado por todas las pruebas en el archivo.
let apiContext;
 
// ----------------------------------------------------
// BLOQUE DE INICIALIZACIÓN DE API
// ----------------------------------------------------
test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
        // Todos los requests que enviamos van a este endpoint.
        baseURL: 'https://api.github.com',
        extraHTTPHeaders: {
            // Configuramos este Header como nos dicen en la docu de GitHub.
            'Accept': 'application/vnd.github.v3+json',
            // Agregamos el token de autorización a todos los requests.
            'Authorization': `token ${process.env.API_TOKEN}`,
        },
    });
});
 
test.afterAll(async ({ }) => {
    // Nos deshacemos de todas las respuestas al final.
    await apiContext.dispose();
});


// ----------------------------------------------------
// TEST DE VERIFICACIÓN E2E (REQUIERE LOGIN)
// ----------------------------------------------------
test('El último issue creado es el primero en la lista', async ({ page }) => {
    // Asegúrate de que las variables de entorno GITHUB_USERNAME y GITHUB_PASSWORD estén configuradas
    if (!process.env.GITHUB_USERNAME || !process.env.GITHUB_PASSWORD) {
        test.skip(true, 'Skipping E2E test: GITHUB_USERNAME or GITHUB_PASSWORD not set for UI login.');
        return;
    }

    // 1. INICIO DE SESIÓN EN LA UI DE GITHUB
    await page.goto('https://github.com/login');
    
    // Rellenar campo de usuario
    await page.fill('input[name="santivaher@gmail.com"]', process.env.GITHUB_USERNAME); 
    
    // Rellenar campo de contraseña
    await page.fill('input[name="Septiembre_1995"]', process.env.GITHUB_PASSWORD); 
    
    // Hacer clic en el botón de login
    await page.click('input[name="commit"]'); 
    
    // Esperar a que el login se complete y redirija al dashboard
    await page.waitForURL('https://github.com/'); 

    // 2. Navegar a la página de Issues
    await page.goto(`https://github.com/${USER}/${REPO}/issues`);

    // 3. Esperar a que la lista de issues sea visible.
    // Usamos el locator más robusto que Playwright recomienda para esperar: .first()
    await page.locator(`a[data-hovercard-type='issue']`).first().waitFor({ state: 'visible', timeout: 30000 });

    // 4. Localizar el primer Issue (que ya debería ser visible)
    const firstIssue = page.locator(`a[data-hovercard-type='issue']`).first();

    // 5. Aserción
    await expect(firstIssue).toHaveText('[Feature] Que el framework me planche la ropa');
});