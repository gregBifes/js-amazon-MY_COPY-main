export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export const state = {
    cartQuantity: JSON.parse(localStorage.getItem('cartQuantity')) || 0
};

