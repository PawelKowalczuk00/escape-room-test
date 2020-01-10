import React from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const RoomsComponent = () => {
    return (
        <div>
            <Link to="/calendar">
                <div className="btn btn-light">Reserve a room now!</div>
            </Link>
            <div>
            <p className="lead">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                 Suspendisse tempor sapien quis risus gravida, sed malesuada sapien semper.
                 Praesent blandit sem dolor, sit amet finibus orci scelerisque ut.
                 Pellentesque tincidunt laoreet lorem eget congue.
                 Nullam pulvinar ut magna ut consectetur.
                 Donec sollicitudin ligula vitae ipsum tempor sollicitudin.
                 Nam ut tempus magna.
            </p>
            </div>
        </div>
    );
}

export default RoomsComponent;