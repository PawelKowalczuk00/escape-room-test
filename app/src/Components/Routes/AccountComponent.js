import React from 'react';
import { login, register, account } from '../../functions/axiosSetup';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", email: "", password: "", info: null, error: "" };
    }

    onRegisterSubmit = async (e) => {
        this.setState({ info: null, error: "" });
        localStorage.clear();
        e.preventDefault();
        register({
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        })
            .then(res => {
                this.setState({ info: res.data });
            })
            .catch(er => {
                console.log(er);
                if (er.response) {
                    this.setState({ info: er.response.data });
                }
                else {
                    this.setState({ info: er.message});
                }
            });
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
                this.token = res.headers['x-auth-token'];
                localStorage.setItem('username', this.state.username);
                this.setState({ info: res.data });
            })
            .catch(er => {
                this.setState({ error: "Invalid username or password" });
            });
    }

    onInfoSubmit = (e) => {
        this.setState({ info: null, error: "" });
        e.preventDefault();
        account()
            .then(res => {
                this.setState({ info: JSON.stringify(res.data) });
            })
            .catch(er => {
                console.log(er);
                if (er.response) {
                    this.setState({ info: er.response.data });
                }
                else {
                    this.setState({ info: er.message});
                }
            });
    }

    onLoggOutClick = () => {
        localStorage.clear();
        this.setState({ info: "Logged out", error: "" });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h2>Register</h2>
                        <form onSubmit={this.onRegisterSubmit}>
                            <span className="text-danger">{this.state.error}</span>
                            <div className="form-group">
                                <label htmlFor="usernameR">Username</label>
                                <input type="text" className="form-control" id="usernameR" placeholder="username" aria-describedby="emailHelp"
                                    value={this.state.username}
                                    onChange={(e) => this.setState({ username: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="emailR">Email address</label>
                                <input type="email" className="form-control" id="emailR" placeholder="email@example.com" aria-describedby="emailHelp"
                                    value={this.state.email}
                                    onChange={(e) => this.setState({ email: e.target.value.toLowerCase() })}
                                />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="passwordR">Password</label>
                                <input type="password" className="form-control" id="passwordR" placeholder="min 8 characters"
                                    value={this.state.password}
                                    onChange={(e) => this.setState({ password: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                    <div className="col-12 col-md-6">
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
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
                <div className="text-center">
                    <h2>Account info</h2>
                    <form onSubmit={this.onInfoSubmit}>
                        <button type="submit" className="btn btn-primary">See daetails</button>
                    </form>
                    <div className="alert alert-primary" role="alert">{this.state.info}</div><br />
                    <button type="button" className="btn btn-danger" onClick={this.onLoggOutClick}>Log out</button>
                </div>
            </div>
        );
    }
}


export default HomeComponent;