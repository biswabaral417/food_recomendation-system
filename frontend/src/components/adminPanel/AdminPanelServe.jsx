import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import OrderCard from './OrderCard';
import CombinedContext from '../../contexts/CombinedContext';


export default function AdminPanelServe() {
  const [pendingOrders, setPendingOrder] = useState([])
  const { searchStr } = useContext(CombinedContext)
  useEffect(() => {
    const getorders = async () => {
      try {
        const res = await fetch('/api/admins/getOrders', {
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



  //search

  const [filteredOrders, setFilteredOrders] = useState(pendingOrders)
  useEffect(() => {
    const searchFilter = (searchStr) => {
      const lowerCasedSearch = searchStr.toLowerCase();
      const filtered = pendingOrders.filter(order =>
        deepSearch(order, lowerCasedSearch)
      );
      setFilteredOrders(filtered);
    };

    const deepSearch = (object, searchTerm) => {
      for (const value of Object.values(object)) {
        if (typeof value === 'string' && value.toLowerCase().includes(searchTerm)) {
          return true;
        } else if (Array.isArray(value)) {
          for (const item of value) {
            if (deepSearch(item, searchTerm)) {
              return true;
            }
          }
        } else if (typeof value === 'object' && value !== null) {
          if (deepSearch(value, searchTerm)) {
            return true;
          }
        }
      }
      return false;
    };

    if (pendingOrders.length > 0) {
      searchFilter(searchStr);
    }
  }, [searchStr, pendingOrders]);







  const approve = async (item) => {
    try {
      const res = await fetch('/api/admins/ApproveOrders', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
        body:JSON.stringify(item)
      });

      if (res) {
        console.log(item)
      }

    } catch (error) {
      console.log(error)
    }

  }
  const decline = (item) => {

  }

  return (
    <>
      <div className='asd'>
        {filteredOrders.map((order, index) => (
          <OrderCard key={index} order={order} buttons={[{ func: approve, btntxt: "approve order" }, { func: decline, btntxt: "decline order" }]} />
        ))}
      </div>
    </>
  )
}
