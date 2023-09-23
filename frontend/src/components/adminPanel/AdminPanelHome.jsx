import React, { useContext, useState } from 'react'
import AddFoodModal from './AddFoodModal'
import CombinedContext from '../../contexts/CombinedContext'
import RemovefoodConfirmModal from './RemovefoodConfirmModal'

export default function AdminPanelHome() {
  const { openAddfoodModal, addfoodmodalv, jsonData ,mode,Removefoodmodalv,openRemovefoodModal} = useContext(CombinedContext)
  // console.log(jsonData)
  const [remItem,setRemitem]=useState({})
  return (
    <>
      {addfoodmodalv && <AddFoodModal />}

      {Removefoodmodalv && <RemovefoodConfirmModal item={remItem}/>}
      <div className=' rounded mx-2 my-3'>
        <button className='btn btn-primary' id="add_food_item" onClick={openAddfoodModal}>+<br />add modify food</button>
      </div>
      <div className={`bg-${mode} foodgrid p-3`}>
        {jsonData.map(item => (
          <div className=' rounded d-flex border bg-primary justify-content-between align-items-center px-2 py-1 mx-2 my-3' key={item._id}>
            <div>
              <img src={`${item.itemImgLoc}`} style={{ width: "30px" }} alt="" />
            </div>
            <div className='m-2'>
              <h6>{item.itemName}</h6>
              <p className='text-white'>{item.itemPrice} rs</p>
            </div>
            <div>
              <button className='mx-3 bg-primary p-2 ' id="remove_Food" onClick={()=>{openRemovefoodModal();setRemitem(item)}}>-<br />remove</button>
            </div>
          </div>
        ))
        }
      </div>
    </>
  )
}
