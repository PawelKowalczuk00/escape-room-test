import React from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import main from '../../img/main.png';

const HomeComponent = () => {
    return (
        <div className="flex-column align-items-center justify-content-center">
            <div>
                <img src={main} alt="" className="rounded mx-auto d-block" />
            </div>
            <div>
                <p className="lead text-justify">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                     Suspendisse tempor sapien quis risus gravida, sed malesuada sapien semper.
                     Praesent blandit sem dolor, sit amet finibus orci scelerisque ut.
                     Pellentesque tincidunt laoreet lorem eget congue.
                     Nullam pulvinar ut magna ut consectetur.
                     Donec sollicitudin ligula vitae ipsum tempor sollicitudin.
                     Nam ut tempus magna.
                     Curabitur hendrerit, sem ut semper tempus, tellus neque facilisis enim, vitae malesuada tellus
                      sapien sed mauris. Nullam ultrices turpis magna, at sagittis ligula tristique ac.
                      Nam imperdiet tincidunt finibus. Vestibulum quis viverra ex, a sollicitudin ante. Ves
                      tibulum porttitor, lectus luctus auctor posuere, ex nisi tristique ipsum, a tempus ve
                      lit leo non justo. Nunc pharetra justo nunc, maximus condimentum elit vehicula non. D
                      onec tincidunt tellus nec erat fermentum aliquet. Aliquam suscipit sagittis molestie.
                       Proin eu lectus gravida, euismod urna in, venenatis nisi. Vivamus pulvinar aliquet li
                       gula, varius sollicitudin est pulvinar ut.
                     Mauris sed nulla sit amet purus porttitor elementum. Mauris pharetra massa quis ante po
                     rttitor dapibus. Duis vel fermentum massa. Praesent dapibus blandit quam vel maximus. V
                     estibulum fermentum ullamcorper quam id varius. Donec convallis ante et turpis rhoncus
                      rhoncus. Donec quam velit, iaculis vel quam hendrerit, commodo tempor leo. Phasellus p
                      ellentesque vel elit quis tempor. Vestibulum vitae urna vitae elit iaculis dapibus.
                      Sed tincidunt orci et dolor pellentesque auctor. Pellentesque pulvinar varius erat, u
                      t pretium tellus vehicula nec. Cras rutrum enim vel diam bibendum, eu sodales enim te
                      mpus.
                </p>
            </div>
            <div>
                <Link to="/calendar">
                    <div className="btn btn-primary btn-lg btn-block">Reserve a room now!</div>
                </Link>
            </div>
        </div>
    );
}

export default HomeComponent;