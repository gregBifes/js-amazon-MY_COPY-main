import { products } from '../data/products.js';
import { cart, state } from '../data/cart.js';

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
        <div class="product-quantity">
            <select class="js-quantity-selector-${product.id}">
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
                    image: product.image,
                    name: product.name,
                    rating: {
                        stars: product.rating.stars,
                        count: product.rating.count
                    },
                    priceCents: product.priceCents,
                    quantity: quantity

                })
            }
            console.log(state.cartQuantity);
            state.cartQuantity = 0;
            cart.forEach(element => {
                state.cartQuantity += Number(element.quantity);
            });

            localStorage.setItem('cart', JSON.stringify(cart));

            localStorage.setItem('state.cartQuantity', JSON.stringify(state.cartQuantity));
            document.querySelector('.centered').innerHTML = state.cartQuantity;
        }
    })
});


