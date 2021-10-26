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
        const {container} = render(application);
        
        expect(container.getElementsByClassName('Delivery')).toHaveProperty('length', 1);
    });

    
});
