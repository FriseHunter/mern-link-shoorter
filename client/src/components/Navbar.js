import React, { useContext } from "react";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";


export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')

  }
  return(
    <nav className='grey darken-4'>
      <div className="container">
        <div className="nav-wrapper">
          <span className="brand-logo deep-orange-text">Shortening Links</span>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><NavLink to="/create" className=' deep-orange-text'>Create</NavLink></li>
            <li><NavLink to="/links" className=' deep-orange-text'>Links</NavLink></li>
            <li><a href="/" onClick={logoutHandler} className=' deep-orange-text'>Exit</a></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}