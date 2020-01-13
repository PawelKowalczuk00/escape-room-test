import React from 'react';
import { roomsdates } from '../../functions/axiosSetup';
import Loader from '../LoaderComponent';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../../css/style.css';

import TableComponent from './TableComponent.js';

class CalendarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { terms: null, info: null };
    }
    week = 0;
    componentDidMount() {
        this.updateCalendar();
    }

    updateCalendar = () => {
        roomsdates(this.week)
            .then(res => {
                this.setState({ terms: res.data, info: null });
            })
            .catch(er => {
                console.log(er);
                if (er.response) {
                    this.setState({ terms: null, info: er.response.status + " " + er.response.statusText });
                }
                else {
                    this.setState({ terms: null, info: er.message });
                }
            });
    }

    fetchRoomsdates = () => {
        
    }

    incrementWeek = () => {
        if (this.week < 10) {
            this.week++;
            this.updateCalendar();
        }
        else
            this.setState({ info: "Can't reserve further" });
    }

    decrementWeek = () => {
        if (this.week > 0) {
            this.week--;
            this.updateCalendar();
        }
        else
            this.setState({ info: "Can't go into past..." });
    }

    renderTable = (start, end) => {
        if (this.state.terms === null) {
            return <Loader />
        }
        else
            return <TableComponent start={start} updateCalendar={this.updateCalendar} info={this.info} terms={this.state.terms} />
    }

    renderInfo = () => {
        if (this.state.info !== null) {
            return (
                <div className="alert alert-info" role="alert">
                    {this.state.info}
                </div>
            );
        }
    }

    info = (message) => {
        this.setState({ info: message });
    }

    render() {
        const start = new Date(Date.now() + this.week * 604800000);
        const end = new Date(Date.now() + 604800000 * (this.week + 1));
        return (
            <div>
                <div className="row">
                    <div className="container-fluid border-bottom d-flex align-items-start mb-3">
                        <h3 className="title">Make a reservation by clicking the free termin</h3>
                        <button className="btn btn-success refresh" onClick={this.updateCalendar}>Refresh</button>
                    </div>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <h4>Week: {start.toLocaleDateString()} - {end.toLocaleDateString()}</h4>
                    <button className="btn btn-success refresh" onClick={this.incrementWeek}><b>+</b></button>
                    <button className="btn btn-danger refresh" onClick={this.decrementWeek}><b>-</b></button>
                </div>
                {this.renderInfo()}
                {this.renderTable(start)}
            </div>
        );
    }
}

export default CalendarComponent;