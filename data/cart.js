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
    const updateLinkElement = document.querySelector(`.js-update-btns-${itemId}`);
    const deleteLinkElement = document.querySelector(`.js-delete-btns-${itemId}`);

    inputQuantityElement.style.visibility = 'visible';
    // inputQuantityElement.style.postion = 'absolut';
    inputQuantityElement.style.display = 'inline';
    updateLinkElement.style.visibility = 'hidden';
    deleteLinkElement.style.visibility = 'hidden';




    //Nadać nową wartość z texta inputa którego wyświetlić w miejscu updateLink

    inputQuantityElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            cartItem.quantity = Number(inputQuantityElement.value);
            document.dispatchEvent(new CustomEvent('cart-updated'));
        }
    });
}


export function deleteFromCart(deleteLink) {
    const itemId = deleteLink.dataset.productId;
    const index = cart.findIndex(item => item.id === itemId);
    cart.splice(index, 1);
}

export function countCartQuantity() {
    state.cartQuantity = 0;

    cart.forEach(cartItem => {
        state.cartQuantity += Number(cartItem.quantity);
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
    document.querySelector('.js-total-order-price').innerHTML = totalPrice;

}