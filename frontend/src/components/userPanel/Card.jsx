import CombinedContext from "../../contexts/CombinedContext";
import { useContext } from "react";

export default function Card({ food, mode, viewData, addToCart }) {
    const { ucart, reduceItem } = useContext(CombinedContext);

    const foodQuantityInCart = ucart.reduce((total, item) => (item.fooditem.itemName === food.itemName ? total + item.count : total), 0);

    return (
        <div className={`${mode === "light" ? "g-Item" : ""} mc-height rounded mx-2 my-3`}>
            {foodQuantityInCart > 0 && (
                <span className="cart-indicator rounded-pill bg-primary text-white m-3">
                    <b className='mx-2'>
                        {foodQuantityInCart}
                    </b>
                    <button onClick={() => reduceItem(food)} className='reduceNo text-white rounded-circle bg-primary'>-</button>
                </span>
            )}
            <img className='f-i-img rounded-top' src={food.itemImgLoc} alt="" />
            <div className={`bg-${mode} rounded-bottom border`} >
                <h6 className='text-center my-1'>{food.itemName}</h6>
                <h6 className='f-i-price text-center my-1'>{food.itemPrice}</h6>
                <button className='btn btn-primary' onClick={() => viewData(food)}>view item</button>
                <button onClick={() => addToCart(food)} className='btn btn-primary my-1'>
                    add to cart
                </button>
            </div>
        </div>
    );
}
