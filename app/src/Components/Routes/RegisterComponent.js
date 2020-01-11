import React from 'react';
import { register } from '../../functions/axiosSetup';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../css/form.css';

class RegisterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", email: "", password: "", redirect: false, error: "" };
    }

    componentDidMount() {
        this.setState({ redirect: false });
    }

    onRegisterSubmit = async (e) => {
        this.setState({ error: "" });
        localStorage.clear();
        e.preventDefault();
        register({
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        })
            .then(res => {
                localStorage.setItem('x-auth-token', res.headers['x-auth-token']);
                localStorage.setItem('username', this.state.username);
                this.setState({ redirect: true });
            })
            .catch(er => {
                if (er.response) {
                    this.setState({ error: er.response.data });
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
                    <h2>Register</h2>
                    <form onSubmit={this.onRegisterSubmit}>
                        <span className="text-danger">{this.state.error}</span>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" id="username" placeholder="username" aria-describedby="emailHelp"
                                value={this.state.username}
                                onChange={(e) => this.setState({ username: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" className="form-control" id="email" placeholder="email@example.com" aria-describedby="emailHelp"
                                value={this.state.email}
                                onChange={(e) => this.setState({ email: e.target.value.toLowerCase() })}
                            />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="min 8 characters"
                                value={this.state.password}
                                onChange={(e) => this.setState({ password: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Sign up</button>
                    </form>
                    <Link to="/login">
                        <span className="">Already have an account? Log in!</span>
                    </Link>
                </div>
            </div >
        );
    }
}


export default RegisterComponent;