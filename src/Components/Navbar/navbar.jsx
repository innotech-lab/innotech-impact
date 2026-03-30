import React, { useState } from "react";
import "./Navbar.css";
import { IoMdCloseCircle } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import Logor from "../../assets/Logor.png";

const Navbar = () => {

  const [active, setActive] = useState("navBar");

  const showNav = () => {
    setActive("navBar activeNavbar");
  };

  const removeNav = () => {
    setActive("navBar");
  };

  return (
  <section className="navBarSection">
    <div class="py-1 bg-black top">
      <div class="container">
        <div class="row no-gutters d-flex align-items-start align-items-center px-md-0">
          <div class="col-lg-12 d-block">
            <div class="row d-flex">
              <div class="col-md pr-4 d-flex topper align-items-center">
                <div class="icon mr-2 d-flex justify-content-center align-items-center"><span class="icon-phone2"></span></div>
                <span class="text">+ 1235 2355 98</span>
              </div>
              <div class="col-md pr-4 d-flex topper align-items-center">
                <div class="icon mr-2 d-flex justify-content-center align-items-center"></div>
                <span class="text">lievinkava@gmail.com</span>
              </div>
              <div class="col-md-5 pr-4 d-flex topper align-items-center text-lg-right justify-content-end">
                <p class="mb-0 register-link"><span>Open hours:</span> <span>Monday - Sunday</span> <span>8:00AM - 9:00PM</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        <header className="header">
          {/* LEFT - LOGO */}
          <div className="navbar-left">
            <div className="logo-circle">
              <img src={Logor} alt="Innotech Logo" className="logo-img" />
            </div>
          </div>

          {/* MENU */}
          <div className={active}>
            <ul className="navLists">

              <li className="navItem">
                <a href="#" className="navLink">Home</a>
              </li>

              <li className="navItem">
                <a href="#" className="navLink">About</a>
              </li>

              <li className="navItem">
                <a href="#" className="navLink">Web & Mobile</a>
              </li>

              <li className="navItem">
                <a href="#" className="navLink">Formation</a>
              </li>

              <li className="navItem">
                <a href="#" className="navLink">Contact us</a>
              </li>

              <button className="btn">
                <a href="#">Devis</a>
              </button>
            </ul>

            {/* CLOSE ICON */}
            <div className="closeNavbar" onClick={removeNav}>
              <IoMdCloseCircle className="icon" />
            </div>
          </div>

          {/* HAMBURGER */}
          <div className="toggleNavbar" onClick={showNav}>
            <GiHamburgerMenu className="icon" />
          </div>

        </header>
      </section>
  );
};

export default Navbar;