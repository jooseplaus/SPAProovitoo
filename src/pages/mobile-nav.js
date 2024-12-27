import React, { useState } from "react";
import Logo from '../assets/logo.svg'
import Navigation from "./nav";



function MobileNav() {

    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return(
        <div>
            <div style={{padding: "10px 20px"}}>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <div>
                        <i
                        className={isOpen ? "fa fa-times" : "fa fa-bars"}
                        style={{
                            fontSize: "20px",
                            cursor: "pointer",
                            position: "absolute",
                            left: "20px", 
                            top: "15px", 
                            zIndex:"2000"
                        }}
                        onClick={toggleMenu}
                        ></i>
                    </div>
                    <img src={Logo} style={{width: "105px", height: "30px"}}/>
                </div>
            </div>
            <div
            style={{
                position: "fixed",
                top: "0",
                left: "0",
                height: "100%",
                width: "250px",
                background: "white",
                color: "white",
                transform: isOpen ? "translateX(0)" : "translateX(-100%)",
                transition: "transform 0.3s ease", 
                zIndex: "1000", 
            }}
            >
                <Navigation/>    
            </div>
     </div>  
    )
}

export default MobileNav