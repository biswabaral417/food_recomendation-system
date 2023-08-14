
import SharedPropsContext from "../contexts/SharedPropsContext";
import { useContext } from "react";

export default function Card({ food, mode, viewData, addToCart}) {
    const { ucart, reduceItem } = useContext(SharedPropsContext);

    // Calculate the quantity of this food item in the cart
    const foodQuantityInCart = ucart.filter(item => item.itemName === food.itemName).length;

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
            {/* Rest of your card content */}
            <img className='f-i-img rounded-top' src={food.itemImgLoc} alt="" />
            <div className={`bg-${mode} rounded-bottom border`} >
                <h6 className='text-center my-1'>{food.itemName}</h6>
                <h6 className='f-i-price text-center my-1'>{food.itemPrice} RS</h6>

                <button className='btn btn-primary' onClick={() => viewData(food)}>view item</button>
                <button onClick={() => addToCart(food)} className='btn btn-primary my-1'>
                    add to cart
                </button>
            </div>
        </div>
    );
}
