const { assert } = require('chai');

describe('Тест на  товар', async function() {
    it('Переход на страницу товара', async function() {
        await this.browser.url('/hw/store/catalog');
        const productId = await this.browser.$('.ProductItem').getAttribute('data-testid');
        const datailsLink = await this.browser.$('.ProductItem-DetailsLink');
        await datailsLink.click();
        const url = await this.browser.url();
        const urls = url.split('/');
        assert.equal(urls[urls.length - 1], productId);
    });
    it('Отображается добавление в корзину', async function() {
        await this.browser.url(('/hw/store/catalog'));
        await this.browser.$('.ProductItem-DetailsLink').click();
        await this.browser.$('.ProductDetails-AddToCart').click();
        await this.browser.assertView('plain', '.CartBadge', {
          compositeImage: true
        });
    });
    it('Информация сохраняется при обновлении', async function() {
        await this.browser.url('/hw/store/catalog');
        await this.browser.$('.ProductItem-DetailsLink').click();
        await this.browser.$('.ProductDetails-AddToCart').click();
        await this.browser.url('/hw/store/cart');
        await this.browser.url('/hw/store');
        await this.browser.url('/hw/store/cart');
        await this.browser.assertView('plain', '.Cart', {
            compositeImage: true,
        });
        await this.browser.$('.Cart-Clear').click();
    });
    it("есть ссылка на каталог у пустой корзины", async function () {
        await this.browser.url("/hw/store/cart");
        const href = await (await this.browser.$(".Cart a")).getAttribute("href");
        assert.equal(href, "/hw/store/catalog");
    });
    
});