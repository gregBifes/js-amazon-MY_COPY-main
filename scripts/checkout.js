import { products } from '../data/products.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
import { cart, state, updateCart, deleteFromCart, countCartQuantity, calculateCartPrice } from '../data/cart.js';
import dayjs from "https://unpkg.com/dayjs@latest/esm/index.js";


state.cartQuantity = JSON.parse(localStorage.getItem('state.cartQuantity'));


document.addEventListener('cart-updated', () => {
    countCartQuantity();
    calculateCartPrice();
    renderCheckoutDisplay();
});
document.querySelector('.centered').innerHTML = state.cartQuantity;

export function renderCheckoutDisplay() {
    let checkoutHtml = '';

    cart.forEach(product => {
        const productId = product.id;
        const index = products.findIndex(item => item.id === productId);
        const indexCart = cart.findIndex(item => item.id === productId);
        let matchingProduct = cart[indexCart];
        const today = dayjs();
        checkoutHtml += `
        <div class="product-container">
            <div class="product-image-container">
                <p class="chosen-delivery-date-${product.id}">${today.add(deliveryOptions[0].deliveryTime, 'day').format('dddd DD MMMM')}</p>
                <img src="${products[index].image}">
                </div>
            <div class="product-description">
                <div class="product-name">${products[index].name}</div>
                <div class="product-price">$${(products[index].priceCents / 100).toFixed(2)}</div >
                <div class="product-quantity js-product-quantity-${product.id}">
                    Quantity: <span>${product.quantity}</span>
                    <a class="js-update-btns js-update-btns-${product.id}" data-product-id="${product.id}">Update</a>
                    <a class="js-delete-btns js-delete-btns-${product.id}" data-product-id="${product.id}">Delete</a></div>
                    <input class="js-input js-input-${product.id} hidden" style="inline-block; width: 55px;" placeholder="Quantity" type="text">
            </div>
            <div class="delivery-container">
                <p class="title">Choose a delivery option:</p>
                ${deliveryOptionsHTML(matchingProduct)}
            </div>
        </div >
        `
    });
    document.querySelector('.checkout-display').innerHTML = checkoutHtml;

    const deleteBtns = document.querySelectorAll('.js-delete-btns');
    deleteBtns.forEach(deleteLink => {
        deleteLink.addEventListener('click', () => {
            console.log('delete btn');
            deleteFromCart(deleteLink);
            countCartQuantity();
            renderCheckoutDisplay();
            calculateCartPrice();
        })
    });

    const updateBtns = document.querySelectorAll('.js-update-btns');
    updateBtns.forEach(updateLink => {
        updateLink.addEventListener('click', () => {
            updateCart(updateLink);
            countCartQuantity();
            calculateCartPrice();
        })
    });

    const radioInputs = document.querySelectorAll('.radio-input');
    radioInputs.forEach(radioElement => {
        radioElement.addEventListener('click', () => {
            const productId = radioElement.dataset.productId;
            const productIdLength = String(productId).length;
            const productIdsliced = String(productId).slice(0, productIdLength - 2);
            const chosenDate = document.querySelector(`.delivery-date-${productId}`);
            const displayedDate = document.querySelector(`.chosen-delivery-date-${productIdsliced}`);
            displayedDate.innerHTML = chosenDate.textContent;
            const index = cart.findIndex(item => item.id === productIdsliced);

            cart[index].deliveryOptionId = productId[productIdLength - 1];
            console.log('po zmianie dostawy:', cart[index]);
            localStorage.setItem('cart', JSON.stringify(cart));


        })
    });


    function deliveryOptionsHTML(matchingProduct) {
        let html = '';
        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryTime, 'days');
            const dateString = deliveryDate.format('dddd, MMMM, D');
            const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${(deliveryOption.priceCents / 100).toFixed(2)}`;
            if (deliveryOption.id === matchingProduct.deliveryOptionId) {
                html += `
                <div>
                    <p id="id-${deliveryOption.id}" class="delivery-date-${matchingProduct.id}-${deliveryOption.id}">${dateString}</p>
                    <p class="delivery-price">${priceString} - Shipping <input <input class="radio-input" data-product-id="${matchingProduct.id}-${deliveryOption.id}" name="delivery-date-check-${matchingProduct.id}"checked type="radio"/></p>
                </div>    
                `
            }
            else {
                html += `
                <div>
                    <p id="id-${deliveryOption.id}" class="delivery-date-${matchingProduct.id}-${deliveryOption.id}">${dateString}</p>
                    <p class="delivery-price">${priceString} - Shipping <input <input class="radio-input" data-product-id="${matchingProduct.id}-${deliveryOption.id}" name="delivery-date-check-${matchingProduct.id}" type="radio"/></p>
                </div>    
                `
            }

        }
        )
        return html;
    }
}
countCartQuantity();
renderCheckoutDisplay();
calculateCartPrice();



