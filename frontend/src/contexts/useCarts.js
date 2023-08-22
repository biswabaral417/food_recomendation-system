import { useState } from 'react'

export default function useCarts() {


  //carts
  const [ucart, setUcart] = useState([]);

  const addToCart = (item) => {
    setUcart([...ucart, item]);
  };

  const cancelCart = () => {
    setUcart([]);
  };

  const reduceItem = (item) => {
    const itemIndex = ucart.findIndex((cartItem) => cartItem === item);

    if (itemIndex !== -1) {
      const updatedCart = [...ucart];
      updatedCart.splice(itemIndex, 1);
      setUcart(updatedCart);
    }
  };

  return {
    addToCart,reduceItem,cancelCart,ucart
  }
}
