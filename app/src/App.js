import React from 'react';
//BrowserRouter / HashRouter / MemoryRouter
import { MemoryRouter, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import Navbar from './Components/Navbar';
import HomeComponent from './Components/Routes/HomeComponent';
import RoomsComponent from './Components/Routes/RoomsComponent';
import CalendarComponent from './Components/Routes/CalendarComponent';
import AccountComponent from './Components/Routes/AccountComponent';
import RegisterComponent from './Components/Routes/RegisterComponent';
import LoginComponent from './Components/Routes/LoginComponent';

class App extends React.Component {
  render() {
    return (
      <div>
        <MemoryRouter>
          <Navbar />
          <section className="col-12 col-lg-10 offset-lg-1">
            <Route path="/" exact component={HomeComponent} />
            <Route path="/rooms" exact component={RoomsComponent} />
            <Route path="/calendar" exact component={CalendarComponent} />
            <Route path="/account" exact component={AccountComponent} />
            <Route path="/register" exact component={RegisterComponent} />
            <Route path="/login" exact component={LoginComponent} />
          </section>
        </MemoryRouter>
      </div>
    );
  }
}

export default App;