import React from 'react';
//BrowserRouter / HashRouter / MemoryRouter
import { Link } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';
import 'bootstrap/dist/js/bootstrap.js';
import logo from '../img/logo.png';

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-dark bg-primary navbar-expand-md">
                <Link to="/">
                    <span className="navbar-brand" >
                        <img src={logo} className="d-inline-block mr-1 image-fluid" alt="logo" />
                        Escape Rooom
                    </span>
                </Link>
                <div className="collapse navbar-collapse" id="menu">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/rooms">
                                <span className="nav-link"> Our rooms </span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/calendar">
                                <span className="nav-link"> Calendar </span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/account">
                                <span className="nav-link"> Account </span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </nav>
        </div>
    );
}

export default Navbar;