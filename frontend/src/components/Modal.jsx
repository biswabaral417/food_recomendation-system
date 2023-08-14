import React from 'react'
import { useContext } from 'react'
import SharedPropsContext from '../contexts/SharedPropsContext'

export default function Modal() {
    const { itemToView,closeModal,ucart,mode,reduceItem,addToCart } = useContext(SharedPropsContext)
    const foodQuantityInCart = ucart.filter(item => item.itemName === itemToView.itemName).length;
    return (
        <>
        <div className='Modal-wrapper' onClick={()=>closeModal()}></div>
        <div  className='Modal-container rounded'>
        <div className={`bg-${mode} rounded`}>
            {foodQuantityInCart > 0 && (
                <span className="cart-indicator rounded-pill bg-primary text-white m-3">
                    <bold className='mx-2'>
                        {foodQuantityInCart}
                    </bold>
                    <button onClick={() => reduceItem(itemToView)} className='reduceNo text-white rounded-circle bg-primary'>-</button>
                </span>
            )}
            {/* Rest of your card content */}
            <img className='modal-img rounded-top' src={itemToView.itemImgLoc} alt="" />
            <div className={`bg-${mode} rounded-bottom border`} >
                <h6 className='my-1 text-center'>{itemToView.itemName}</h6>
                <h6 className='f-i-price text-center' >{itemToView.itemPrice} RS</h6>

                <button onClick={() => addToCart(itemToView)} className='btn btn-primary my-1'>
                    add to cart
                </button>
            </div>
        </div>

            <button className='modal-katta m-2 rounded-circle bg-primary text-white' onClick={()=>closeModal()}>x</button>
        </div>
        </>
    )
}
