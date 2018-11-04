import React, { Component } from 'react';
import SubNavbar from "./../../Components/SubNavbar/SubNavbar";
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import Geocode from "react-geocode";
const { LatLng, LatLngBounds } = window.google.maps;


class Map extends Component {
    fitBounds(map){
        const bounds = new LatLngBounds();
            const coords1 = new LatLng(parseFloat(33.0446168), parseFloat(-86.1563089));
            bounds.extend(coords1);
            const coords2 = new LatLng(parseFloat(40.756795), parseFloat(-73.954298));
            bounds.extend(coords2);
    // console.log(map)

        map.fitBounds(bounds);
    }
    render() {
        // console.log(window.google.maps)
        let lat;
        let lng;
        Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
        Geocode.fromAddress("2235 Coosa County Rd 49, Goodwater").then(
        response => {
            const { lat, lng } = response.results[0].geometry.location;
            console.log(lat, lng);
        },
        error => {
            console.error(error);
        }
        );
        const GoogleMapExample = withGoogleMap(props => (
            <GoogleMap
              defaultCenter = { { lat: 40.756795, lng: -86.2196937 } }
              defaultZoom = { 13 }
              ref={(map)=>this.fitBounds(map)}
              
              
            //   ref={(map) => { console.log(map.fitBounds({ lat: -34.397, lng: 150.644 })) }}
            >
             <Marker 
                position={{ lat: 33.0446168, lng: -86.1563089 }}
                onClick={()=>console.log({ lat: 33.0446168, lng: -86.1563089 })}
            />
             <Marker 
                position={{ lat: 40.756795, lng: -73.954298 }}
            >
                <InfoWindow>
                    <h1>Hey</h1>
                </InfoWindow>
            </Marker>
            </GoogleMap>
         ));
        return (
            <div>
                <SubNavbar path="/map" id={this.props.match.params.id} history={this.props.history}/>
                <h1>Map</h1>
                <GoogleMapExample
                    containerElement={ <div style={{ height: `500px`, width: '100%' }} /> }
                    mapElement={ <div style={{ height: `100%` }} /> }
                />
            </div>
        );
    }
}

export default Map;