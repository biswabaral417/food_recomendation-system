import React, { useContext } from 'react'
import { useState } from 'react';
import CombinedContext from '../../contexts/CombinedContext';
import { useNavigate} from 'react-router-dom';


export default function AdminRegister() {
    const navigate=useNavigate();
    const { openLoginModal } = useContext(CombinedContext)
    const [rUserData, setRUserData] = useState({ userName: "", userPhone: "", userEmail: "", userPassword: "", userConfirmPassword: "", userLocation: "" });

    let feildId;
    let value;
    const removeWarning = () => {
        document.getElementById("cbwarning").textContent = ""
    }
    const handleInputs = (e) => {
        feildId = e.target.id;
        value = e.target.value;
        setRUserData({ ...rUserData, [feildId]: value })
        console.log(rUserData);
    }
    const PostData_Register_admin = async (e) => {
        e.preventDefault()
        // console.log((document.getElementById('flexCheckChecked').checked))
        if ((document.getElementById('flexCheckChecked')).checked) {
            const { userName, userPhone, userEmail, userPassword, userConfirmPassword, userLocation } = rUserData;
            console.log({ rUserData })
            const res = await fetch("/api/admins/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userName, userPhone, userEmail, userPassword, userConfirmPassword, userLocation })
            });

            const data = await res.json();
            console.log(res.json)
            if (res.status === 422 || !data) {
                window.alert(data.error);
                console.log(data.error);
            }
            else if (res.status === 201) {
                window.alert(data.sucess);
                console.log(data.sucess);
                navigate('/admin')
                openLoginModal();
            }
            else if (res.status === 500) {
                window.alert(data.failed);
                console.log(data.failed);
            }
            else {
                window.alert("connection error")
            }

        }
        else {
            document.getElementById("cbwarning").textContent = `"check this box to continue"`
        }
    }






    const togPass = () => {
        if (document.getElementById('userPassword').type === "password") {
            document.getElementById('userPassword').setAttribute("type", "text");
            document.getElementById('userConfirmPassword').setAttribute("type", "text");
            document.querySelector('.togp-btn').querySelector("img").setAttribute("src", "../images/eye-slash-fill.svg")
        }
        else {
            document.getElementById('userPassword').setAttribute("type", "password");
            document.querySelector('.togp-btn').querySelector("img").setAttribute("src", "../images/eye-fill.svg")
            document.getElementById('userConfirmPassword').setAttribute("type", "password");
        }
    }

    const styletxt={
        height:"100dvh",
    }

    return (

        <div className='p-5 bg-light' style={styletxt}>
            <h1 className='text-center text-black fs-3'>Apply for Admin</h1>

            <div>
                <form method='post'>
                    <input value={rUserData.userName} onChange={handleInputs} type="text" id='userName' className='form-control my-2' placeholder='Enter name' />
                    <div className="mb-3 d-flex gap-1">
                        <input value={rUserData.userPhone} onChange={handleInputs} type="text" className="form-control" id="userPhone" aria-describedby="phoneHelp" placeholder='Phone No' />
                        <input value={rUserData.userLocation} onChange={handleInputs} type="text" className="form-control" id="userLocation" aria-describedby="phoneHelp" placeholder='Address' />
                    </div>

                    <input value={rUserData.userEmail} onChange={handleInputs} type="email" className="form-control  my-2" id="userEmail" aria-describedby="emailHelp" placeholder='Enter Email &nbsp;&nbsp;&nbsp; eg-example123@gmail.com' />
                    <div className="mb-3">
                        <input value={rUserData.userPassword} onChange={handleInputs} type="password" className="form-control  " id="userPassword" placeholder='Create Strong Password ' />

                        <div className='d-flex'>
                            <input value={rUserData.userConfirmPassword} onChange={handleInputs} type="password" className="form-control my-2" id="userConfirmPassword" placeholder='Retype Password' />
                            <button className='m-2 togp-btn d-flex align-items-center' onClick={() => togPass()} type='button'>&nbsp;<img src="../images/eye-slash-fill.svg" alt="" /></button>
                        </div>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label text-black" id="chk" htmlFor="flexCheckChecked">
                            <input className="form-check-input d-flex" type="checkbox" onChange={removeWarning} id="flexCheckChecked" required />
                            Agree Terms and Conditions<i id="cbwarning" className='mx-3 text-danger text-italic'></i>
                        </label>
                    </div>
                    <button className="btn btn-primary" onClick={PostData_Register_admin} >Apply Application</button>
                </form>
            </div>

        </div>
    )
}
