import React, {Component} from 'react';
import { Marker, InfoWindow } from "react-google-maps";

class InfoWindowMap extends Component {

constructor(props){
	super(props);

	this.state = {
		isOpen: false
    }
    this.handleToggleClose = this.handleToggleClose.bind(this);

}

handleToggleOpen = () => {

	this.setState({
		isOpen: true
	});
}

handleToggleClose = () => {
	this.setState({
		isOpen: false
	});
}
render() {

return (
		<Marker
			key={this.props.profile.profile_id}
			position={{ lat: +this.props.profile.lat, lng: +this.props.profile.lng}}
			onClick={() => this.handleToggleOpen()}
		>

		{
			this.state.isOpen &&
		 <InfoWindow onCloseClick={()=>this.handleToggleClose()}>
            <div>
                <h1>{this.props.profile.name}</h1>
                <p>{this.props.profile.address}</p>
            </div>
		 </InfoWindow>
	 	}


		</Marker>

	)
}
}

export default InfoWindowMap;