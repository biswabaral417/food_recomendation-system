import React, { useContext } from 'react'
import CombinedContext from '../../contexts/CombinedContext'

export default function ManagePendingAdmins({ pendingAdmins,setPendingAdmins,setExistingAdmins,existingAdmins }) {
    const { mode } = useContext(CombinedContext)


    const addToAdmins = async (user) => {
        const res = await fetch("/api/admins/addtoadmins", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(user)
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
            window.alert(data.error);

        }
        if (res.status === 404) {
            window.alert(data.error);

        }
        else if (res.status === 200) {
            window.alert(data.success);
            const updatedPendingAdmins = pendingAdmins.filter(elem => elem._id !== user._id);
            setPendingAdmins(updatedPendingAdmins);
            setExistingAdmins([...existingAdmins,user])
        }
        else {
            window.alert("connection error")
        }
    }
    const deleteReq= async (user) => {
        const res = await fetch("/api/admins/deleteReq", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(user)
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
            window.alert(data.error);

        }
        if (res.status === 404) {
            window.alert(data.error);

        }
        else if (res.status === 200) {
            window.alert(data.success);
            const updatedPendingAdmins = pendingAdmins.filter(elem => elem._id !== user._id);
            setPendingAdmins(updatedPendingAdmins);
        }
        else {
            window.alert("connection error")
        }
    }

    return (
        <>
            {pendingAdmins.map((element, i) => (
                <div key={`${i}`} className={` p-1 border fs-3 border-dark-subtle text-${mode === "dark" ? "white" : "black"} px-2 d-flex justify-content-between align-items-center`}>
                    {element.userName.toUpperCase()}
                    <div className='d-flex gap-3'>
                        <button onClick={()=>deleteReq(element)} className={`btn btn-primary px-4 py-1 fw-semibold`}>decline/delete</button>
                        <button onClick={() => addToAdmins(element)} className={`btn btn-primary px-4 py-1 fw-semibold`}>approve</button>
                    </div>
                </div>
            ))}
        </>
    )
}
