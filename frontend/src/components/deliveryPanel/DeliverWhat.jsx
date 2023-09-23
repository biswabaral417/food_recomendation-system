import React, { useEffect, useState } from 'react'
import DvgOrderCard from './DvgOrderCard'

export default function DeliverWhat() {
    const [DeliverOrders,setDeliverOrders]=useState([])
    const deliveredAndpaid=async (corder)=>{
            const res=await fetch('/api/dvg/delivered',{
                method:'POST',
                credentials:'include',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(corder)
            })
            const data =await res.json()
            if(res.status!==200){
                window.alert(data.error)
            }else{
                window.alert(data.success)
            }
    }
    useEffect(() => {
        const getdvgOrders=async ()=>{
            const res=await fetch('/api/deliveryguy/getorders',{
                method:'GET',
                credentials: 'include'
            })
            const data=await res.json();
            if (res.status!==200) {
                window.alert(data.error)
                
            } else {
                setDeliverOrders(data);
            }
        }
    
      getdvgOrders();
    }, [])
    
  return (
    <div>
        {DeliverOrders.map((item) => (
          <DvgOrderCard key={item._id} order={item.Order} buttons={[{ func:deliveredAndpaid, btntxt: "delivered and paid" }]} />
        ))}
    </div>
  )
}
