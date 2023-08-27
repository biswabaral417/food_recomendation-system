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
        else if (res.status === 200) {
          window.alert(data.success);
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
  return {
    addToCart, reduceItem, EmptyCart, ucart, order
  }
}
