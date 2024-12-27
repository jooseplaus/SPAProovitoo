import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navigation from "./pages/nav";
import Article from "./pages/article"; 
import Table from "./pages/table";
import Home from "./pages/home";
import './App.css'
import ImgLeft from './assets/bg-deco-left.svg'
import ImgRight from './assets/bg-deco-right.svg'
import MobileNav from "./pages/mobile-nav";


function App() {
  return (
    <div className="maindiv">
      <Router>
        <div className="desktop-nav">
          <Navigation/>
        </div>
        <div className="mobile-nav">
          <MobileNav/>
        </div>
        <div className="content-div">
          <div className="content">
          <Routes>
            <Route path="/artikkel" element={<Article/>}/>
            <Route path="/tabel" element={<Table/>}/>
            <Route path="/" element={<Home/>}/>
          </Routes>
          </div>
          {/* Vasak pilt */}
          <img className="corner-img left" src={ImgLeft}/>
          {/* Parem pilt */}
          <img className="corner-img right" src={ImgRight}/>
        </div>
      </Router>
    </div>
  );
}

export default App;
