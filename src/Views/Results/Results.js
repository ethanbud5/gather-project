import React, { Component } from 'react';
import SubNavbar from "./../../Components/SubNavbar/SubNavbar";
import ReactTable from "react-table";
import 'react-table/react-table.css'
import Axios from 'axios';
import "./Results.css";
import converter from "json-2-csv";
import moment from "moment";



class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profiles: [],
            headerNames:{
                custom_1:"Custom 1",
                custom_2:"Custom 2",
                custom_3:"Custom 3",
            },
            profilesCSV:[]
        }
        this.createCSVFile = this.createCSVFile.bind(this);
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

    createCSVFile(){
        let profilesForCSV = this.state.profiles.map((profile,i)=>{
            profile={...profile}
                profile[this.state.headerNames.custom_1] = profile.custom_1;
                profile[this.state.headerNames.custom_2] = profile.custom_2;
                profile[this.state.headerNames.custom_3] = profile.custom_3;
                profile.date_entered = moment(profile.date_entered).toISOString()
                delete profile.custom_1;
                delete profile.custom_2;
                delete profile.custom_3;
                delete profile.date_created;
                delete profile.date_finished;
                delete profile.title;
            return profile;
        })
        var options = {
            delimiter : {
                wrap  : '"' // Double Quote (") character
                // field : ',', // Comma field delimiter
                // array : ';', // Semicolon array value delimiter
                // eol   : '\n' // Newline delimiter
            }
        };
        
        function json2csvCallback(err,csvData){
            // console.log("Error: ",err)
            // console.log("CSV: ",csv)
            var data, filename, link;
            var csv = csvData;
            if (csv == null) return;
             
            filename = 'profiles.csv';
             
            if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
            }
            data = encodeURI(csv);
             
            link = document.createElement('a');
            link.setAttribute('href', data);
            link.setAttribute('download', filename);
            link.click();
        }
        converter.json2csv(profilesForCSV,json2csvCallback,options)
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
            Header: "ST", // Custom header components!
            accessor: 'state',
            width:40
          },
           {
            Header: "Zip", // Custom header components!
            accessor: 'zip',
            width: 70
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
                <div className="export_btn_container">
                <button onClick={this.createCSVFile}>Download CSV File</button>
                </div>
                <div className="table_container">
                    <ReactTable
                        data={this.state.profiles}
                        columns={columns}
                        className="-striped -highlight"
                    />
                </div>
            </div>
        );
    }
}

export default Results;