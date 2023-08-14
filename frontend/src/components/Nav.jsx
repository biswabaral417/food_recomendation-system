import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import SharedPropsContext from '../contexts/SharedPropsContext';
import { useContext } from 'react';




export default function Nav({ openLoginModal }) {
    const { mode, toggleMode, itemSearch, userlogInfo, logout,logBtntxt } = useContext(SharedPropsContext);
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
                                <NavLink className={`nav-link text-${mode === "light" ? "dark" : "light"} mx-2`} aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={`nav-link text-${mode === "light" ? "dark" : "light"} mx-2`} to="/foods">Foods</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={`nav-link text-${mode === "light" ? "dark" : "light"} mx-2`} to="/cart">Cart</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={`nav-link text-${mode === "light" ? "dark" : "light"} mx-2`} to="/about">About</NavLink>
                            </li>
                        </ul>
                        <div className="form-check form-switch m-1 ">
                            <input className="form-check-input d-block" type="checkbox" onClick={toggleMode} role="switch" id="flexSwitchCheckDefault" />
                            <label className={`form-check-label text-${mode === "light" ? "dark" : "light"}`} htmlFor="flexSwitchCheckDefault">dark mode</label>
                        </div>
                        <form className="d-flex m-1" id='search' role="search">
                            <Link to='/foods'>
                                <input className="form-control me-2 " id='str' type="search" placeholder="Search" onChange={() => itemSearch(document.getElementById('str').value)} aria-label="Search" />
                            </Link>
                        </form>
                        <div >
                            <button id="userAcess" className='btn btn-primary m-1' onClick={userlogInfo !== true ? openLoginModal : logout}>{logBtntxt}</button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
