import React from "react";
import { NavLink } from "react-router-dom";
import Logo from '../assets/logo.svg'
import '../styles/nav.css'
import { useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.css';


function Navigation() {

    const navigate = useNavigate()

    const handleLogoClick = () => {
        navigate("/")
    }

    return(
        <div className="nav-section">
            <div>
                <img className="main-logo" src={Logo} onClick={handleLogoClick}/>
            </div>
            <ul className="nav-list">
                <li className="nav-element">
                    <NavLink
                        className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
                        to="/"
                    >
                        Kodu <i className="fa fa-house"></i>
                    </NavLink>
                </li>
                <li className="nav-element">
                    <NavLink 
                        className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} 
                        to="/artikkel"
                    >
                        Artikkel <i className="fa fa-table fa-md"></i>
                    </NavLink>
                </li>

                <li className="nav-element">
                    <NavLink 
                        className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} 
                        to="/tabel"
                    >
                        Tabel <i className="fa fa-file"></i>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Navigation