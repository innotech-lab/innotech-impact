import React, { useState } from "react";
import "./Navbar.css";
import { IoMdCloseCircle } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

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
      <header className="header">

        {/* LOGO */}
        <div className="logoDiv">
          <a href="#" className="logo">
            <h1>Innotech</h1>
          </a>
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