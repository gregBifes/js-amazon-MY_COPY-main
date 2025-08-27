import { deliveryOptions, products } from '../data/products.js';
import { cart, state, updateCart, deleteFromCart, countCartQuantity, calculateCartPrice } from '../data/cart.js';

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
        const today = dayjs();

        checkoutHtml += `
        <div class="product-container">
            <div class="product-image-container">
                <p class="chosen-delivery-date-${product.id}"></p>
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
                <div>
                    <div>
                        <p id="0" class="delivery-date-${product.id}">${today.add(deliveryOptions[0].deliveryTime, 'day').format('dddd DD MMMM')}</p>
                        <p class="delivery-price">FREE - Shipping <input <input class="radio-input" data-product-id="${0}" name="delivery-date-check-${products[index].name}" type="radio"/></p>
                        
                    </div>
                    <div>
                        <p id="1" class="delivery-date-${product.id}">${today.add(deliveryOptions[1].deliveryTime, 'day').format('dddd DD MMMM')}</p>
                        <p class="delivery-price">$4.99 - Shipping <input class="radio-input" data-product-id="${1}" name="delivery-date-check-${products[index].name}" type="radio"/></p>
                    </div>
                    <div>
                        <p id="2" class="delivery-date-${product.id}">${today.add(deliveryOptions[2].deliveryTime, 'day').format('dddd DD MMMM')}</p>
                        <p class="delivery-price">$9.99 - Shipping <input class="radio-input" data-product-id="${2}" name="delivery-date-check-${products[index].name}" type="radio"/></p>
                    </div>
                </div>
            </div>
        </div >
        `
    });
    document.querySelector('.checkout-display').innerHTML = checkoutHtml;

    const deleteBtns = document.querySelectorAll('.js-delete-btns');
    deleteBtns.forEach(deleteLink => {
        deleteLink.addEventListener('click', () => {
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
        radioElement.addEventListener('change', () => {
            const productId = radioElement.dataset.productId;
            const chosenDate = document.querySelector(`.chosen-delivery-date-${productId}`);
            const chosedOption = document.querySelector(`#${productId}`);
            console.log(productId);
            chosenDate.textContent = chosedOption.textContent;

        })
    });

    localStorage.setItem('cart', JSON.stringify(cart));
}
countCartQuantity();
renderCheckoutDisplay();
calculateCartPrice();




