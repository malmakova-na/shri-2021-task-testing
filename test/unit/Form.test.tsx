import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import events from "@testing-library/user-event";
import { Router } from "react-router";
import { Provider } from "react-redux";
import { createMemoryHistory } from 'history';
import renderer from 'react-test-renderer';

import { Application } from "../../src/client/Application";
import { CartApi } from "../../src/client/api";
import { 
    initStore, productsLoad, productsLoaded, productDetailsLoad, 
    productDetailsLoaded, checkoutComplete
} from "../../src/client/store";
import { TestExampleApi } from "./TestApi";
import { PRODUCTS, getProductById, USER, CartData, CartData_Test_1 } from './TestData';

describe("Form тесты на: ", function() {
    const basename = "/hw/store";
    const history = createMemoryHistory({
        initialEntries: ["/catalog"],
        initialIndex: 0
    });
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
    const testId = 0;
    const product = getProductById(testId);
    it("Правильное отображение корзины", () => {
        

    TestExampleStore.dispatch(productsLoad());
    TestExampleStore.dispatch(productsLoaded(PRODUCTS));

    const detailsLink = container.querySelectorAll('.ProductItem-DetailsLink')[testId];
    events.click(detailsLink); 
    
    TestExampleStore.dispatch(productDetailsLoad(product.id));
    TestExampleStore.dispatch(productDetailsLoaded(product));
    
    //screen.logTestingPlaygroundURL()
    //const addBtn = container.querySelector('button.ProductDetails-AddToCart');
    const addBtn = screen.getByRole('button', {
        name: /add to cart/i
    });

    events.click(addBtn);
    screen.logTestingPlaygroundURL()
    const cartBtn = screen.getByRole('link', {
        name: /cart \(1\)/i
    });
    screen.logTestingPlaygroundURL()
   
        //const { container } = render(application);
    
        events.click(cartBtn);
        const name = container.querySelector('td.Cart-Name').innerHTML;
        expect(name).toBe(product.name);

        const price = container.querySelector('td.Cart-Price').innerHTML;
        expect(price).toBe('$' + product.price);

        const count = container.querySelector('td.Cart-Count').innerHTML;
        expect(count).toBe(`${TestExampleStore.getState().cart[testId].count}`);

        const total = container.querySelector('td.Cart-Total').innerHTML;
        expect(total).toBe('$' + product.price);
        //screen.logTestingPlaygroundURL()

    })
    it("Корректное удаление содержимого корзины", () => {
        const history = createMemoryHistory({
            initialEntries: ["/cart"],
            initialIndex: 0
        });
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
    
        expect(screen.getByRole('button', {
            name: /clear shopping cart/i
        })).toBeInTheDocument();//есть ли  кнопка удаления
        TestExampleStore.dispatch(checkoutComplete(testId));
        cart.setState(CartData);
        expect(screen.getByText(/cart is empty\. please select products in the \./i)).toBeInTheDocument();
        const view = screen.getByText(
            /cart is empty\. please select products in the \./i);
          
          within(view).getByRole('link', {
            name: /catalog/i
        });
        expect(view).toBeInTheDocument();
        const form = container.querySelector('Form');
        expect(form).toBeNull();
        
        //screen.logTestingPlaygroundURL()
        
    })

    it("Отправление пустой формы", () => {
        const { container, getByText} = render(application);
        expect(getByText(/please provide your name/i)).toBeInTheDocument();
        expect(getByText(/please provide a valid phone/i)).toBeInTheDocument();
        expect(getByText(/please provide a valid address/i)).toBeInTheDocument();
        

        
        //screen.logTestingPlaygroundURL()
    })

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
    it("Отрисовку сообщения о совершении заказа", () => {
        const { container } = render(application);
        TestExampleStore.dispatch(checkoutComplete(10));
        
        expect(screen.getByText(/10/i)).toBeInTheDocument();
        const message = container.querySelector('div.Cart-SuccessMessage');
        expect(message).toBeInTheDocument();
        const view = screen.getByText(
            /cart is empty\. please select products in the \./i);
          
          within(view).getByRole('link', {
            name: /catalog/i
        });
        expect(view).toBeInTheDocument();
        const messageSnapshot = renderer.create(application).toJSON();
      
        expect(messageSnapshot).toMatchSnapshot();
        //screen.logTestingPlaygroundURL()
    });

});