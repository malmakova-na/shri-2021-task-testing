import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import events from "@testing-library/user-event";
import { Router } from "react-router";
import { Provider } from "react-redux";
import { createMemoryHistory } from 'history';
import renderer from 'react-test-renderer';

import { Application } from "../../src/client/Application";
import { CartApi, ExampleApi } from "../../src/client/api";
import { 
    initStore, productsLoad, productsLoaded, productDetailsLoad, 
    productDetailsLoaded, checkoutComplete, checkout, clearCart,
    addToCart
} from "../../src/client/store";
import { TestExampleApi } from "./TestApi";
import { PRODUCTS, getProductById, USER, CartData, CartData_Test_1 } from './TestData';
const basename = "/hw/store";
const testId = 0;

describe('Api test: ', () => {

it('checkout', async() => {
    const answ = await checkout(USER, CartData_Test_1);
    expect(answ.cart).toBe(CartData_Test_1);
});

it('checkoutComplete', async() => {
    const answ = await checkoutComplete(0);
    expect(answ.orderId).toBe( 0 );
});

it('clearCart', async() => {
    const api = new TestExampleApi(basename);
    const cart = new CartApi();
    const TestExampleStore = initStore(api, cart);
    TestExampleStore.dispatch( addToCart(PRODUCTS[testId]));
    //console.log(TestExampleStore.getState())
    TestExampleStore.dispatch(clearCart());
    //const answ = await clearCart();
    const answ = TestExampleStore.getState() 
    expect(JSON.stringify(answ)).toBe(JSON.stringify({
        details: {},
        cart: {},
        latestOrderId: undefined
    }));
});

it('addToCat', async() => {
    const api = new TestExampleApi(basename);
    const cart = new CartApi();
    const TestExampleStore = initStore(api, cart);
    //console.log(TestExampleStore.getState())
    TestExampleStore.dispatch( addToCart(PRODUCTS[testId]));
    //console.log(TestExampleStore.getState())
    //TestExampleStore.dispatch(clearCart());
    //const answ = await clearCart();
    const answ = TestExampleStore.getState() 
    expect(JSON.stringify(answ)).toBe(JSON.stringify({
        details: {},
        cart: { '0': { name: 'test-product-name', count: 1, price: 1 } },
        latestOrderId: undefined
      }
    ));
    
});
it(' productsLoad', async() => {
    const api = new TestExampleApi(basename);
    const cart = new CartApi();
    const TestExampleStore = initStore(api, cart);
    //console.log(TestExampleStore.getState())
    TestExampleStore.dispatch( productsLoad());
    //console.log(TestExampleStore.getState())
    //TestExampleStore.dispatch(clearCart());
    //const answ = await clearCart();
    const answ = TestExampleStore.getState() 
    expect(answ.products).toBe(undefined);
});  

it('productsLoaded', async() => {
    const api = new TestExampleApi(basename);
    const cart = new CartApi();
    const TestExampleStore = initStore(api, cart);
    //console.log(TestExampleStore.getState())
    TestExampleStore.dispatch( productsLoaded(PRODUCTS));
    //console.log(TestExampleStore.getState())
    //TestExampleStore.dispatch(clearCart());
    //const answ = await clearCart();
    const answ = TestExampleStore.getState() 
    expect(answ.products).toBe(PRODUCTS);
});  

//productDetailsLoad
it('api: productDetailsLoad', async() => {
    const api = new TestExampleApi(basename);
    const cart = new CartApi();
    const TestExampleStore = initStore(api, cart);
    //TestExampleStore.dispatch(clearCart());
    const answ = await productDetailsLoad(0);
    expect(answ.id).toBe(0)
    //const answ = TestExampleStore.getState() 
    //expect(answ.products).toBe(PRODUCTS);
}); 

it('productDetailsLoaded', async() => {
    const api = new TestExampleApi(basename);
    const STUB = {
        details: {
          '0': {
            id: 0,
            name: 'test-product-name',
            description: 'test-product-description',
            price: 1,
            color: 'black',
            material: 'test-product-material'
          }
        },
        cart: { '0': { name: 'test-product-name', count: 1, price: 1 } }
    };
  
    const cart = new CartApi();
    const TestExampleStore = initStore(api, cart);
    TestExampleStore.dispatch( productDetailsLoaded(PRODUCTS[testId]));
    const answ = TestExampleStore.getState() 
    expect(JSON.stringify(answ)).toBe(JSON.stringify(STUB));

});
})
