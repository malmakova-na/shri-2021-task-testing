import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import events from "@testing-library/user-event";
import { Router } from "react-router";
import { Provider } from "react-redux";
import { createMemoryHistory } from 'history';
import renderer from 'react-test-renderer';

import { Application } from "../../src/client/Application";
import { CartApi } from "../../src/client/api";
import { initStore, productsLoad, productsLoaded, productDetailsLoad, productDetailsLoaded } from "../../src/client/store";
import { TestExampleApi } from "./TestApi";
import { PRODUCTS, getProductById, CartData, CartData_Test_1, CartData_Test_2, CartData_Test_3 } from './TestData';

describe('Catalog тест на: ', function() {
    const basename = "/hw/store";
    const history = createMemoryHistory({
        initialEntries: ["/catalog"],
        initialIndex: 0
    });
    const api = new TestExampleApi(basename);
    const cart = new CartApi();
    //cart.setState(CartData);
    const TestExampleStore = initStore(api, cart);
    const application = (
        <Router history={history}>
            <Provider store={TestExampleStore}>
            <Application />
            </Provider>
        </Router>
    );
    it('отображение товаров', ()=>{
        const { container} = render(application);
        
        TestExampleStore.dispatch(productsLoad());
        expect(screen.getByText(/loading/i).innerHTML).toBe('LOADING');
        TestExampleStore.dispatch(productsLoaded(PRODUCTS));
        //screen.logTestingPlaygroundURL();

        
        const imgs = container.querySelectorAll('img.Image');
        expect(imgs.length).toBe(PRODUCTS.length);
        //screen.logTestingPlaygroundURL()


    
        const products = container.querySelectorAll(".card-body");
        //console.log("cart state", TestExampleStore.getState())
        expect(products.length).toEqual(PRODUCTS.length);//правильное количество товаров
        products.forEach((product, id) => {
            const testExample = getProductById(id);
            //правильное название товара
            const name = product.querySelector('h5.ProductItem-Name.card-title').innerHTML;
            expect(name).toBe(testExample.name);
            //правильное цена
            const price = product.querySelector('p.ProductItem-Price.card-text').innerHTML;
            expect(price).toBe('$' + testExample.price);
            //правильная ссылка
            const link = product.querySelector('a.ProductItem-DetailsLink.card-link').getAttribute('href');
            expect(link).toBe(`/catalog/${id}`);
        });
        const productStatus = container.querySelector('span.CartBadge');
        expect(productStatus).toBeNull();
    })

    it("тест на отображение деталей о товаре ", () => {
        const { container, getByRole} = render(application);

        const testId = 0;
        const product = getProductById(testId);

        TestExampleStore.dispatch(productsLoad());
        TestExampleStore.dispatch(productsLoaded(PRODUCTS));

        const detailsLink = container.querySelector('.ProductItem-DetailsLink');
        expect(detailsLink).toBeInTheDocument();
        events.click(detailsLink); 
        
        TestExampleStore.dispatch(productDetailsLoad(product.id));
        expect(screen.getByText(/loading/i).innerHTML).toBe('LOADING');
        TestExampleStore.dispatch(productDetailsLoaded(product));

        const name = container.querySelector('h1.ProductDetails-Name').innerHTML;
        expect(name).toBe(product.name);

        const description = container.querySelector('p.ProductDetails-Description').innerHTML;
        expect(description).toBe(product.description);

        const price = container.querySelector('p.ProductDetails-Price').innerHTML;
        expect(price).toBe('$' + product.price);

        const color = container.querySelector('dd.ProductDetails-Color').innerHTML;
        expect(color).toBe(product.color);

        const material = container.querySelector('dd.ProductDetails-Material').innerHTML;
        expect(material).toBe(product.material);

        expect(
            screen.getByRole('button', {
                name: /add to cart/i
            })
        ).toBeInTheDocument();

    });
    it("тест на добавление товаров", () => {
        const { container, getByRole} = render(application);
        const addBtn = screen.getByRole('button', {
            name: /add to cart/i
        });
        events.click(addBtn);
        //TestExampleStore.dispatch(productsLoaded(PRODUCTS));
        //console.log(TestExampleStore.getState())
        expect(screen.getByText(/item in cart/i)).toBeInTheDocument();
        expect(screen.getByRole('link', {
            name: /cart \(1\)/i
        })).toBeInTheDocument();
        

    });
})