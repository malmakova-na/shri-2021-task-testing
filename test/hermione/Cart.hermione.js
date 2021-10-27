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
    it("очищение ", async function() {
        await browser.url('https://shri.yandex/hw/store');

        const menu = await browser.$('.navbar-nav');
        await menu.$$('a')[0].click();

        await browser.$('.card-link').click();

        await browser.$('.btn').click();

        await menu.$$('a')[3].click();

        assert.equal(await browser.$('.table').isDisplayed(), true);
        assert.equal(await browser.$('.Form').isDisplayed(), true);

        await browser.$('.Cart-Clear').click();

        assert.equal(await browser.$('.table').isDisplayed(), false);
        assert.equal(await browser.$('.Form').isDisplayed(), false);
        assert.equal(await menu.$$('a')[3].getText(), 'Cart');
    })
});