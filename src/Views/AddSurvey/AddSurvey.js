import React, { Component } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import "./AddSurvey.css"

class AddSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campaigns:[],
            customInputView:false,
            custom1:"Custom 1",
            custom2:"Custom 2",
            custom3:"Custom 3",
            name:"",
            goal:0
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
                                        <label>Custom Field 1 Name <span className="small_text_survey">(field type: text)</span></label>
                                        <input className="input_wide" type="text" name="custom1" value={this.state.custom1} onChange={this.inputChange} placeholder="Custom 1"  />
                                    </div>
                                    <div className="inner_flex_inputs_campaigns">
                                        <label>Custom Field 2 Name <span className="small_text_survey">(field type: number)</span></label>
                                        <input className="input_wide" type="text" name="custom2" value={this.state.custom2} onChange={this.inputChange} placeholder="Custom 2"  />
                                    </div>
                                    <div className="inner_flex_inputs_campaigns">
                                        <label>Custom Field 3 Name <span className="small_text_survey">(field type: boolean)</span></label>
                                        <input className="input_wide" type="text" name="custom3" value={this.state.custom3} onChange={this.inputChange} placeholder="Custom 3"  />
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
                                <input className="input_wide" type="text" name="name" value={this.state.name} onChange={this.inputChange} placeholder="Name"  />
                            </div>
                            <div className="inner_flex_inputs_campaigns">
                                <label>Goal</label>
                                <input className="input_wide" name="goal" onChange={this.inputChange} value={this.state.goal} id="goal_input" type="number" placeholder="Goal" />
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