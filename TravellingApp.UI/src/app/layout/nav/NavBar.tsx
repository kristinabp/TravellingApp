import React from "react";
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/wheather">Wheather</Link>
      </li>
      <li>
        <Link to="/restorantSuggest">Restorants</Link>
      </li>
      <li>
        <Link to="/rentCar">Rent a car</Link>
      </li>
      <li>
        <Link to="/hotels">Hotels</Link>
      </li>
      <li>
        <Link to="/monuments">Monuments</Link>
      </li>
    </ul>
  </nav>
  );
};

export default NavBar;
