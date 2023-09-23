import React, { useContext, useState } from 'react'
import CombinedContext from '../../contexts/CombinedContext'

export default function AddFoodModal() {
    const { closeAddfoodModal } = useContext(CombinedContext)
    const [adminInpFoods,setadminInpFOods]=useState({item_name:"",price:0,RecSeason:"",imgloc:""})
    let feildId;
    let feildVal;
    const stateupdateinputs=(e)=>{
        feildId=e.target.id
        feildVal=e.target.value
        setadminInpFOods({...adminInpFoods,[feildId]:feildVal})
        console.log(adminInpFoods)
    }
    
    const AddmodifyfoodsinDb=async (adminInpFoods)=>{
        try {
            const res=await fetch('/api/admins/modifyfoodsdata',{
                method:"POST",
                credentials:"include",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({adminInpFoods})
            },
            )
        
            const data=await res.json()
            if (res.status!==200) {
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
            <div className='Modal-wrapper' onClick={() => closeAddfoodModal()}></div>
            <div className='rounded Modal-container p-3'>
                <div className='m-2'>
                    <label className='label-width' htmlFor="item_name">itemName</label>
                    <input type="text" id='item_name' placeholder='enter food item name here' onChange={stateupdateinputs}  value={adminInpFoods.item_name}/>

                </div>
                <div className='m-2'>
                    <label className='label-width' htmlFor="RecSeason">Recomended Season</label>
                    <input type="text" id='RecSeason' placeholder='summer or winter' onChange={stateupdateinputs} value={adminInpFoods.RecSeason} />

                </div>
                <div className='m-2'>
                    <label className='label-width' htmlFor="price">item price</label>
                    <input type="number" id='price' placeholder='enter number only' onChange={stateupdateinputs} value={adminInpFoods.price}/>

                </div>
                <div className='m-2'>
                    <label className='label-width' htmlFor="imgloc">image location</label>
                    <input type="string" id='imgloc' placeholder='enter image location in images folder' onChange={stateupdateinputs}  value={adminInpFoods.imgloc}/>

                </div>
                <div className='d-flex'>
                    <button className='btn btn-danger m-2' onClick={()=>{closeAddfoodModal();AddmodifyfoodsinDb(adminInpFoods)}} id='addfooditm'>add</button>
                </div>
            </div>
        </>
    )
}
