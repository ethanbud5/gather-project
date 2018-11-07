import React, { Component } from 'react';
import Navbar from "./../../Components/Navbar/Navbar";
import "./MyCanvassers.css"
import ListCanvassers from '../../Components/ListCanvassers/ListCanvassers';
import {connect} from "react-redux";
import {getCanvassers,selectCanvasser} from "./../../ducks/reducer";


class MyCanvassers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCanvasser:{}
        }
        // this.selectCanvasser = this.selectCanvasser.bind(this);
    }
    
    // selectCanvasser(canvasser){
    //     this.setState({selectedCanvasser:canvasser});
    // }

    componentDidMount(){
        this.props.getCanvassers();
        // this.setState({selectedCanvasser:this.props.canvassers[0]})
    }
    render() {
        // console.log('this.props: ', this.props);
        return (
            <div>
                <Navbar path="/canvassers" history={this.props.history}/>
                <div className="canvasser_view_container">
                    <div className="canvasser_left_box">
                        <ListCanvassers history={this.props.history} canvassers={this.props.canvassers} selectCanvasser={this.props.selectCanvasser}/>    
                    </div>
                </div>
            </div>
        )       
    }
}
function mapStateToProps(state){
    return{
        canvassers:state.canvassers,
        selectedCanvasser:state.selectedCanvasser
    }
}

export default connect(mapStateToProps,{getCanvassers,selectCanvasser})(MyCanvassers);