export let cart = JSON.parse(localStorage.getItem('cart',)) || [];  


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

  
