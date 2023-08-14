import React from 'react';
import SharedPropsContext from '../contexts/SharedPropsContext';
import { useContext } from 'react';
import Card from './Card';

export default function Cart() {
    const { addToCart, mode, ucart, cancelCart, viewData, Modal, itemToView } = useContext(SharedPropsContext)
    let totalitems = 0;
    let totalprice = 0;

    ucart.forEach((item, i) => {
        totalprice += Number(item.itemPrice);
        totalitems = i + 1;
    });

    let uniqueItemCount = 0;
    totalitems = ucart.length;

    return (
        <div className='container foodgrid'>
            {
                itemToView !== "" &&
                <Modal />
            }
            <div className={`cartMainsec rounded mx-2 my-3 bg-${mode}`}>
                <h2 className='text-center border ycText my-3'>cart</h2>
                <div className="citems">
                    <table className='border'>
                        <thead>
                            <tr className='border'>
                                <th className='p-1'>S/N</th>
                                <th className='p-1'>Item Name</th>
                                <th className='p-1'>Item Price</th>
                                <th className='p-1'>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ucart.map((item, i, arr) => {
                                const itemCount = arr.filter((cartItem) => cartItem.itemName === item.itemName).length;

                                if (arr.findIndex((cartItem) => cartItem.itemName === item.itemName) === i) {
                                    uniqueItemCount++; // Calculate unique item count based on index
                                    return (
                                        <tr key={i}>
                                            <td className='border px-1'>{uniqueItemCount}</td>
                                            <td className='border px-1'>{item.itemName}</td>
                                            <td className='border px-1'>{item.itemPrice} RS</td>
                                            <td className='border px-1'>{itemCount}</td>
                                        </tr>
                                    );
                                } else {
                                    return null; // Skip rendering duplicates
                                }
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className='border p-2'> total items = {totalitems}</td>
                                <td className='border p-2'> </td>
                                <td className='border p-2'>total-price ={totalprice} RS
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <button className='btn btn-primary mt-4 '>Order</button>
                <button onClick={cancelCart} className='btn btn-primary mt-4 '>Cancel Order</button>
            </div>

            {ucart.map((item, i) => {
                if (ucart.findIndex((cartItem) => cartItem.itemName === item.itemName) === i) {
                    return (
                        <Card key={i} mode={mode} food={item} viewData={viewData} addToCart={addToCart} />
                    );
                } else {
                    return null; // Skip rendering duplicates
                }
            })}
        </div>
    );
}
