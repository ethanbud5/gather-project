import React, { Component } from 'react';
import SubNavbar from "./../../Components/SubNavbar/SubNavbar";
import { withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import axios from "axios";
import "./Map.css";
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";

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
            },
            showHeatMap:false
        }
        this.selectProfile = this.selectProfile.bind(this);
        this.resetMap = this.resetMap.bind(this);
        this.toggleHeatMap = this.toggleHeatMap.bind(this);
    }
    
    componentDidMount(){
        axios.get("/api/profiles/"+this.props.match.params.id).then(res=>{
            // console.log(res.data);
            this.setState({
                profiles: res.data.profiles
            })
        }).catch(err=>console.log(err))
        axios.get("/api/route-auth?survey_id="+this.props.match.params.id).then(authRes=>{
            authRes = authRes.data
            // console.log(authRes ==="Authorized for survey")
            if(authRes==="Not Authorized!"){
                this.props.history.push("/");
            }
            else if(authRes==="Not Authorized for survey"){
                this.props.history.push("/surveys");
            }
            else if(authRes ==="Authorized for survey"){
            }
        })

    }
    fitBounds(map){
        if (!map) return;
        const bounds = new LatLngBounds();
        this.state.profiles.map(profile=>{
            const coords = new LatLng(parseFloat(profile.lat), parseFloat(profile.lng));
            bounds.extend(coords);
            return profile
        })
    // console.log(map)

        map.fitBounds(bounds);
    }
    selectProfile(id,coords){
        document.getElementById(id).scrollIntoView()
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
    toggleHeatMap(){
        this.setState({
            showHeatMap:!this.state.showHeatMap,
            profileActive: null,
            activeCords:{
                lat:null,
                lng:null
            }
        })
    }
    render() {
        // console.log(this.state)
        let markers = this.state.profiles.map(profile=>(
            <Marker 
               position={{ lat: +profile.lat, lng: +profile.lng }}
               onClick={()=>this.selectProfile(profile.profile_id,{lat:profile.lat,lng:profile.lng})}
            //    onClick={()=>console.log({ lat: +profile.lat, lng: +profile.lng })}
               key={profile.profile_id}
           />
        ))
        let heatMapData = this.state.profiles.map(profile=>{
            return new LatLng(profile.lat,profile.lng);
        })
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
            {(this.state.showHeatMap)?
                <HeatmapLayer data={heatMapData}/>
                : markers
        }
                
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
             <div key={profile.profile_id} id={profile.profile_id} className={(this.state.profileActive === profile.profile_id)?"profile_card_map active_profile_map":"profile_card_map"} onClick={()=>this.selectProfile(profile.profile_id,{lat:profile.lat,lng:profile.lng})}>
                <h1>{profile.name}</h1>
                <p>{profile.address}</p>
             </div>
         ))
        return (
            <div>
                <SubNavbar path="/map" id={this.props.match.params.id} history={this.props.history}/>
                {(this.state.profiles.length ===0)? <div className="no_map_data">No Data for Map</div>:
                <div className="map_container">
                    <div className="left_side_map">
                    <div className="map_btn_container">
                        <button onClick={this.resetMap} className="reset_map_btn">Reset Map</button>
                        <button onClick={this.toggleHeatMap} className="reset_map_btn">Toggle Heatmap</button>
                    </div>
                        {sideInfo}
                    </div>
                    <div className="right_side_map">
                        <GoogleMapExample
                            containerElement={ <div style={{ height: `100%`, width: '100%' }} /> }
                            mapElement={ <div style={{ height: `100%` }} /> }
                        />
                    </div>
                </div>}
            </div>
        );
    }
}

export default Map;