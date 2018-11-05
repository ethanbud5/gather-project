import React, { Component } from 'react';
import SubNavbar from "./../../Components/SubNavbar/SubNavbar";
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import axios from "axios";
import "./Map.css"

const { LatLng, LatLngBounds } = window.google.maps;

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profiles:[],
            profileActive:null,
            activeCords:{
                lat:null,
                lng:null
            }
        }
        this.selectProfile = this.selectProfile.bind(this);
        this.resetMap = this.resetMap.bind(this);
    }
    
    componentDidMount(){
        axios.get("/api/profiles/"+this.props.match.params.id).then(res=>{
            console.log(res.data);
            this.setState({
                profiles: res.data.profiles
            })
        }).catch(err=>console.log(err))
    }
    fitBounds(map){
        if (!map) return;
        const bounds = new LatLngBounds();
        this.state.profiles.map(profile=>{
            const coords = new LatLng(parseFloat(profile.lat), parseFloat(profile.lng));
            bounds.extend(coords);

        })
    // console.log(map)

        map.fitBounds(bounds);
    }
    selectProfile(id,coords){
        this.setState({
            profileActive:id,
            activeCords:{
                lat:coords.lat,
                lng:coords.lng
            }
        })
    }
    resetMap(){
        this.setState({
            profileActive: null,
            activeCords:{
                lat:null,
                lng:null
            }
        })
    }
    render() {
        console.log(this.state)
        let markers = this.state.profiles.map(profile=>(
            <Marker 
               position={{ lat: +profile.lat, lng: +profile.lng }}
               onClick={()=>console.log({ lat: +profile.lat, lng: +profile.lng })}
               key={profile.profile_id}
           />
        ))
        const GoogleMapExample = withGoogleMap(props => {
            return (this.state.profileActive)?
             <GoogleMap
              defaultCenter = { { lat: +this.state.activeCords.lat, lng: +this.state.activeCords.lng } }
              defaultZoom = { 20 }
            //   ref={(map)=>this.fitBounds(map)}
            >
            {markers}
             {/* <Marker 
                position={{ lat: 40.756795, lng: -73.954298 }}
            >
                <InfoWindow>
                    <h1>Hey</h1>
                </InfoWindow>
            </Marker> */}
            </GoogleMap>
            
            :
             <GoogleMap
              defaultCenter = { { lat: 40.756795, lng: -86.2196937 } }
              defaultZoom = { 13 }
              ref={(map)=>this.fitBounds(map)}
            >
            {markers}
             {/* <Marker 
                position={{ lat: 40.756795, lng: -73.954298 }}
            >
                <InfoWindow>
                    <h1>Hey</h1>
                </InfoWindow>
            </Marker> */}
            </GoogleMap>
        
         });
         let sideInfo = this.state.profiles.map(profile=>(
             <div key={profile.profile_id} className={(this.state.profileActive === profile.profile_id)?"profile_card_map active_profile_map":"profile_card_map"} onClick={()=>this.selectProfile(profile.profile_id,{lat:profile.lat,lng:profile.lng})}>
                <h1>{profile.name}</h1>
                <p>{profile.address}</p>
             </div>
         ))
        return (
            <div>
                <SubNavbar path="/map" id={this.props.match.params.id} history={this.props.history}/>
                <div className="map_container">
                    <div className="left_side_map">
                    <button onClick={this.resetMap}>Reset Map</button>
                        {sideInfo}
                    </div>
                    <div className="right_side_map">
                        <GoogleMapExample
                            containerElement={ <div style={{ height: `88vh`, width: '100%' }} /> }
                            mapElement={ <div style={{ height: `100%` }} /> }
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Map;