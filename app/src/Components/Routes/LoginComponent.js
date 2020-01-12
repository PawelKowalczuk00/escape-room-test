import React from 'react';
import { login } from '../../functions/axiosSetup';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';
import Loader from '../LoaderComponent';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../css/form.css';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: localStorage.getItem('username') || "", email: "", password: "", redirect: false, error: "" };
        if (this.props.location.state)
            this.loginHelper(this.props.location.state.username, this.props.location.state.password);
    }

    onLoginSubmit = (e) => {
        this.setState({ info: null, error: null });
        e.preventDefault();
        this.loginHelper(this.state.username, this.state.password);
    }

    loginHelper = (username, password) => {
        login({
            username,
            password
        })
            .then(res => {
                localStorage.setItem('x-auth-token', res.headers['x-auth-token']);
                localStorage.setItem('username', this.state.username);
                this.setState({ redirect: true });
            })
            .catch(er => {
                if (er.response) {
                    this.setState({ error: "Invalid username or password" });
                }
                else {
                    this.setState({ error: er.message });
                }
            });
    }

    renderForm = () => {
        return (
            <span>
                <form onSubmit={this.onLoginSubmit}>
                    <span className="text-danger">{this.state.error}</span>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" placeholder="username" aria-describedby="emailHelp"
                            value={this.state.username}
                            onChange={(e) => this.setState({ username: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="min 8 characters"
                            value={this.state.password}
                            onChange={(e) => this.setState({ password: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign in</button>
                </form>
                <Link to="/register">
                    <span className="">Don't have an account? Register now!</span>
                </Link>
            </span>
        );
    }

    render() {
        if (this.state.redirect)
            return <Redirect to='/account' />
        return (
            <div className="container">
                <div className="flex-column align-items-center">
                    <h2>Login</h2>
                    {this.state.error === null ? <Loader /> : this.renderForm()}
                </div>
            </div>
        );
    }
}


export default LoginComponent;