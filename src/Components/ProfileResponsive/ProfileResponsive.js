import React, { Component } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import "./ProfileResponsive.css"
import Axios from 'axios';
import Moment from "react-moment";

class ProfileResponsive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerNames:{
                custom_1: "Custom 1",
                custom_2: "Custom 2",
                custom_3: "Custom 3"
            },
            profiles:[],
            tableCounter: 1,
            noData: true
        }
    }
    componentDidMount(){
        Axios.get("/api/recently-added").then(res=>{
            // console.log(res.data);
            if(!res.data.custom || !res.data.recentlyAdded){
                this.setState({noData:true})
            }
            else{
                this.setState({
                    headerNames:res.data.custom,
                    profiles:res.data.recentlyAdded,
                    tableCounter:this.state.tableCounter + 1,
                    noData:false
                })
            }
        }).catch(err=>{console.log(err)})
    }
    
    render() {
        console.log(this.state)
        // if(this.state.profiles)
        let profileRows = this.state.profiles.map((profile,i)=>{
        return <Tr key={i}>
            <Td>{profile.name}</Td>
            <Td>{profile.phone}</Td>
            <Td>{profile.email}</Td>
            <Td>{profile.address}</Td>
            <Td>{profile.city}</Td>
            <Td>{profile.state}</Td>
            <Td>{profile.zip}</Td>
            <Td>{profile.custom_1}</Td>
            <Td>{profile.custom_2}</Td>
            <Td>{profile.custom_3}</Td>
            <Td><Moment format="h:mm a MM-DD-YYYY">{profile.date_entered}</Moment></Td>
        </Tr>
        })
        return (
            <div className="responsive_profile_table_container">
            {(this.state.noData)?
                <div>No Profiles Added Yet</div>:
            
                <Table key={this.state.tableCounter}>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Phone</Th>
                            <Th>Email</Th>
                            <Th>Address</Th>
                            <Th>City</Th>
                            <Th>State</Th>
                            <Th>Zip</Th>
                            <Th>{this.state.headerNames.custom_1}</Th>
                            <Th>{this.state.headerNames.custom_2}</Th>
                            <Th>{this.state.headerNames.custom_3}</Th>
                            <Th>Entered</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {profileRows}
                    </Tbody>
                </Table>
            }   
            </div>
            
        );
    }
}

export default ProfileResponsive;