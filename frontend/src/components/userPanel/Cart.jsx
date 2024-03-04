import React from 'react';
import CombinedContext from '../../contexts/CombinedContext';
import { useContext } from 'react';
import Card from './Card';

export default function Cart() {
    const { mode, ucart, EmptyCart, order, viewData, addToCart } = useContext(CombinedContext);

    let totalitems = ucart.reduce((total, item) => total + item.count, 0);
    let totalprice = ucart.reduce((total, item) => {
        // Extract the numerical part of the item price string and convert it to a number
        const itemPrice = parseFloat(item.fooditem.itemPrice.match(/\d+(\.\d+)?/)[0]);
        // Calculate the total cost of the item (price * quantity)
        const itemTotal = itemPrice * item.count;
        // Add the item total to the running total
        return total + itemTotal;
      }, 0);
          const cartItemCounts = ucart.reduce((counts, item) => {
        counts[item.itemName] = (counts[item.itemName] || 0) + 1;
        return counts;
    }, {});


    return (
        <div className='container foodgrid'>
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
                            {ucart.map((item, i) => (
                                <tr key={i}>
                                    <td className='border px-1'>{i + 1}</td>
                                    <td className='border px-1'>{item.fooditem.itemName}</td>
                                    <td className='border px-1'>{item.fooditem.itemPrice} </td>
                                    <td className='border px-1'>{item.count}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className='border p-2'> total items = {totalitems}</td>
                                <td className='border p-2'> </td>
                                <td className='border p-2'>total-price ={totalprice} RS</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <button onClick={() => order(ucart)} className='btn btn-primary mt-4 '>Order</button>
                <button onClick={EmptyCart} className='btn btn-primary mt-4 '>Empty Cart</button>
            </div>

            {ucart.map((item, i) => (
            <Card key={i} mode={mode} food={item.fooditem} viewData={viewData} addToCart={addToCart} cartItemCount={cartItemCounts[item.itemName] || 0}
            />

            ))}
        </div>
    );
}
