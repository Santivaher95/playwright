import { test, expect } from '@playwright/test';
 
const REPO = 'playwright';
const USER = 'Santivaher95';
 
 
 
test('Puedo crear un bug en el repooo', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Bug] Explotó todoo',
            body: 'Estamos perdidirijillos!',
        }
    });
    expect(newIssue.ok()).toBeTruthy();
 
    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[Bug] Explotó todoo',
        body: 'Estamos perdidirijillos!'
    }));
});
 
test('Puedo crear un feature request', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Feature] Quiero que haga helados',
            body: 'Estaría buenísimo que el repo haga helados 🍦',
        }
    });
    expect(newIssue.ok()).toBeTruthy();
 
    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[Feature] Quiero que haga helados',
        body: 'Estaría buenísimo que el repo haga helados 🍦'
    }));
});
 
