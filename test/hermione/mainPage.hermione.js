const { assert } = require('chai');

describe('Тест на главную страницу', async function() {
    it('Отрисовка', async function() {
        await this.browser.url('/hw/store');
        await this.browser.assertView('plain', '.Application', {
        compositeImage: true,
        });
    });
    it("есть навигация", async function () {
        const links = await this.browser.$$(".nav-link");
        assert.equal(links.length, 4)
        const topics = await Promise.all(links.map(link => link.getText()))
        const urls = await Promise.all(links.map(link => link.getAttribute('href')))
    
        assert.deepEqual(topics, [ 'Catalog', 'Delivery', 'Contacts', 'Cart' ])
        assert.deepEqual(urls, [
              '/hw/store/catalog',
              '/hw/store/delivery',
              '/hw/store/contacts',
              '/hw/store/cart'
            ]
        )
      })
    
});