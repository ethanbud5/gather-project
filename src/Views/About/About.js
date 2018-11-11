import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import "./About.css";
import Footer from '../../Components/Footer/Footer';

function About(props) {

    return (
        <div>
            <Navbar path="/about" history={props.history}/>
            <div className="about_page_container">
                <div className="about_image">
                <div className="about_image_inside">
                    <h1>About</h1>
                </div>
                </div>
                <div className="about_body">
                    <h3>What</h3>
                    <p>
                        &nbsp;&nbsp;&nbsp;Gather is a canvassing tool used to gather and analyze data from door to door interactions. 
                        If you find yourself losing hard copies of survey results or struggling to make sense of out of your multiple spreadsheets
                        let Gather help you. This tool is designed to be accessable even for small companies, organizations, or individuals. With it's simple to use interface
                        and mobile-responsive design, this tool can change the way you do canvassing. 
                    </p>
                    <h3>How</h3>
                    <ul>
                        <li className="italic_text">Create a Survey.</li>
                        
                            <ul className="nested_ul">
                                <li>Click on Create New Survey.</li>
                                <li>Follow prompts to setup new Survey</li>
                                <li>Set a goal of number of Profiles to gather.</li>
                                <li>Name three custom fields for Survey. (NOTE: the three field types are text, integer, true or false. These cannot be changed.)</li>
                            </ul>
                        <li className="italic_text">Add a Campaign</li>
                            <ul className="nested_ul">
                                <li>Click on a Survey and go to the Campaign tab.</li>
                                <li>Create a new Campaign.</li>
                            </ul>
                        <li className="italic_text">Viewing/Adding Canvassers.</li>
                            <ul className="nested_ul">
                                <li>Manage Canvassers via the My Canvassers tab.</li>
                            </ul>
                        <li className="italic_text">Sending pin number to Canvassers.</li>
                            <ul className="nested_ul">
                                <li>In the Campaign tab click on the Campaign you would like to canvass for.</li>
                                <li>Then click on the Send Text Message button.</li>
                                <li>Next, select canvassers you would like to send Campaign Pin Number to.</li>
                                <li>Edit message as needed and press Send.</li>
                            </ul>
                        <li className="italic_text">Entering data as a Canvasser</li>
                            <ul className="nested_ul">
                                <li>On the home page click on Join Campaign.</li>
                                <li>Enter Pin Number received via text message.</li>
                                <li>Next, enter name and phone number.</li>
                                <li>You are then able to input data and view your recently added Profiles.</li>
                            </ul>
                        <li className="italic_text">Finishing Campaign</li>
                            <ul className="nested_ul">
                                <li>When finished gathering data for a particular Campaign you have the option to finish Campaign</li>
                                <li>This can be done by click Finish Campaign on Campaign tab.</li>
                                <li>Finishing a Campaign will make the Pin Number associated with it no longer work.</li>
                            </ul>
                    </ul>
                    <h3>Glossary</h3>
                    
                        <ul>
                            <li><span className="bold_text">Survey</span>  -  create a survey specifying a name, the unqiue data you want collected, and a goal</li>
                            <li><span className="bold_text">Campaign</span>  -  a particular advance of the survey. could by a particular day or place</li>
                            <li><span className="bold_text">Canvasser</span>  -  the people that will be gathering and inputting the data</li>
                            <li><span className="bold_text">Profile</span>  -  the individual data collected i.e. people, businesses, etc.</li>
                            <li><span className="bold_text">Pin Number</span>  -  this is a unique number for every Campaign that Canvassers can use to join a Campaign</li>
                        </ul> 
                    
                    
                </div>
                {/* <footer>
                        <p>Copyright © 2018 Ethan Sanders</p>
                </footer> */}
                <Footer/>
            </div>
        </div>
    );

}
export default About;