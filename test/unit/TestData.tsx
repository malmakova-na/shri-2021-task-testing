import { productsLoaded } from '../../src/client/store';
import { Product, CartItem, CartState } from '../../src/common/types';

const PRODUCT = {
    name: 'test-product-name', 
    description: 'test-product-description',
    color: 'black',
    material: 'test-product-material'
};

export const PRODUCTS: Product[] = [
    {
        id: 0,
        name: PRODUCT.name,
        description: PRODUCT.description,
        price: 1,
        color: PRODUCT.color,
        material: PRODUCT.material,
    },
    {
        id: 1,
        name: PRODUCT.name,
        description: PRODUCT.description,
        price: 2,
        color: PRODUCT.color,
        material: PRODUCT.material,
    },
    {
        id: 2,
        name: PRODUCT.name,
        description: PRODUCT.description,
        price: 3,
        color: PRODUCT.color,
        material: PRODUCT.material,
    },
    {
        id: 3,
        name: PRODUCT.name,
        description: PRODUCT.description,
        price: 4,
        color: PRODUCT.color,
        material: PRODUCT.material,
    }
];
export const Carts:CartState  = {
    0:{
        name: PRODUCT.name,
        count: 0,
        price: 1,
    },
    1:{
        name: PRODUCT.name,
        count: 0,
        price: 2,
    },
    2:{
        name: PRODUCT.name,
        count: 0,
        price: 3,
    },
    3: {
        name: PRODUCT.name,
        count: 0,
        price: 4,
    }
};

export const  getProductById = (id: number) => {
    for(let i = 0; i < PRODUCTS.length; i++) {
        if(PRODUCTS[i].id === id ){
            return PRODUCTS[i];
        }
    }
};