import React, { useContext } from 'react'
import CombinedContext from '../../contexts/CombinedContext'

export default function OrderCard({ buttons, order }) {
    console.log(order)
    const { mode } = useContext(CombinedContext)
    return (
        <div className={`border d-flex  justify-content-between p-2 bg-${mode}`}>
            <div className='d-flex'>
                <table>
                    <thead>
                        <td className='border px-2'> <p>ordered by :" {order.user.userName} " </p></td>
                        <td className='border px-2'> <p>Email :" {order.user.userEmail} " </p></td >
                        <td className='border px-2'><p>phone :" {order.user.userPhone} " </p></td>
                    </thead>
                </table>
            </div>
            <div className='d-flex flex-wrap align-items-center'>
                {
                    buttons.map((element, index) => (
                        <button key={index} className='btn btn-primary my-1' onClick={element.func}>{element.btntxt}</button>
                    ))
                }
            </div>


        </div>


    )
}
