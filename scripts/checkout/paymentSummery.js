import { cart } from "../../data/cart.js";
import { getShipping } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../util/money.js";
// import { renderOrderSummery } from "./orderSummery.js";

export function renderPaymentSummery(){
   
 let productPricecents = 0;
 let shippingPricecents = 0;
 let AllcartItem = 0;
    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId)
        productPricecents += product.priceCents*cartItem.quantity;
        const deliveryOption = getShipping(cartItem.deliveryId)
        shippingPricecents += deliveryOption.priceCents;
        AllcartItem += cartItem.quantity
    });
   
    const totalBeforeTax = productPricecents + shippingPricecents;
    const taxCents = totalBeforeTax * 0.1;

    const total  = totalBeforeTax + taxCents;
    
    const paymentSummeryList =`
                <div class="payment-summary-title">
                    Order Summary
                </div>

                <div class="payment-summary-row">
                    <div>Items (${AllcartItem}):</div>
                    <div class="payment-summary-money">$${formatCurrency(productPricecents)}</div>
                </div>

                <div class="payment-summary-row">
                    <div>Shipping &amp; handling:</div>
                    <div class="payment-summary-money">$${formatCurrency(shippingPricecents)}</div>
                </div>

                <div class="payment-summary-row subtotal-row">
                    <div>Total before tax:</div>
                    <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
                </div>

                <div class="payment-summary-row">
                    <div>Estimated tax (10%):</div>
                    <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
                </div>

                <div class="payment-summary-row total-row">
                    <div>Order total:</div>
                    <div class="payment-summary-money">$${formatCurrency(total)}</div>
                </div>

                <button class="place-order-button button-primary">
                    Place your order
                </button>
    `

    document.querySelector('.js-payment-summery').innerHTML = paymentSummeryList

    // renderOrderSummery()
}   



