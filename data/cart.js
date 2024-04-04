export let cart = JSON.parse(localStorage.getItem('cart',)) || [
  {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 1,
    deliveryId: '1'
  },{
    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryId:'2',
  }
];  


function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart))
}


 //function to push the product into the cart when "addtocart" button clicked.

export function addtocart(productId){                  
    let matchingItem;
  
    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });
  
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      cart.push({
        productId: productId,
        quantity: 1, 
        deliveryId: '1'
      });
    }
    saveToStorage();
  }

 //function for removing the product when delete button clicked.

  export function removeProduct(productId){                  
    const newCart = [];

    cart.forEach((cartItem)  =>{
       if(cartItem.productId != productId){
         newCart.push(cartItem)
       }
    })

    cart = newCart;

    saveToStorage();
}


export function updateDeliveryOption(productId,deliveryOptionId){

  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  })

  console.log(matchingItem);

  matchingItem.deliveryId = deliveryOptionId ;

  saveToStorage();
}