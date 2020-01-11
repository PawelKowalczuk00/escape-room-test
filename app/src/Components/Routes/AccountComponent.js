import React from 'react';
import { account } from '../../functions/axiosSetup';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

class AccountComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: "", redirect: false };
    }

    componentDidMount() {
        this.setState({ redirect: false })
        account()
            .then(res => {
                this.setState({ error: JSON.stringify(res.data) });
            })
            .catch(er => {
                if (er.response) {
                    this.setState({ error: er.response.data });
                }
                else {
                    this.setState({ error: er.message });
                }
                setTimeout(() => {
                    this.setState({ redirect: true })
                }, 2000)
            });
    }


    onLoggOutClick = () => {
        localStorage.clear();
        this.setState({ error: "", redirect: false });
    }

    render() {
        if (this.state.redirect)
            return <Redirect to='/login' />;
        return (
            <div>
                <div className="text-center">
                    <h2>Account info</h2>
                    <div className="alert alert-primary" role="alert">{this.state.error}</div><br />
                    <Link to="/login">
                        <button type="button" className="btn btn-danger" onClick={this.onLoggOutClick}>Log out</button>
                    </Link>
                </div>
            </div>
        );
    }
}


export default AccountComponent;