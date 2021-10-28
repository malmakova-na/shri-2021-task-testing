const { assert } = require('chai');

describe('Тест на корзину', async function() {
    const browser = this.browser;
    it('Отрисовка', async function() {
        await browser.url('/hw/store');
        await browser.assertView('plain', '.Application', {
        compositeImage: true,
        });
    });
   
});