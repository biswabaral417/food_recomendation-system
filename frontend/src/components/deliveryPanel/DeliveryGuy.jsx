import React, { useState } from 'react'
import { useEffect } from 'react';
// import OrderCard from '../adminPanel/OrderCard';
// import CombinedContext from '../../contexts/CombinedContext';
import DvgOrderCard from './DvgOrderCard';


export default function DeliveryGuy() {
  const [ApprovedOrders, setApprovedOrder] = useState([])
  useEffect(() => {
    const getorders = async () => {
      try {
        const res = await fetch('/api/dvg/getOrders', {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include"
        });

        const data = await res.json();
        if (!(res.status === 200)) {
          const error = new Error(res.error)
          throw error;
        } else {
          if (data) {
            setApprovedOrder(data)

          }
        }

      } catch (error) {
        console.log(error)
      }
    }

    getorders();
  }, []);


  const OrderRights = async (item) => {
    try {
      const res = await fetch('/api/dvg/takeOrderRights', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(item)
      });

      if (res) {
        console.log(item)
      }
      const data = await res.json()
      if (res.status !== 200) {
        window.alert(data.error)
      } else {
        window.alert(data.success)
      }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <>
      <div className='asd'>
        {ApprovedOrders.map((order) => (
          <DvgOrderCard key={order._id} order={order} buttons={[{ func: OrderRights, btntxt: "take order" }]} />
        ))}
      </div>
    </>
  )
}
