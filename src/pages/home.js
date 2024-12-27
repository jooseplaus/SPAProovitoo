import React from "react";

function Home () {
    return(
        <div style={{width: "100%", display: "flex", height: "100vh", justifyContent: "center", alignItems: "center"}}>
            <div style={{display:"flex", alignItems: "center", flexDirection:"column", gap:"0px"}}>
                <h1 style={{fontFamily:"BoosterNextFY, sans-serif", color: "#14cc76", fontSize:"45px", textTransform:"uppercase", margin:"0px 0px"}}>Trinidad Wiseman</h1>
                <p style={{fontFamily:"BoosterNextFY, sans-serif", color:"white", fontSize:"39px", margin:"0px 0px"}}>SPA proovitöö</p>
            </div>
        </div>
    )
}

export default Home