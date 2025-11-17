import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import InputForm from './InputForm';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(token ? false : true);
  const user = JSON.parse(localStorage.getItem("user"));
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false); // State to control hamburger menu

  useEffect(() => {
    setIsLogin(token ? false : true);
  }, [token]);

  const checkLogin = () => {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLogin(true);
    } else {
      setIsOpen(true);
    }
  };

  const goToAllRecipes = () => {
    navigate('/allRecipes');
  };
 
  const toggleHamburger = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  return (
    <>
      <header>
        <div className="logo">
          <h2>DishDelight</h2>
        </div>

        <nav>
          <ul className={isHamburgerOpen ? 'active' : ''}>
            <li><NavLink to="/">Home</NavLink></li>
            <li onClick={goToAllRecipes}><NavLink to="/allRecipes">All Recipes</NavLink></li>
            <li onClick={() => isLogin && setIsOpen(true)}><NavLink to={!isLogin ?  "/myRecipe" : "/"}>My Recipe</NavLink></li>
            <li onClick={() => isLogin && setIsOpen(true)}><NavLink to={!isLogin ? "/favRecipe" : "/"}>My Favourites</NavLink></li>
            <li onClick={checkLogin}>
              <p className="login">{isLogin ? "Login" : `Logout (${user?.email?.slice(0, 5) || "Guest"})`}</p>
            </li>
          </ul>
          <div className="hamburger" onClick={toggleHamburger}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </nav>
      </header>

      {isOpen && <Modal onClose={() => setIsOpen(false)}><InputForm setIsOpen={() => setIsOpen(false)} /></Modal>}
    </>
  );
}
