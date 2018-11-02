import React, { Component } from 'react';
import ListCanvassers from '../ListCanvassers/ListCanvassers';
import Axios from 'axios';

class AdvanceCanvassers extends Component {
    constructor(props) {
        super(props);
        this.state={
            canvassers:[]
        }
    }
    componentDidMount(){
        Axios.get("/api/canvassers/"+this.props.advance_id).then(res=>{
            this.setState({canvassers:res.data})
        })
    }
    selectCanvasser(){
        return null;
    }
    
    render() {
        console.log(this.state)
        return (
            <div>
                    <ListCanvassers selectCanvasser={this.selectCanvasser} showAdvancedCanvassers={true} filteredCanvassers={this.state.canvassers}/>
                    {/* TODO: Add a canvasser view when name is clicked */}
            </div>
        );
    }
}

export default AdvanceCanvassers;