import React from 'react';

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
        if (info === "free") {
            e.target.style.border = "1px groove darkblue";
            e.target.style.backgroundColor = "darkgreen";
            e.target.style.fontWeight = "800";
        }
        this.hoover.current.style.display = "block";
        const date = new Date(e.target.dataset.term);
        this.hoover.current.innerHTML = `<b>${info.toUpperCase()}</b><br/>
                                        Day: ${date.toLocaleDateString()}<br/>
                                        At: ${date.toLocaleTimeString().substr(0, 5)}`;
    }
    onTermMove = (e) => {
        this.hoover.current.style.top = e.pageY - 60 + "px";
        this.hoover.current.style.left = e.pageX + 5 + "px";
    }
    onTermLeave = (e) => {
        let info = e.target.classList[1];
        if (info === "free") {
            e.target.style.border = "1px solid lightskyblue";
            e.target.style.backgroundColor = "#90ee90";
            e.target.style.fontWeight = "600";
        }
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
                target.style.backgroundColor = "blue";
                target.style.color = "white";
                target.style.cursor = "not-allowed";
                target.classList.add("occupied", "red");
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
        target.style.backgroundColor = "yellow";
        target.style.color = "black";
        target.style.cursor = "not-allowed";
    }

    render() {
        let days = [this.props.start.valueOf()];
        for (let i = 1; i < 7; i++) {
            days.push(days[i - 1] + 86400000);
        }
        days = days.map(day => day = (new Date(day)));
        let occupiedTerms = this.props.terms.map(term => (new Date(term.term)).valueOf() + "@" + term.room);
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
                                                        let isSelf = sessionStorage.getItem('bookings').includes(currentTerm) ? "blue" : "red";
                                                        let additionalClass = (isSunday || isOccupied) ? "occupied " + isSelf : "free";
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
