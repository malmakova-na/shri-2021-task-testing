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

it("Правильно отображается NavBar", () => {
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
        const {getByRole, container} = render(application);
        
        expect(screen.getByRole('link', {
            name: /catalog/i
        })).toBeInTheDocument();

        expect(screen.getByRole('link', {
            name: /delivery/i
        })).toBeInTheDocument();

        expect(screen.getByRole('link', {
            name: /contacts/i
        })).toBeInTheDocument();

        expect(screen.getByRole('link', {
            name: /cart/i
        })).toBeInTheDocument();

});