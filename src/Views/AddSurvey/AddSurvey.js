import React, { Component } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import "./AddSurvey.css"

class AddSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campaigns:[],
            customInputView:false,
        }
        this.showCustomFields = this.showCustomFields.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }

    showCustomFields(){
        this.setState({customInputView:!this.state.customInputView})
    }
    inputChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    render() {
        return (
            <div>
                <Navbar path="/campaigns" history={this.props.history}/>
                {this.state.customInputView?
                            <div className="add_survey_container">
                                <h2>
                                    Name Custom Fields
                                </h2>
                                <div className="input_container">
                                    <div className="inner_flex_inputs_campaigns">
                                        <label>Name</label>
                                        <input className="input_wide" type="text" name="name" placeholder="Name"  />
                                    </div>
                                    <div className="inner_flex_inputs_campaigns">
                                        <label>Goal</label>
                                        <input className="input_wide" type="number" placeholder="Goal" />
                                    </div>
                                </div>
                                <div className="add_survey_btn_container">
                                    <button className="next_btn" onClick={this.showCustomFields}>Back</button>
                                    <button className="next_btn" onClick={this.showCustomFields}>Create</button>
                                </div>
                            
                        </div>
                            :
                            <div className="add_survey_container">
                        <h2>
                            Create New Survey
                        </h2>
                        <div className="input_container">
                            <div className="inner_flex_inputs_campaigns">
                                <label>Name</label>
                                <input className="input_wide" type="text" name="name" placeholder="Name"  />
                            </div>
                            <div className="inner_flex_inputs_campaigns">
                                <label>Goal</label>
                                <input className="input_wide" type="number" placeholder="Goal" />
                            </div>
                        </div>
                        <div className="add_survey_btn_container">
                            <button className="cancel_btn" onClick={()=>this.props.history.push("/campaigns")}>Cancel</button>
                            <button className="next_btn" onClick={this.showCustomFields}>Next</button>
                        </div>
                        
                    </div>
                }
            </div>
        );
    }
}

export default AddSurvey;