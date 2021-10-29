const { assert } = require('chai');

describe('Тест на главную страницу', async function() {
    it('Отрисовка', async function() {
        await this.browser.url('/hw/store');
        await this.browser.assertView('plain', '.Application', {
        compositeImage: true,
        });
    });
});