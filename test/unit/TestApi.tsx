import { ExampleApi, CartApi } from '../../src/client/api';
import { Product, ProductShortInfo } from '../../src/common/types';
import axios, { AxiosResponse } from 'axios';


export class TestExampleApi extends ExampleApi {
    products: Product[] = [];
    async getProducts() {
        const products = await new Promise((responce) => {
            responce(this.products);
        });

        return products as Promise<AxiosResponse<ProductShortInfo[], any>>;
      
    }
   
    
    async getProductById(id: number) {
      const ans = await new Promise((res, rej) => {
        for (let product of this.products) {
          if (product.id === id) res(product);
        }
        rej(null);
      });
  
      return ans as Promise<AxiosResponse<Product, any>>;
    }

};

