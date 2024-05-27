import { createSelector } from '@reduxjs/toolkit';

const cartItemsSelector = (state) => state.cart.cartItems;

// Count number of product in Cart
export const cartItemsCountSelector = createSelector(
    cartItemsSelector, 
    (cartItem) => cartItem.reduce((count, item) => count + item.quantity , 0)
);

// Calculate total of Cart
export const cartTotalSelector = createSelector(
    cartItemsSelector,
    (cartItem) => cartItem.reduce((total, item) => total + (item.quantity * item.product.salePrice) , 0)
);