const { assert } = require('chai');
const { async } = require('rxjs/dist/cjs');

describe('Тест на корзину', async function() {
    const browser = this.browser;
    it('Отрисовка', async function() {
        await browser.url('https://shri.yandex/hw/store');
        await browser.assertView('plain', '.Application', {
        compositeImage: true,
        });
    });
   
});