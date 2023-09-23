import React from 'react';
import { NavLink } from 'react-router-dom';
import CombinedContext from '../../contexts/CombinedContext';
import { useContext } from 'react';




export default function DvgNavbar() {
    const { mode, toggleMode, logInOutBtnFunc, logBtntxt } = useContext(CombinedContext);
    return (

        <div>
            <nav className={`navbar navbar-expand-lg bg-${mode}`}>
                <div className="container-fluid">
                    <div className="navbar-brand" to="/">Brand</div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className={`navbar-toggler-icon ${mode === "dark" && "nav-tog"}`}></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className={`nav-link text-${mode === "light" ? "dark" : "light"} mx-2`} aria-current="page" to="/deliveryguy">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={`nav-link text-${mode === "light" ? "dark" : "light"} mx-2`} aria-current="page" to="/deliveryguy/deliverwhat">Deliver What</NavLink>
                            </li>

                        </ul>

                        <div className="form-check form-switch m-1 ">
                            <input className="form-check-input d-block" type="checkbox" onClick={toggleMode} role="switch" id="flexSwitchCheckDefault" />
                            <label className={`form-check-label text-${mode === "light" ? "dark" : "light"}`} htmlFor="flexSwitchCheckDefault">dark mode</label>
                        </div>
                        <div >
                            <button id="userAcess" className='btn btn-primary m-1' onClick={logInOutBtnFunc}>{logBtntxt}</button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
