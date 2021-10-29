import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import events from "@testing-library/user-event";
import { Router } from "react-router";
import { Provider } from "react-redux";
import { createMemoryHistory } from 'history';

import { Application } from "../../src/client/Application";
import { CartApi } from "../../src/client/api";

import { TestExampleApi } from "./TestApi";
import { PRODUCTS, CartData_Test_1, CartData_Test_3 } from './TestData';

import { 
    initStore, productsLoaded
} from "../../src/client/store";
describe("Cart тесты на: ", function() {
    const history = createMemoryHistory({
        initialEntries: ["/cart"],
        initialIndex: 0
    });
    const basename = "/hw/store";
    
    it('наличие ссылки на каталог при пустом состоянии', () => {
        const api = new TestExampleApi(basename);
        const cart = new CartApi();
        const TestExampleStore = initStore(api, cart);
        const application = (
            <Router history={history}>
                <Provider store={TestExampleStore}>
                <Application />
                </Provider>
            </Router>
        );
        const { container } = render(application);
        const view = screen.getByText(
            /cart is empty\. please select products in the \./i);
        expect(view).toBeInTheDocument();
        const catalogLink = within(view).getByRole('link', {
            name: /catalog/i
        });
        expect(catalogLink).toHaveAttribute('href');
        //screen.logTestingPlaygroundURL()
    })

    it("Корректное удаление содержимого корзины", () => {
        const api = new TestExampleApi(basename);
        const cart = new CartApi();
        cart.setState(CartData_Test_1)
        const TestExampleStore = initStore(api, cart);
        const application = (
            <Router history={history}>
                <Provider store={TestExampleStore}>
                <Application />
                </Provider>
            </Router>
        );
        const { container } = render(application);
    
        const clrBtn = screen.getByRole('button', {
            name: /clear shopping cart/i
        });
        //expect(clrBtn).toBeInTheDocument();//есть ли  кнопка удаления
        events.click(clrBtn);

        //console.log(JSON.stringify(cart.getState()))
        expect(JSON.stringify(cart.getState())).toBe('{}');
        //screen.logTestingPlaygroundURL()
        
    })

    it("заполненную корзину", () => {
        const api = new TestExampleApi(basename);
        const cart = new CartApi();
        cart.setState(CartData_Test_1)
        const TestExampleStore = initStore(api, cart);
        const application = (
            <Router history={history}>
                <Provider store={TestExampleStore}>
                <Application />
                </Provider>
            </Router>
        );
        const { container } = render(application);

        const header = screen.getByRole('heading', {
            name: /сheckout/i
        });
        expect(header).toBeInTheDocument();

        const form = container.querySelector('div.Form');
        expect(form).toBeInTheDocument();

        const name = container.querySelector('td.Cart-Name').innerHTML;
        expect(name).toBe(CartData_Test_1[0].name);

        const price = container.querySelector('td.Cart-Price').innerHTML;
        expect(price).toBe('$' + CartData_Test_1[0].price);

        const count = container.querySelector('td.Cart-Count').innerHTML;
        expect(count).toBe(`${TestExampleStore.getState().cart[0].count}`);

        const total = container.querySelector('td.Cart-Total').innerHTML;
        expect(total).toBe('$' + CartData_Test_1[0].price);
        
       
        
       // screen.logTestingPlaygroundURL()
    })

    it("тест на добавление разных товаров", () => {
        const api = new TestExampleApi(basename);
        const cart = new CartApi();
        cart.setState(CartData_Test_3);
        const TestExampleStore = initStore(api, cart);
        const application = (
            <Router history={history}>
                <Provider store={TestExampleStore}>
                <Application />
                </Provider>
            </Router>
        );
        const { container, getByRole} = render(application);
        TestExampleStore.dispatch(productsLoaded(PRODUCTS));

        expect(screen.getByRole('link', {
            name: /cart \(2\)/i
        })).toBeInTheDocument();
        //screen.logTestingPlaygroundURL()
    });


});