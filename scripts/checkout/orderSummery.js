import { cart, removeProduct, updateDeliveryOption } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../util/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getShipping } from "../../data/deliveryOptions.js";
import { renderPaymentSummery } from "./paymentSummery.js";

export function renderOrderSummery() {
  let cartHTML = '';
  
  console.log(cart.length);
  cart.forEach((cartItem) => {

    const productId = cartItem.productId;
    const productMatching = getProduct(productId)

  
    cartHTML += `
           <div class="cart-item-container js-delete-item-${productMatching.id}">
              <div class="delivery-date">
                Delivery date:  ${updatedelivery(cartItem)}
              </div>  
  
              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${productMatching.image}">
  
                <div class="cart-item-details">
                  <div class="product-name">
                    ${productMatching.name}
                  </div>
                  <div class="product-price">
                    $${formatCurrency(productMatching.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary 
                    js-delete-link"  data-product-id = "${productMatching.id}">
                      Delete
                    </span>
                  </div>
                </div>
  
                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionHTML(productMatching, cartItem)}
                </div>
              </div>
             </div> 
      `;
  });

  function updatedelivery(cartItem) {

    const deliveryOptionId = cartItem.deliveryId

    const deliveryOption = getShipping(deliveryOptionId)

    const today = dayjs();
    const deliverydate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliverydate.format('dddd , MMMM D');

    return dateString
  }

  function deliveryOptionHTML(productMatching, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {

      const today = dayjs();
      const deliverydate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliverydate.format('dddd , MMMM D');


      const formatPrice = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`


      const ischecked = deliveryOption.id === cartItem.deliveryId

      html +=
        `<div class="delivery-option js-delivery-option"
             data-product-id ="${productMatching.id}"
             data-delivery-Option-id = "${deliveryOption.id}">
              <input type="radio" ${ischecked ? 'checked' : ''}
              class="delivery-option-input"
              name="delivery-option-${productMatching.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
              ${formatPrice} shipping
              </div>
            </div>
          </div>`
    });

    return html;
  }

  document.querySelector('.js-order-items').innerHTML = cartHTML;


  document.querySelectorAll('.js-delete-link').
    forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeProduct(productId);
        renderOrderSummery()
        renderPaymentSummery()
      })

    })

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const { productId, deliveryOptionId } = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId)
        renderOrderSummery()
        renderPaymentSummery()
      })
    })
}
