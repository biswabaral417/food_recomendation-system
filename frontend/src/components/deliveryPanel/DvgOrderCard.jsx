import React, { useContext, useEffect, useState } from 'react'
import CombinedContext from '../../contexts/CombinedContext'

export default function DvgOrderCard({ buttons, order }) {
    const [totalCost, setTotalCost] = useState(0);
    useEffect(() => {
        // Calculate the total cost when order.items and item.food are available
        if (order.items) {
            const calculatedCost = order.items.reduce((acc, item) => {
                if (item.food && item.food.itemPrice) {
                    return acc + item.count * item.food.itemPrice;
                }
                return acc;
            }, 0);
            setTotalCost(calculatedCost);
        }
    }, [order.items]);

    const { mode } = useContext(CombinedContext);
    return (
        <div className={`border d-flex  justify-content-between p-2 bg-${mode}`}>
            <div className='d-flex'>
                <div>
                    <div className='d-flex flex-wrap mb-1'>
                        <span className='border px-2' style={{ width: "200px" }}> <p>ordered by:</p><h5>{order.user.userName}</h5></span>
                        <span className='border px-2' style={{ width: "240px" }}> <p>Email :</p><h6>{order.user.userEmail}</h6></span >
                        <span className='border px-2' style={{ width: "130px" }}><p>phone :</p><h5>{order.user.userPhone}</h5></span>
                        <div className='border px-2'>
                            <span ><p>ordered at :</p><h6>{order.OrderedTime}</h6></span>
                            <span ><p>Location :</p><h4>{order.user.userLocation} </h4></span>
                        </div>


                    </div>
                    <table>
                        <thead>
                            <tr>
                                <td className='border p-1'> <p>S/N </p></td>
                                <td className='border p-1'> <p>Items</p></td >
                                <td className='border p-1'><p>Rate</p></td>
                                <td className='border p-1'><p>Count</p></td>
                                <td className='border p-1'><p>total</p></td>
                            </tr>
                        </thead>
                        <tbody>

                            {order.items.map((item, i) => {
                                // console.log(item)
                                if (item.food !== null) {

                                    return (
                                        <tr key={item._id}>
                                            <td className='border px-1'>{i + 1}</td>
                                            <td className='border px-1'>{item.food.itemName}</td>
                                            <td className='border px-1'>{item.food.itemPrice} RS</td>
                                            <td className='border px-1'>{item.count}</td>
                                            <td className='border px-1'>{item.count * item.food.itemPrice} RS</td>
                                        </tr>

                                    )
                                }
                                else {
                                    return (
                                        <tr key={i}>
                                            <td>
                                                loading...
                                            </td>
                                        </tr>
                                    )
                                }
                            }
                            )}

                        </tbody>
                    </table>
                </div>
            </div>
            <div className='my-auto'>
                <h4>Total Cost : {totalCost} RS</h4>
                {
                    (
                        buttons.map((element, index) => (
                            <button key={index} className='btn btn-primary my-1' onClick={() => element.func(order)}>{element.btntxt}</button>
                        ))

                    ) 
                }
            </div>


        </div>


    )
}
