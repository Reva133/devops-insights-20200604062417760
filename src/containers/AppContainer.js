import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch'
import ZipResponse from '../components/ZipResponse';
import Zip from '../components/Zip';

function AppContainer(props) {

    const [responseData, setResponseData] = useState('');

    const handleZipChange = async (zipValue) => {
        //console.log(`--------- fetchData called zip:${zipValue}`)
        
        const zipCodePattern = /^\d{5}$/;
        const cityName = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
        
        const validCity = cityName.test(zipValue);
        const validZip = zipCodePattern.test(zipValue);
        
        if(validZip){
        	const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?appid=6b7b471967dd0851d0010cdecf28f829&units=imperial&zip=${zipValue},us`)
        	const json = await res.json()
        	//console.log(json);
        	setResponseData(json);
        }
        else if(validCity){
        	const res = await fetch(`api.openweathermap.org/data/2.5/weather?q=${zipValue},nz&appid=6b7b471967dd0851d0010cdecf28f829`)
        	const json = await res.json()
        	setResponseData(json);
        }
        else{
        	alert('something went wrong');
        }        
    }

    const clearResponse = () => {
        setResponseData('');
    }


//	function setRadioButton(event){
//		if(event.id ='nz'){
//			//document.getElementById('us').checked = false;
//			alert('help');
//		}
//		else{
//			//document.getElementById('nz').checked = false;
//			alert('help');
//		}
//	}
	
    return (
        <div>
            <div className="row mt-4">
                <div className="col-sm-4"></div>
                <Zip onZipChange={handleZipChange} clearResponse={clearResponse}/>
                
//                <div id="optionGroup">
//	                <input type = "radio" id ="us" name = "usa" onclick ={setRadioButton(this)}></input>
//	            	<label for="us">US Zip Codes</label>
//	            
//	            	<input type = "radio" id ="nz" name = "new" onclick ={setRadioButton(this)}></input>
//	            	<label for="nz">NZ Zip Codes</label>
//                </div>
                
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
