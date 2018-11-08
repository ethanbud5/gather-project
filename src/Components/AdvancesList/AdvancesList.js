import React, { Component } from 'react';
import "./AdvancesList.css";
import Modal from "react-modal";
import Axios from 'axios';
import ReactTable from "react-table";
import "react-table/react-table.css";


class AdvancesList extends Component {
    constructor(props){
        super(props)
        this.state = {
            advances:[],
            showModal:false,
            input:""
        }
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.addAdvance = this.addAdvance.bind(this);
    }
    dateFormatter(date){
        let newDate = date.substring(0,10).split("-").reverse()
        let d = newDate[0];
        let m = newDate[1]
        newDate[0] = m;
        newDate[1] = d;
        return newDate.join("-");
    }
    addAdvance(){
        Axios.post("/api/advance",{
            title:this.state.input,
            campaign_id:this.props.campaign_id
        }).then(res=>{
            console.log(res.data)
            this.props.setNewAdvances(res.data);
            this.setState({showModal:false})
        }).catch((err)=>alert(err))
    }
    inputChange(value){
        this.setState({input:value})
    }
    closeModal(){
        this.setState({showModal:false})
    }
    openModal(){
        this.setState({showModal:true})
    }

    render() {
        // let list
        // if(this.props.advances ==="No Advances"){
        //      list = <div className="no_advances">No Campaigns yet...</div>
        // }else{
        //      list = this.props.advances.map(advance=>{
        //         return(
        //             <div onClick={()=>this.props.selectAdvance(advance)} key={advance.advance_id} className="advance_list_card">
        //                 <div>{advance.title}</div>
        //                 <div>{this.dateFormatter(advance.date_created)}</div>
        //             </div>
        //         )
        //     })
        // }
        const columns = [{
            Header: 'Title:',
            accessor: 'title' // String-based value accessors!
          }, {
            Header: 'Date Created:',
            accessor: 'date_created' // Custom cell components!
          }, {
            Header: 'Date Finished:',
            accessor: "date_finished"
          }]
        return (
            <div>
                <div className="create_advance_btn">
                    <button onClick={this.openModal}>Add New Campaign <span className="big_plus">+</span></button>
                </div>
                {/* <div className="advance_list_title">
                    <div>Title:</div>
                    <div>Date Created:</div>
                </div>
                <div className="advance_list_container"> */}
                    {/* {list} */}
                    <ReactTable
                        data={this.props.advances}
                        columns={columns}
                        defaultPageSize={5}
                        className="-striped -highlight"
                        getTdProps={(state, rowInfo, column, instance) => {
                            return {
                              onClick: (e, handleOriginal) => {
                                // console.log("A Td Element was clicked!");
                                // console.log("it produced this event:", e);
                                // console.log("It was in this column:", column);
                                // console.log("It was in this row:", rowInfo);
                                // console.log("It was in this table instance:", instance);
                                if(!rowInfo) return
                                this.props.selectAdvance(rowInfo.original)
                        
                                // IMPORTANT! React-Table uses onClick internally to trigger
                                // events like expanding SubComponents and pivots.
                                // By default a custom 'onClick' handler will override this functionality.
                                // If you want to fire the original onClick handler, call the
                                // 'handleOriginal' function.
                                if (handleOriginal) {
                                  handleOriginal();
                                }
                              }
                            };
                          }}
                    />
                {/* </div> */}
                <Modal 
                isOpen={this.state.showModal}
                ariaHideApp={false}
                onRequestClose={this.closeModal}
                className="modal_green"
                
                >
                    <div className="add_advance_container">
                        <h2>
                            Create New Campaign
                        </h2>
                        <input type="text" onChange={(e)=>this.inputChange(e.target.value)} placeholder="Enter Name..."/>
                        <div>
                            <button onClick={this.closeModal} className="gray_btn">Cancel</button>
                            <button onClick={this.addAdvance} className="gray_btn">Create</button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default AdvancesList;