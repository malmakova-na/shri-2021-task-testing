import { Product, CartItem, CartState, CheckoutFormData } from '../../src/common/types';

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
export const CartData:CartState  = {
    0:{
        name: PRODUCT.name,
        count: 0,
        price: 1,
    }
};
export const CartData_Test_1:CartState  = {
    0:{
        name: PRODUCTS[0].name,
        count: 1,
        price: PRODUCTS[0].price,
    },
};
export const CartData_Test_2:CartState  = {
    0:{
        name: PRODUCTS[0].name,
        count: 2,
        price: PRODUCTS[0].price,
    },
};
export const CartData_Test_3:CartState  = {
    0:{
        name: PRODUCTS[0].name,
        count: 2,
        price: PRODUCTS[0].price,
    },
    1:{
        name: PRODUCTS[1].name,
        count: 1,
        price: PRODUCTS[0].price,
    }
};
export const  getProductById = (id: number) => {
    for(let i = 0; i < PRODUCTS.length; i++) {
        if(PRODUCTS[i].id === id ){
            return PRODUCTS[i];
        }
    }
};

export const USER: CheckoutFormData = {
    name: 'Test User Name',
    phone: '89686857722',
    address: 'Test_User_Adress',
}

