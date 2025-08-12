import { products } from '../data/products.js';
export const cart = JSON.parse(localStorage.getItem('cart')) || [];

export const state = {
    cartQuantity: JSON.parse(localStorage.getItem('cartQuantity')) || 0
};

export function deleteFromCart(deleteLink) {
    const itemId = deleteLink.dataset.productId;
    const index = cart.findIndex(item => item.id === itemId);
    cart.splice(index, 1);
}

export function countCartQuantity() {
    state.cartQuantity = 0;

    cart.forEach(cartItem => {
        state.cartQuantity += Number(cartItem.quantity);
        console.log(cartItem.quantity);
    });
    localStorage.setItem('state.cartQuantity', JSON.stringify(state.cartQuantity));
    document.querySelector('.centered').innerHTML = state.cartQuantity;

}

export function calculateCartPrice() {
    let totalPrice = 0;
    cart.forEach(cartItem => {
        const productId = cartItem.id;
        const index = products.findIndex(product => product.id === productId);
        const productPrice = products[index].priceCents;
        totalPrice += Number(productPrice) * cartItem.quantity;
    });
    totalPrice = (totalPrice / 100).toFixed(2);
    console.log(totalPrice);
    document.querySelector('.js-total-order-price').innerHTML = totalPrice;

}