import React, { useContext } from 'react'
import CombinedContext from '../../contexts/CombinedContext'

export default function RemovefoodConfirmModal({ item }) {
    const {closeRemovefoodModal}=useContext(CombinedContext)
    
    const RemovefoodfrmDb=async ()=>{
            const res=await fetch('/api/admins/removeFooditem',{
                method:'POST',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(item)
            })
            const data=await res.json()
            if (res.status!==200) {
                window.alert(data.error)
            }
            else{
                window.alert(data.success)
            }

    }

    return (
        <>
            <div className='Modal-wrapper' onClick={closeRemovefoodModal}></div>
            <div className='Modal-container rounded'>
                <h1 className='p-5'>are u sure u want to delete item {item.itemName} from the menu?</h1>
                <div className='d-flex'>
                    <button className='btn btn-primary m-2 ' onClick={()=>{closeRemovefoodModal();RemovefoodfrmDb(item)}} >yes</button><button className='btn btn-primary m-2 ' onClick={closeRemovefoodModal} >no</button>
                </div>
            </div>
        </>
    )
}
