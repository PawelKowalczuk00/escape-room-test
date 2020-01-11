import React from 'react';
import { Link } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';
import 'bootstrap/dist/js/bootstrap.js';
import logo from '../img/logo.png';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.items = [React.createRef(), React.createRef(), React.createRef()];
    }

    onNavLinkClick = (e) => {
        this.items.forEach(link => {
            link.current.children[0].classList.remove("active");
        });
        e.currentTarget.children[0].classList.add("active");
    }

    userStatus = () => {       
        if (localStorage.length !== 0)
            return "/account";
        return "/login";
    }

    render() {
        return (
            <div style={{ marginBottom: "7px" }}>
                <nav className="navbar navbar-dark bg-primary navbar-expand-md">
                    <Link to="/">
                        <span className="navbar-brand" onClick={this.onNavLinkClick}>
                            <img src={logo} className="d-inline-block mr-1 image-fluid" alt="logo" />
                            Escape Rooom
                        </span>
                    </Link>
                    <div className="collapse navbar-collapse" id="menu">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item" onClick={this.onNavLinkClick} ref={this.items[0]}>
                                <Link to="/rooms">
                                    <span className="nav-link"> Our rooms </span>
                                </Link>
                            </li>
                            <li className="nav-item" onClick={this.onNavLinkClick} ref={this.items[1]}>
                                <Link to="/calendar">
                                    <span className="nav-link"> Calendar </span>
                                </Link>
                            </li>
                            <li className="nav-item" onClick={this.onNavLinkClick} ref={this.items[2]}>
                                <Link to={this.userStatus}>
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
}

export default Navbar;