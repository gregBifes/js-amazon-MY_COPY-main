import { products } from '../data/products.js';
import { cart, countCartQuantity, state } from '../data/cart.js';

state.cartQuantity = JSON.parse(localStorage.getItem('state.cartQuantity'));
document.querySelector('.centered').innerHTML = state.cartQuantity;

let listHTML = '';

products.forEach(product => {

    listHTML += `
    <div class="product">
        <div class="product-image-container"><img src="${product.image}"></div>
        <div class="product-name">${product.name}</div>
        <div class="product-rating">
            <div class="product-rating-stars"><img src="images/ratings/rating-${product.rating.stars * 10}.png"></div>
            <div class="product-rating-count">${product.rating.count}</div>
        </div>
        <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div >
        <div class="product-quantity-${product.id} product-quantity-container">
            <select class="js-quantity-selector-${product.id} quantity-selector">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
            </select>
            <p class="js-display-add-${product.id} hidden"font-weight:bold; font-size:1rem; color: green;"><i class="fa-solid fa-circle-check"></i>Added</p>
        </div>
        <button class="js-add-to-cart-button add-to-cart-button"
            data-product-id="${product.id}">
            Add to Cart
        </button>
    </div >
    `
})
document.querySelector('.product-container').innerHTML = listHTML;
const addToCartBtns = document.querySelectorAll('.js-add-to-cart-button');

addToCartBtns.forEach(button => {
    let addedMessageTimeoutId;

    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        const product = products.find(product => product.id === productId);
        const quantity = document.querySelector(`.js-quantity-selector-${productId}`).value;
        console.log(quantity);
        if (product) {
            const existingItem = cart.find(product => product.id === productId);
            if (existingItem) {
                existingItem.quantity = String(Number(existingItem.quantity) + Number(quantity));

            } else {
                cart.push({
                    id: product.id,
                    quantity: quantity,
                    deliveryOptionId: 0
                })
            }
            countCartQuantity();
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        const displayText = document.querySelector(`.js-display-add-${productId}`);

        displayText.classList.add('visible');

        if (addedMessageTimeoutId) {
            clearTimeout(addedMessageTimeoutId);
        }

        const timeOutId = setTimeout(() => {
            displayText.classList.remove('visible');
        }, 1500)

        addedMessageTimeoutId = timeOutId;
    })
});


// const div = document.createElement('div');
// div.innerHTML = `<p style="font-weight:bold; font-size:1rem; color: green;"><i class="fa-solid fa-circle-check"></i>Added</p>`;


