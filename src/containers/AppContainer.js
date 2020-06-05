import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch'
import ZipResponse from '../components/ZipResponse';
import Zip from '../components/Zip';


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

	const handlePointChange = async (lng,lat) => {
		const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=6b7b471967dd0851d0010cdecf28f829`)
		onst json = await res.json()
        setResponseData(json);
	}

	
	
	
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
                <div className="col-sm-2"></div>
            </div>    
        </div>
    );
}
  
export default AppContainer
