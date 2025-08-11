import { products } from '../data/products.js';
import { cart, state } from '../data/cart.js';

state.cartQuantity = JSON.parse(localStorage.getItem('state.cartQuantity'));

document.querySelector('.centered').innerHTML = state.cartQuantity;

function renderCheckoutDisplay() {
    let checkoutHtml = '';

    cart.forEach(product => {
        checkoutHtml += `
        <div class="product-container">
            <div class="product-image-container"><img src="${product.image}"></div>
            <div class="product-description">
                <div class="product-name">${product.name}</div>
                <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div >
                <div class="product-quantity">Quantity: ${product.quantity} <a href="">Update</a>
                 <a class="js-delete-btns" data-product-id="${product.id}">Delete</a></div>
            </div>
            <div class="delivery-container">
                <p class="title">Choose a delivery option:</p>
                <div>
                    <div>
                        <p class="delivery-date">Tuesday, August 19</p>
                        <p class="delivery-price">FREE Shipping <input name="delivery-date-check" type="radio"/></p>
                        
                    </div>
                    <div>
                        <p class="delivery-date">Wednesday, August 13</p>
                        <p class="delivery-price">$4.99 - Shipping <input name="delivery-date-check" type="radio"/></p>
                    </div>
                    <div>
                        <p class="delivery-date">Monday, August 11</p>
                        <p class="delivery-price">$9.99 - Shipping <input name="delivery-date-check" type="radio"/></p>
                    </div>
                </div>
            </div>
        </div >
        `
    });
    document.querySelector('.checkout-display').innerHTML = checkoutHtml;

    const deleteBtns = document.querySelectorAll('.js-delete-btns');
    deleteBtns.forEach(deleteButton => {
        deleteButton.addEventListener('click', () => {
            const itemId = deleteButton.dataset.productId;
            const index = cart.findIndex(item => item.id === itemId);
            cart.splice(index, 1);
            renderCheckoutDisplay();

        })
    });
    state.cartQuantity = 0;

    cart.forEach(element => {
        state.cartQuantity += Number(element.quantity);
    });
    localStorage.setItem('state.cartQuantity', JSON.stringify(state.cartQuantity));
    localStorage.setItem('cart', JSON.stringify(cart));
    document.querySelector('.centered').innerHTML = state.cartQuantity;



}
renderCheckoutDisplay();


