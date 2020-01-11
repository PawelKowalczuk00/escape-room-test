import React from 'react';
import { login } from '../../functions/axiosSetup';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", email: "", password: "", redirect: false, error: "" };
    }

    componentDidMount() {
        this.setState({ redirect: false });
    }

    onLoginSubmit = (e) => {
        this.setState({ info: null, error: "" });
        e.preventDefault();
        login({
            username: this.state.username,
            password: this.state.password
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

    render() {
        if (this.state.redirect)
            return <Redirect to='/account' />;
        return (
            <div className="container">
                <div className="flex-column align-items-center">
                    <h2>Login</h2>
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
                </div>
            </div>
        );
    }
}


export default LoginComponent;