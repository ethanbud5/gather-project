import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';

function About(props) {

    return (
        <div>
            <Navbar path="/about" history={props.history}/>
            <div>About Page </div>       
        </div>
    );

}
export default About;