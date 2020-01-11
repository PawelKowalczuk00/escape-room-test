import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import room_1 from '../../img/room_1.png';
import room_2 from '../../img/room_2.png';
import room_3 from '../../img/room_3.png';

const RoomsComponent = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-4">
                    <img src={room_1} alt="" className="img-fluid rounded mx-auto d-block" />
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
                <div className="col-lg-4">
                    <img src={room_2} alt="" className="img-fluid rounded mx-auto d-block" />
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
                <div className="col-lg-4">
                    <img src={room_3} alt="" className="img-fluid rounded mx-auto d-block" />
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
        </div>
    );
}

export default RoomsComponent;