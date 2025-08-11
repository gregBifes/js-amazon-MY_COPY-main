import { products } from '../data/products.js';
import { cart, state } from '../data/cart.js';
document.querySelector('.centered').innerHTML = state.cartQuantity;

let checkoutHtml = '';

function renderCheckoutDisplay() {
    cart.forEach(product => {
        checkoutHtml += `
        <div class="product-container">
            <div class="product-image-container"><img src="${product.image}"></div>
            <div class="product-description">
                <div class="product-name">${product.name}</div>
                <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div >
                <div class="product-quantity">Quantity: ${product.quantity} <a href="">Update</a> <a href="">Delete</a></div>
            </div>
            <div class="delivery-container">
                <p class="title">Choose a delivery option:</p>
                <div>
                    <div>
                        <p class="delivery-date">Tuesday, August 19</p>
                        <p class="delivery-price">FREE Shipping</p>
                    </div>
                    <div>
                        <p class="delivery-date">Wednesday, August 13</p>
                        <p class="delivery-price">$4.99 - Shipping</p>
                    </div>
                    <div>
                        <p class="delivery-date">Monday, August 11</p>
                        <p class="delivery-price">$9.99 - Shipping</p>
                    </div>
                </div>
            </div>
        </div >
        `
    });
    document.querySelector('.checkout-display').innerHTML = checkoutHtml;


}
renderCheckoutDisplay();


