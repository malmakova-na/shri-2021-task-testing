import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import events from "@testing-library/user-event";
import { Router } from "react-router";
import { Provider } from "react-redux";
import { createMemoryHistory } from 'history';

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
        //console.log(screen.getByText(/welcome to example store!/i).innerHTML)
        expect(
            screen.getByText(/welcome to example store!/i)
        ).toBeInTheDocument();
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
        const {getByRole} = render(application);
        events.click(screen.getByRole('link', {
            name: /cart/i
        }));
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
