import React, { Component } from 'react';
import SubNavbar from "./../../Components/SubNavbar/SubNavbar";
import ReactTable from "react-table";
import 'react-table/react-table.css'
import Axios from 'axios';



class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profiles: [],
            headerNames:{
                custom_1:"Custom 1",
                custom_2:"Custom 2",
                custom_3:"Custom 3",
            }
        }
    }

    componentDidMount(){
        Axios.get("/api/profiles/"+this.props.match.params.id).then(res=>{
            console.log(res.data);
            this.setState({
                headerNames:res.data.custom,
                profiles: res.data.profiles
            })
        }).catch(err=>console.log(err))
    }
    
    render() {
        const columns = [{
            Header: 'Name',
            accessor: 'name' // String-based value accessors!
          }, {
            Header: 'Phone',
            accessor: 'phone' // Custom cell components!
          }, {
            Header: 'Email',
            accessor: "email"
          }, {
            Header: "Address", // Custom header components!
            accessor: 'address'
          },
           {
            Header: "City", // Custom header components!
            accessor: 'city'
          },
           {
            Header: "State", // Custom header components!
            accessor: 'state'
          },
           {
            Header: "Zip", // Custom header components!
            accessor: 'zip'
          },
           {
            id:"custom1",
            Header: this.state.headerNames.custom_1, // Custom header components!
            accessor: 'custom_1'
          },
           {
            id:"custom2",
            Header: this.state.headerNames.custom_2, // Custom header components!
            accessor: 'custom_2'
          },
           {
            id:"custom3",
            Header: this.state.headerNames.custom_3, // Custom header components!
            accessor: 'custom_3'
          },
          {
            Header: "Entered", // Custom header components!
            accessor: 'date_entered'
          }]
        return (
            <div>
                <SubNavbar path="/results" id={this.props.match.params.id} history={this.props.history}/>
                <ReactTable
                    data={this.state.profiles}
                    columns={columns}
                />
            </div>
        );
    }
}

export default Results;