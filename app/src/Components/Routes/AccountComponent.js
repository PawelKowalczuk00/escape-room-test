import React from 'react';
import { account } from '../../functions/axiosSetup';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

class AccountComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { info: "", redirect: false };
    }

    componentDidMount() {
        this.setState({ info: "", redirect: false });
        account()
            .then(res => {
                this.setState({ info: JSON.stringify(res.data) });
            })
            .catch(er => {
                if (er.response) {
                    this.setState({ info: er.response.data });
                }
                else {
                    this.setState({ info: er.message });
                }
                setTimeout(() => {
                    this.setState({ redirect: true })
                }, 2000)
            });
    }


    onLoggOutClick = () => {
        localStorage.clear();
        this.setState({ info: "", redirect: false });
    }

     renderAccountInfo = () => {
        if (this.state.redirect)
            return <Redirect to='/login' />;
        if (this.state.info === "") {
            return (
                <div className="d-flex justify-content-center align-items-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <div className="text-center">
                    <h2>Account info</h2>
                    <div className="alert alert-primary" role="alert">{this.state.info}</div><br />
                    <Link to="/login">
                        <button type="button" className="btn btn-danger" onClick={this.onLoggOutClick}>Log out</button>
                    </Link>
                </div>
            </div>
        );
    }

    render() {
        return this.renderAccountInfo();
    }
}


export default AccountComponent;