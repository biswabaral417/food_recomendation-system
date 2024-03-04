import { useState } from 'react'

export default function useCarts(openLoginModal,userlogInfo) {



  const [ucart, setUcart] = useState([]);

  const addToCart = (item) => {
    const existingItemIndex = ucart.findIndex((cartItem) => cartItem.fooditem === item);

    if (existingItemIndex !== -1) {
      const updatedCart = [...ucart];
      updatedCart[existingItemIndex].count++;
      setUcart(updatedCart);
    } else {
      setUcart([...ucart, { fooditem: item, count: 1 }]);
    }
  };

  const EmptyCart = () => {
    setUcart([]);
  };

  const reduceItem = (item) => {
    const itemIndex = ucart.findIndex((cartItem) => cartItem.fooditem === item);

    if (itemIndex !== -1) {
      const updatedCart = [...ucart];
      if (updatedCart[itemIndex].count === 1) {
        updatedCart.splice(itemIndex, 1);
      } else {
        updatedCart[itemIndex].count--;
      }
      setUcart(updatedCart);
    }
  };


  //order 

  const order = async (cart) => {
    if (userlogInfo) {
      if (cart.length !== 0) {

        const res = await fetch("/api/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: 'include',
          body: JSON.stringify(cart)
        });

        const data = await res.json();
        if (res.status === 422 || !data) {
          window.alert(data.error);
          console.log(data.error);
        }
        else if (res.status === 400) {
          window.alert(data);
          console.log(data);
        }
        else if (res.status === 200) {
          window.alert(data);
          console.log(data);
          
          esewaCall(data.formData)
        }
        else if (res.status === 500) {
          window.alert(data.error);
          console.log(data.error);
        }
        else {
          window.alert("connection error")
        }

      }
      else {
        window.alert("no items available to order")
      }
    }
    else {
      openLoginModal();
    }
  }
  const esewaCall = (formData) => {
    console.log(formData)
    if(document.getElementById("jkajgl")){
      return window.alert("eerrroeeeeeeeer")
    }
    const form = document.createElement("form");
    form.id="jkajgl"
    let path= "https://rc-epay.esewa.com.np/api/epay/main/v2/form"
    form.setAttribute("method", "POST");
    form.setAttribute("action",path);
    
    // Create hidden input fields for each key-value pair in formData
    for (let key in formData) {
        const hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", formData[key]);
        form.appendChild(hiddenField);
    }
    // Append the form to the body and submit it
    document.body.appendChild(form);
    form.submit();
};

  return {
    addToCart, reduceItem, EmptyCart, ucart, order
  }
}
