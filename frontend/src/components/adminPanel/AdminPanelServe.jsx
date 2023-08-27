import React, { useState } from 'react'
import { useEffect } from 'react';
import OrderCard from './OrderCard';

export default function AdminPanelServe() {
  const [pendingOrders, setPendingOrder] = useState([])
  useEffect(() => {
    const getorders = async () => {
      try {
        const res = await fetch('/api/admins/getPendingorders', {
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
            setPendingOrder(data)
            
          }
        }

      } catch (error) {
        console.log(error)
      }
    }

    getorders();
  }, []);

  const approve = (item) => {

  }
  const decline = (item) => {

  }



  return (
    <>
      <div className='asd'>
        {pendingOrders.map((order,index) => (
          <OrderCard key={index} order={order} buttons={[{func:approve,btntxt:"approve order"}, {func:decline,btntxt:"decline order"}]} />
        ))}
      </div>
    </>
  )
}
