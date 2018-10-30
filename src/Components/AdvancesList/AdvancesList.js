import React, { Component } from 'react';
import "./AdvancesList.css";

class AdvancesList extends Component {
    constructor(props){
        super(props)
        this.state = {
            advances:[]
        }
    }
    dateFormatter(date){
        let newDate = date.substring(0,10).split("-").reverse()
        let d = newDate[0];
        let m = newDate[1]
        newDate[0] = m;
        newDate[1] = d;
        return newDate.join("-");
    }

    render() {
        let list
        if(this.props.advances ==="No Advances"){
             list = <div className="no_advances">No Advances yet...</div>
        }else{
             list = this.props.advances.map(advance=>{
                return(
                    <div onClick={()=>this.props.selectAdvance(advance)} key={advance.advance_id} className="advance_list_card">
                        <div>{advance.title}</div>
                        <div>{this.dateFormatter(advance.date_created)}</div>
                    </div>
                )
            })
        }
        return (
            <div>
                <div className="create_advance_btn">
                    <button>Add New Advance <span className="big_plus">+</span></button>
                </div>
                <div className="advance_list_title">
                    <div>Title:</div>
                    <div>Date Created:</div>
                </div>
                {list}
            </div>
        );
    }
}

export default AdvancesList;