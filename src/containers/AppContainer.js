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

class Map extends Component {
  componentDidMount() {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 41.0082, lng: 28.9784 },
      zoom: 8
    });
  }

  render() {
    return (
      <div style={{ width: 500, height: 500 }} id="map" />
    );
  }
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
                <Map />
                <div className="col-sm-2"></div>
            </div>    
        </div>
    );
}
  
export default AppContainer
