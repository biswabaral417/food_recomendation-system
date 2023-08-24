import React, { useContext } from 'react'
import CombinedContext from '../../contexts/CombinedContext'

export default function ManageAdmins({ existingAdmins,setExistingAdmins }) {




    const removeAdmin= async (user) => {
        const res = await fetch("/api/admins/removeAdmin", {
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
            const updatedAdmins = existingAdmins.filter(admin => admin._id !== user._id);
            setExistingAdmins(updatedAdmins);
        }
        else {
            window.alert("connection error")
        }
    }

    const { mode } = useContext(CombinedContext)
    return (
        <>
            {existingAdmins.map((element, i) => (
                <div key={`${i}`} className={` p-1 border border-dark-subtle text-${mode === "dark" ? "white" : "black"} px-2 d-flex justify-content-between align-items-center`}>
                    {element.userName.toUpperCase()}
                    <div>
                        <button onClick={()=>removeAdmin(element)} className={`btn btn-primary px-4 py-1 fw-semibold`}>Remove</button>
                    </div>
                </div>
            ))}
        </>
    )
}
