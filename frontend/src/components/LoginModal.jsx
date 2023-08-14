import React, { useState } from 'react'

export default function LoginModal({ closeLoginModal, openSignUpModal }) {

    const togPass = () => {
        if (document.getElementById('InputPassword').type === "password") {
            document.getElementById('InputPassword').setAttribute("type", "text");
            document.querySelector('.togp-btn').querySelector("img").setAttribute("src", "../images/eye-slash-fill.svg")
        }
        else {
            document.getElementById('InputPassword').setAttribute("type", "password");
            document.querySelector('.togp-btn').querySelector("img").setAttribute("src", "../images/eye-fill.svg")
        }
    }
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");




    const PostData_Login = async (e) => {
        e.preventDefault()
        // console.log((document.getElementById('flexCheckChecked').checked))

        const res = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userEmail, userPassword})
        });
        const data = await res.json();
        console.log(res.json);
        if (res.status === 422 || !data) {
            window.alert(data.error);
            
        }
        else if (res.status === 201) {
            window.alert(data.sucess);
            console.log(data.sucess);
            closeLoginModal();
        }
        else {
            window.alert("connection error")
        }

    }






    return (
        <>
            <div className='Modal-wrapper' onClick={closeLoginModal}></div>
            <div className='Login-Modal-Container rounded p-3'>
                <h1 className='text-center text-black'>Log in</h1>
                <div className='my-5'>
                    <form method="POST" >
                        <div>
                            <div className="mb-3">
                                <label htmlFor="InputEmail" className="form-label text-black">Email address</label>
                                <input type="email" className="form-control" id="InputEmail" onChange={(e)=>setUserEmail(e.target.value)} value={userEmail} aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1"  className="form-label text-black">Password</label>
                                <div className='d-flex'>
                                    <input type="password"  onChange={(e)=>setUserPassword(e.target.value)} value={userPassword} className="form-control" id="InputPassword" />
                                    <button className='d-flex togp-btn mx-2' onClick={() => togPass()} type='button'><img src="../images/eye-fill.svg" alt="" /></button>
                                </div>
                            </div>
                        </div>
                        <div className='my-4'>
                            <button id="loginbtn" onClick={PostData_Login} className="btn btn-primary">Login</button>
                            {/* <button className="btn btn-primary my-2">Forgot password ?</button> */}
                        </div>
                    </form>
                    <p className='text-center mt-3 text-black'>don't have a account? <button onClick={() => { closeLoginModal(); openSignUpModal() }} className='text-primary btn text-decoration- underline'>create one</button></p>
                </div>
            </div>

        </>
    )
}
