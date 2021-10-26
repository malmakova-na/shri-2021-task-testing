import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import events from "@testing-library/user-event";
import { Router } from "react-router";
import { Provider } from "react-redux";
import { createMemoryHistory } from 'history';
import renderer from 'react-test-renderer';


import { Application } from "../../src/client/Application";
import { ExampleApi, CartApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";

describe('Переход по адресу: ', function() {
    it('/delivery открывается страница "Delivery"', () => {
        const history = createMemoryHistory({
        initialEntries: ['/delivery'],
        initialIndex: 0
        });

        const basename = "/hw/store";

        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);

        const application = (
        <Router history={history}>
            <Provider store={store}>
                <Application />
            </Provider>
        </Router>
        );
        const {getByRole} = render(application);
        events.click(screen.getByRole('link', {
            name: /catalog/i
        }));
        expect(
            screen.getByRole('heading', { name: /catalog/i}).textContent
        ).toEqual('Catalog');
        const contactSnapshot = renderer.create(application).toJSON();
      
        expect(contactSnapshot).toMatchSnapshot();
    });

    it('/ открывается главная страница приложения', () => {
        const history = createMemoryHistory({
        initialEntries: ['/'],
        initialIndex: 0
        });
        
        const basename = "/hw/store";
        
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);
        
        const application = (
        <Router history={history}>
            <Provider store={store}>
                <Application />
            </Provider>
        </Router>
        );
        const {getByRole} = render(application);
        expect(
            screen.getByText(/welcome to example store!/i)
        ).toBeInTheDocument();
        const appSnapshot = renderer.create(application).toJSON();
      
        expect(appSnapshot).toMatchSnapshot();
        //screen.logTestingPlaygroundURL();
    });

    it('/cart открывается страница "Cart"', () => {
        const history = createMemoryHistory({
        initialEntries: ['/cart'],
        initialIndex: 0
        });
        
        const basename = "/hw/store";
        
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);
        
        const application = (
        <Router history={history}>
            <Provider store={store}>
                <Application />
            </Provider>
        </Router>
        );
        const {getByRole, container} = render(application);
        const cartSnapshot = renderer.create(application).toJSON();
        
        events.click(screen.getByRole('link', {
            name: /cart/i
        }));
        expect(cartSnapshot).toMatchSnapshot();
        expect(
            screen.getByRole('heading', { name: /cart/i}).textContent
        ).toEqual('Shopping cart');
        
    });
    it('/contacts открывается страница "Contacts"', () => {
        const history = createMemoryHistory({
        initialEntries: ['/contacts'],
        initialIndex: 0
        });
        
        const basename = "/hw/store";
        
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);
        
        const application = (
        <Router history={history}>
            <Provider store={store}>
                <Application />
            </Provider>
        </Router>
        );
        const {getByRole} = render(application);
        events.click(screen.getByRole('link', {
            name: /contacts/i
        }));
        expect(
            screen.getByRole('heading', { name: /contacts/i}).textContent
        ).toEqual('Contacts');
        const contactSnapshot = renderer.create(application).toJSON();
      
        expect(contactSnapshot).toMatchSnapshot();
    });

    it('/catalog открывается страница "Catalog"', () => {
        const history = createMemoryHistory({
        initialEntries: ['/catalog'],
        initialIndex: 0
        });
        
        const basename = "/hw/store";
        
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        const store = initStore(api, cart);
        
        const application = (
        <Router history={history}>
            <Provider store={store}>
                <Application />
            </Provider>
        </Router>
        );
        const {getByRole} = render(application);
        events.click(screen.getByRole('link', {
            name: /catalog/i
        }));
        expect(
            screen.getByRole('heading', { name: /catalog/i}).textContent
        ).toEqual('Catalog');
    });
});
