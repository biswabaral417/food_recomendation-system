import React, { useEffect, useState } from 'react'
// import Data from "./Data.json"


function Order() {

  const [Data, setData] = useState([])
  useEffect(() => {
    const getorders = async () => {
      try {
        const res = await fetch('./api/user/getorders', {
          method: 'GET',
          credentials: 'include'
        })
        if (res.status !== 200) {
          setData([])
        }
        else {

          const data = await res.json();

          setData(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getorders()
    return () => {

    }
  }, [])

  return (
    <>
      <section className='p-2'>
        {

          Data.map((a) => {
            let totalitems = 0;
            let totalPrice = 0;
            return (

              <div className='citems m-2 p-2 d-flex border' key={a._id}>

                <table className='border'>
                  <thead>
                    <tr className='border'>
                      <th className='border p-1' style={{ "maxWidth": "50px" }}>S/N</th>
                      <th className='border p-1'>Item Name</th>
                      <th className='border p-1'>Item Price</th>
                      <th className='border p-1' style={{ "maxWidth": "60px" }}>Count</th>
                    </tr>
                  </thead>
                  <tbody>

                    {a.items.map((item, i) => {

                      totalitems+=item.count
                      totalPrice+=item.count*(item.food!==null?item.food.itemPrice:0)
                      if (item.food !== null) {
                        return (
                          <tr key={item._id}>
                            <td className='border px-1' style={{ "width": "30px" }}>{i + 1}</td>
                            <td className='border px-1 '>{item.food.itemName}</td>
                            <td className='border px-1'>{item.food.itemPrice}RS</td>
                            <td className='border px-1' style={{ "maxWidth": "60px" }}>{item.count}</td>
                          </tr>
                        )
                      }
                      else {
                        return (<tr key={item._id}><td>{i + 1}</td><td>item Unavailable</td><td>price unavailable</td><td className='border'>{item.count}</td></tr>)
                      }
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className='border p-2 '> total items = {totalitems}</td>
                      <td className='border p-2'> </td>
                      <td className='border p-2'>total-price = {totalPrice} RS</td>
                    </tr>
                  </tfoot>
                </table>
                <div className='p-2' style={{ "width": "fit-content" }}>
                  <h4 >status</h4>
                  <h3 >{a.state}</h3>
                </div>
              </div>
            )
          })
        }
      </section >
    </>
  )
}


export default Order
