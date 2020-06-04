import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch'
import ZipResponse from '../components/ZipResponse';
import Zip from '../components/Zip';
import  {GoogleMap, withScriptjs, withGoogleMap} from "react-google-maps";

function AppContainer(props) {

    const [responseData, setResponseData] = useState('');

    const handleCityChange = async (cityName) => {
        console.log(`--------- fetchData called zip:${cityName}`)

        	const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},nz&units=metric&appid=6b7b471967dd0851d0010cdecf28f829`)
        	const json = await res.json()
        	setResponseData(json);
    }

    const clearResponse = () => {
        setResponseData('');
    }


	function Map(){
		return (
		<GoogleMap 
			defaultZoom={10}
			defaultCenter={{lat:45.421532, lng: -75.697189}}
		/>
		);
	}
	
	const WrappedMap = withScriptjs(withGoogleMap(Map));
	
    return (
        <div>
            <div className="row mt-4">
                <div className="col-sm-4"></div>
                <Zip onCityChange={handleCityChange} clearResponse={clearResponse}/>
                

                
                <div className="col-sm-4"></div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-2"></div>
                <ZipResponse responseData={responseData} clearResponse={clearResponse}/>
                <div style={{width: "50vw", height: "50vh"}}>
                	<WrappedMap
                		googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAUNURf1KG8hsq2Tr2flFVyGvxmptuVymc'}
                		loadingElement={<div style={{height:"100%"}} />}
                		containerElement={<div style={{height:"100%"}} />}
                		mapElement={<div style={{height:"100%"}} />}
                	/>
                </div>
                <div className="col-sm-2"></div>
            </div>    
        </div>
    );
}
  
export default AppContainer
