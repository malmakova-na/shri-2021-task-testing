const { assert } = require('chai');

describe('Мобильная версия:', async function() {
    const baseurl = '/hw/store/';
    it('меню должно скрываться за "гамбургер"', async function() {
        await this.browser.setWindowSize(570, 800);
        await this.browser.url(baseurl);

        const burgerMenuButton = await this.browser.$('nav div button');
        assert.equal(await burgerMenuButton.waitForExist(), true);
        const display = await burgerMenuButton.getCSSProperty('display')
        assert.notEqual(display.value, 'none');
        await this.browser.assertView('mobile_nav_closed', 'nav', {
            compositeImage: true,
        });

        const menuContainer = await this.browser.$('nav div div');
        assert.equal(await menuContainer.getAttribute("class"), 'Application-Menu collapse navbar-collapse');
        await burgerMenuButton.click();
        assert.equal(await menuContainer.getAttribute("class"), 'Application-Menu navbar-collapse');
        await this.browser.$('div.Home').click(); //Remove Active From Button
        await this.browser.assertView('mobile_nav_opened', 'nav', {
            compositeImage: true,
            screenshotDelay: 1000
        });
    });
    it('меню закрываться при выборе элемента ', async function() {
        await this.browser.setWindowSize(570, 800);
        await this.browser.url(baseurl);
        const menu = ['catalog', 'delivery', 'contacts', 'cart'];
        for(let i = 0; i < menu.length; i++) {
            let burgerMenuButton = await this.browser.$('button.Application-Toggler');
            assert.equal(await burgerMenuButton.waitForExist(), true);
            await burgerMenuButton.click();

            let hiddenMenu = await this.browser.$('div.navbar-nav');
            let navbar = await this.browser.$('nav div div');
            assert.equal(await navbar.getAttribute("class"), 'Application-Menu navbar-collapse');

            let link = await hiddenMenu.$$('a')[i];
            assert.equal(await link.waitForExist(), true);

            link.click();
            navbar = await this.browser.$('nav div div');
            assert.equal(await navbar.getAttribute("class"), 'Application-Menu collapse navbar-collapse');

            let currentUrl = await this.browser.getUrl();
            assert.equal(currentUrl.includes(menu[i]), true);
        }
    });
    it('Название магазина- ссылка на главную страницу', async function() {
        await this.browser.setWindowSize(570, 800);
        await this.browser.url(baseurl);
        const link = await this.browser.$('nav').$('a=Example store');
        const href = await link.getAttribute('href');
        assert.equal(href, baseurl);
    });
    it('статическое содержимое', async function() {
        await this.browser.setWindowSize(570, 800);
        await this.browser.url(baseurl);
        await this.browser.assertView('mobile_main_page', 'div.Application', {
            compositeImage: false,
            allowViewportOverflow: true,
            screenshotDelay: 1000
        });
         
        await this.browser.url(baseurl + '/contacts');
        await this.browser.assertView('mobile_contacts_page', 'div.Application', {
            compositeImage: false,
            allowViewportOverflow: true,
            screenshotDelay: 1000
        });
        await this.browser.url(baseurl + '/delivery');
        await this.browser.assertView('mobile_delivery_page', 'div.Application', {
            compositeImage: false,
            allowViewportOverflow: true,
            screenshotDelay: 1000
        });
       
    });
});