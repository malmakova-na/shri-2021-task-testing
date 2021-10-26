import { ExampleApi, CartApi } from '../../src/client/api';
import { CartState, CheckoutFormData, CheckoutResponse, Product, ProductShortInfo } from '../../src/common/types';
import axios, { AxiosResponse } from 'axios';


export class TestExampleApi extends ExampleApi {
    products: Product[] = [];
    async getProducts() {
        const products = await new Promise((responce) => {
            responce(this.products);
        });

        return products as Promise<AxiosResponse<ProductShortInfo[], any>>;
      
    }
    /*
    async getProductById(id: number) {
      const products = await new Promise((responce) => {
        responce(this.products.filter(p => p.id === id));
        
      });
  
      return products as Promise<AxiosResponse<Product, any>>;
    }*/

};

