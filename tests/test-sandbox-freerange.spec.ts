import { test, Browser, Page, expect } from '@playwright/test';

(async () => {
  let browser: Browser;
  let page: Page;
  let textoaescribir= 'estoy aprendiendito madafaca';
 
  test.describe('acciones en el automation sandbox', () => {

    test('click en boton id dinamico', async({page}) => {

   await test.step('dado que navego al sandbox de free range tester', async () =>{
       await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
    })

    await test.step ('puedo hacer click en el boton', async () => {
       const botoniddinamico = page.getByRole('button', { name: 'Hacé click para generar un ID' });
       await botoniddinamico.click({force: true});
       await expect(page.getByText('OMG, aparezco después de 3')).toBeVisible();
    })
})

    test('lleno un campo de texto en automation', async ({ page }) => {

         await test.step('dado que navego al sandbox de free range tester', async () =>{
             await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
    })

        await test.step('puedo ingresar texto en el campo un aburrido texto', async () => {
          await expect(page.getByRole('textbox', { name: 'Un aburrido texto' }),'el campo de texto no es editable').toBeEditable();
          await page.getByRole('textbox', { name: 'Un aburrido texto' }).fill(textoaescribir);
          await expect(page.getByRole('textbox', { name: 'Un aburrido texto' }),'el campo de texto no es editable').toHaveValue(textoaescribir );

        })
        
        
    })
    
    test('puedo seleccionar y deseleccionar un checkbox', async ({ page }) => {

         await test.step('dado que navego al sandbox de free range tester', async () =>{
             await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
    })

        await test.step('puedo seleccionar el checkbox pasta', async () => {
          await page.getByRole('checkbox', { name: 'Pasta 🍝' }).check();
          
          await expect(page.getByRole('checkbox', { name: 'Pasta 🍝' }),'el check no estaba seleccionado').toBeChecked();
            
        })
        
        await test.step('puedo seleccionar el checkbox pasta', async () => {
           
          await page.getByRole('checkbox', { name: 'Pasta 🍝' }).uncheck();
          await expect(page.getByRole('checkbox', { name: 'Pasta 🍝' }),'el check estaba seleccionado').not.toBeChecked();
            
        })
        
        
    })

    test('puedo seleccionar radiobuttons', async ({ page }) => {

         await test.step('dado que navego al sandbox de free range tester', async () =>{
             await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
    })

        await test.step('puedo seleccionar radiobutton para no', async () => {
          await page.getByRole('radio', { name: 'No' }).check();
          await expect(page.getByRole('radio', { name: 'No' }), 'el boton no esta seleccionado').toBeChecked;
            
        })
        
        
    })

    test('puedo seleccionar un item del dropdown', async ({ page }) => {

         await test.step('dado que navego al sandbox de free range tester', async () =>{
             await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
    })

        await test.step('puedo seleccionar deporte del dropdown', async () => {
          await page.getByLabel('Dropdown').selectOption('Basketball');
            
        })
        
        
    })

    test('Los items del dropdown son los esperados', async ({ page }) => {
        test.fail();
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('Valido que la lista del dropdown contiene los deportes esperados', async () => {
                const deportes = ['Fútbol', 'Tennis', 'Basketball','teto']
 
                for (let opcion of deportes) {
                    const element = await page.$(`select#formBasicSelect > option:is(:text("${opcion}"))`);
                    if (element) {
                        console.log(`La opción '${opcion}' está presente.`);
                    } else {
                        throw new Error(`La opción '${opcion}' no está presente.`);
                    }
                }
 
            })
 
 
        })

        test('Valido la columna Nombres de la tabla estática', async ({ page }) => {
             
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('  https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
 
            await test.step('Puedo validar los elementos para la columna Nombre de la tabla estática', async () => {
                const valoresColumnaNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
                const nombresEsperados = ['Messi', 'Ronaldo', 'Mbappe'];
                //Saca una screen y la adjunta aunque el caso pase.
                 await test.info().attach('screenshot',{
                body: await page.screenshot(),
                contentType: 'image/png',
            })
                
                expect(valoresColumnaNombres).toEqual(nombresEsperados);
            })
           
 
        })

        test('Valido que todos los valores cambian en la tabla dinámica luego de un reload', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
 
            await test.step('Valido que los valores cambiaron al hacer un reload a la web', async () => {
                //Creamos un arreglo con todos los valores de la tabla dinámica
                const valoresTablaDinamica = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
                console.log(valoresTablaDinamica);
 
                //Hacemos una recarga para que cambien los valores
                await page.reload();
 
                //Creamos un segundo arreglo con los valores luego de la recarga
                const valoresPostReload = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
                console.log(valoresPostReload);
 
                //Validamos que todos los valores cambiaron para cada celda.
                expect(valoresTablaDinamica).not.toEqual(valoresPostReload);
 
            })
 
 
        })

    test('puedo seleccionar un dia del dropdown de dias de la semana', async ({ page }) => {

         await test.step('dado que navego al sandbox de free range tester', async () =>{
             await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
    })

        await test.step('puedo seleccionar un día de la semana', async () => {
          await page.getByRole('button', { name: ' Día de la semana' }).click();
          await page.getByRole('link', { name: 'Martes' }).click();
          
            
        })
        
         
    })
    test('Ejemplo de Soft Assertions', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('Valido que todos los elementos de los checkboxes son los correctos', async () => {
                await expect.soft(page.getByText('Pizza 🍕'), 'No se encontró el elemento Pizza 🍕').toBeVisible();
                await expect.soft(page.getByText('Hamburguesa 🍔'), 'No se encontró el elemento Hamburguesa 🍔').toBeVisible();
                await expect.soft(page.getByText('Pasta 🍝'), 'No se encontró el elemento Pasta 🍝').toBeVisible();
                await expect.soft(page.getByText('Helado 🍧'), 'No se encontró el elemento Helado 🍧').toBeVisible();
                await expect.soft(page.getByText('Torta 🍰'), 'No se encontró el elemento Torta 🍰').toBeVisible();
            })
 
        })
        test('Validando dentro de un popup', async ({ page, browserName }) => {
            //test.skip(browserName === 'chromium');
            test.info().annotations.push({
                type: 'pruebesita del crack',
                description: 'todo cheverongo'
            });
            await test.step('Dado que navego al sandbox', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
 
            await test.step('Cuando hago click en el botón popup', async () => {
                await page.getByRole('button', { name: 'Mostrar popup' }).click();
            })
 
            await test.step('Puedo validar un elemento dentro del popup', async () => {
                await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
                await page.getByRole('button', { name: 'Cerrar' }).click();
 
            })
 
 
        })
  })

}) (); 