import React from 'react';
import { account } from '../../functions/axiosSetup';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';
import Loader from '../LoaderComponent';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../css/account.css';

class AccountComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { info: "", user: null, redirect: false };
    }

    componentDidMount() {
        account()
            .then(res => {
                this.setState({ info: "Logged in", user: res.data });
                let bookings = res.data.bookings.map(term => {
                    return (new Date(term.term)).valueOf() + "@" + term.room;
                })
                sessionStorage.setItem('bookings', bookings);
            })
            .catch(er => {
                if (er.response) {
                    this.setState({ info: er.response.data });
                }
                else {
                    this.setState({ info: er.message });
                }
                setTimeout(() => {
                    this.setState({ redirect: true });
                }, 2000)
            });
    }


    onLoggOutClick = () => {
        localStorage.clear();
        sessionStorage.clear();
    }

    renderAccountInfo = () => {
        if (this.state.user === null) {
            return (
                <div>
                    <div className="alert alert-primary" role="alert">{this.state.info}</div>
                    <br />
                    <Loader />
                </div>
            );
        }
        return (
            <div>
                <div className="margined">
                    <h3 className="custom-header">Your username: </h3>
                    <span className="custom-paragraph badge badge-primary text-wrap">{this.state.user.username}</span>
                </div>
                <div className="margined">
                    <h3 className="custom-header">Your email: </h3>
                    <span className="custom-paragraph badge badge-primary text-wrap">{this.state.user.email}</span>
                </div>
                <div className="margined">
                    <table className="table table-sm table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Room</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.user.bookings.map((term, index) => {
                                term.term = new Date(term.term);
                                return (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{term.room}</td>
                                        <td>{term.term.toLocaleDateString()} {term.term.toLocaleTimeString()}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    render() {
        if (this.state.redirect)
            return <Redirect to='/login' />;
        return (
            <div className="container">
                <h2>Account info</h2>
                {this.renderAccountInfo()}
                <Link to="/login">
                    <button type="button" className="btn btn-danger btn-block" onClick={this.onLoggOutClick}>Log out</button>
                </Link>
            </div>
        );
    }
}


export default AccountComponent;