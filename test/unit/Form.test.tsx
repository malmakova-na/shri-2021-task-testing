import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import events from "@testing-library/user-event";
import { Router } from "react-router";
import { Provider } from "react-redux";
import { createMemoryHistory } from 'history';

import { Application } from "../../src/client/Application";
import { CartApi } from "../../src/client/api";
import { 
    initStore, checkoutComplete
} from "../../src/client/store";
import { TestExampleApi } from "./TestApi";
import { USER, CartData_Test_1 } from './TestData';

describe("Form тесты на: ", function() {
    const history = createMemoryHistory({
        initialEntries: ["/cart"],
        initialIndex: 0
    });
    const basename = "/hw/store";
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
    it("Правильное заполнение формы", () => {
        const { getByRole} = render(application);
    
        events.type(getByRole('textbox', { name: /name/i }), USER.name);
        expect(getByRole('textbox', { name: /name/i })).toHaveValue(USER.name);

        events.type(getByRole('textbox', { name: /phone/i }), USER.phone);
        expect(getByRole('textbox', { name: /phone/i })).toHaveValue(USER.phone);

        events.type(getByRole('textbox', { name: /address/i }), USER.address);
        expect(getByRole('textbox', { name: /address/i })).toHaveValue(USER.address);

        
        //screen.logTestingPlaygroundURL();

    })
    it('Отправку пустой формы', ()=> {
        const { container, getByText } = render(application);
        const checkBtn = screen.getByRole('button', {
            name: /checkout/i
        });
        events.click(checkBtn);
        expect(getByText(/please provide your name/i)).toBeInTheDocument();
        expect(getByText(/please provide a valid phone/i)).toBeInTheDocument();
        expect(getByText(/please provide a valid address/i)).toBeInTheDocument();
        //screen.logTestingPlaygroundURL()
    })
    
    it("Отрисовку сообщения о совершении заказа", () => {
        const { container } = render(application);
        TestExampleStore.dispatch(checkoutComplete(10));
        
        expect(screen.getByText(/10/i)).toBeInTheDocument();
        
        const message = container.querySelector('div.Cart-SuccessMessage');
        expect(message).toBeInTheDocument();

        //screen.logTestingPlaygroundURL()
    });
});