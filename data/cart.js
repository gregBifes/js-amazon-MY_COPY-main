import { products } from '../data/products.js';
export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export const state = {
    cartQuantity: JSON.parse(localStorage.getItem('cartQuantity')) || 0
};

//Cała funkcja:

// const deleteBtns = document.querySelectorAll('.js-delete-btns');
// deleteBtns.forEach(deleteButton => {
//     deleteButton.addEventListener('click', () => {
//         console.log('delete btn clicked');
//         const itemId = deleteButton.dataset.productId;
//         const item = cart.find(product => product.id === itemId);

//         cart.filter((cartItem) => cartItem !== item);
//     })

// });
