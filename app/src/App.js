import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './css/App.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import logo from './img/logo.png';

class App extends React.Component {
  render() {
    return (
      <div className="App ">
        <section>
          <nav className="navbar navbar-dark bg-primary navbar-expand-md">
            <a className="navbar-brand" href="#top">
              <img src={logo} className="d-inline-block mr-1 align-bottom" alt="logo" />
              Escape Rooom
              </a>
            <div className="collapse navbar-collapse" id="menu">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#about"> About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#rooms"> Our rooms </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#calendar"> Calendar </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#register"> Register </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#login"> Login </a>
                </li>
              </ul>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu">
              <span className="navbar-toggler-icon"></span>
            </button>
          </nav>
        </section>
      </div>
    );
  }
}


export default App;
