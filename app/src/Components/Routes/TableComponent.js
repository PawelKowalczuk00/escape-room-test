import React from 'react';
import {isMobile} from 'react-device-detect';

import { reserve } from '../../functions/axiosSetup'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../css/style.css';

const weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

class TableComponent extends React.Component {
    constructor(props) {
        super(props);
        this.hoover = React.createRef();
    }

    onTermEnter = (e) => {
        let info = e.target.classList[1];
        this.hoover.current.style.display = "block";
        const date = new Date(e.target.dataset.term);
        this.hoover.current.innerHTML = `<b>${info.toUpperCase()}</b><br/>
                                        Day: ${date.toLocaleDateString()}<br/>
                                        At: ${date.toLocaleTimeString().substr(0, 5)}`;
    }
    onTermMove = (e) => {
        let pos = e.target.getBoundingClientRect();
        this.hoover.current.style.top = (pos.y - 60) + "px";
        this.hoover.current.style.left = (pos.x + e.target.clientWidth) + "px";
    }
    onTermLeave = (e) => {
        this.hoover.current.style.display = "none";
    }
    onTermClick = (e) => {
        let target = e.target;
        let info = e.target.classList[1];
        if (info === "occupied") {
            return this.props.info("This termin is occupied");
        }
        const UTCShifted = new Date(e.target.dataset.term);
        UTCShifted.setUTCHours(UTCShifted.getUTCHours());
        reserve({
            room: e.target.dataset.room,
            term: e.target.dataset.term
        })
            .then(res => {
                this.props.info(res.data);
                target.classList.add("occupied", "blue");
                target.classList.remove("free");
            })
            .catch(er => {
                console.log(er);
                if (er.response) {
                    this.props.info(er.response.data);
                }
                else {
                    this.props.info(er.message);
                }
            });
    }

    render() {
        let days = [this.props.start.valueOf()];
        for (let i = 1; i < 7; i++) {
            days.push(days[i - 1] + 86400000);
        }
        days = days.map(day => day = (new Date(day)));
        let occupiedTerms = this.props.terms.map(term => (new Date(term.term)).valueOf() + "@" + term.room);
        let userTerms = sessionStorage.getItem('bookings') || [];
        return (
            <div>
                <table className="table table-striped table-bordered table-responsive-md">
                    <tbody>
                        <tr>
                            <th scope="col">Term</th>
                            <th scope="col">Room 1</th>
                            <th scope="col">Room 2</th>
                            <th scope="col">Room 3</th>
                        </tr>
                        {days.map(day => {
                            return (
                                <tr>
                                    <th scope="row">
                                        {day.toLocaleDateString()} <b>{day.getDay() === 0 ? weekday[6] : weekday[day.getDay() - 1]}</b>
                                    </th>
                                    {[1, 2, 3].map(room => {
                                        return (
                                            <td>
                                                <div className="custom-flex">
                                                    {[6, 10, 14, 18, 22].map(hour => {
                                                        let isSunday = day.getDay() === 0;
                                                        let currentDate = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour);
                                                        let currentTerm = currentDate.valueOf() + "@" + room;
                                                        let isOccupied = occupiedTerms.includes(currentTerm) ? true : false;
                                                        let isSelf = userTerms.includes(currentTerm) ? "blue" : "red";
                                                        let isPast = currentDate <= Date.now();
                                                        let additionalClass = ((isSunday || isOccupied || isPast) ? "occupied " + isSelf : "free" + (isMobile ? "" : " hooverable"));
                                                        return (
                                                            <div className={"hour " + additionalClass}
                                                                data-term={currentDate}
                                                                data-room={room}
                                                                onMouseEnter={this.onTermEnter}
                                                                onMouseLeave={this.onTermLeave}
                                                                onMouseMove={this.onTermMove}
                                                                onClick={this.onTermClick}>
                                                                {hour}:00
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div ref={this.hoover} className="hoover"></div>
            </div>
        );
    }
}

export default TableComponent;
