import { products } from './products.js';
export const cart = JSON.parse(localStorage.getItem('cart')) || [];

export const state = {
    cartQuantity: JSON.parse(localStorage.getItem('cartQuantity')) || 0
};


export function updateCart(updateLink) {
    //zlokalizować produkt z karty do modyfikacji
    const itemId = updateLink.dataset.productId;
    const index = cart.findIndex(item => item.id === itemId);
    const cartItem = cart[index];

    const inputQuantityElement = document.querySelector(`.js-input-${itemId}`);


    inputQuantityElement.classList.add('visible');
    inputQuantityElement.style.display = 'inline';

    inputQuantityElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            cartItem.quantity = Number(inputQuantityElement.value);
            document.dispatchEvent(new CustomEvent('cart-updated'));
        }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
}


export function deleteFromCart(deleteLink) {
    const itemId = deleteLink.dataset.productId;
    const index = cart.findIndex(item => item.id === itemId);
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));


}

export function countCartQuantity() {
    state.cartQuantity = 0;

    cart.forEach(cartItem => {
        state.cartQuantity += Number(cartItem.quantity);
    });
    localStorage.setItem('state.cartQuantity', JSON.stringify(state.cartQuantity));
    document.querySelector('.centered').innerHTML = state.cartQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));



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
    document.querySelector('.js-total-order-price').innerHTML = totalPrice;

}