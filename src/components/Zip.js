import React, { useState } from 'react';

function Zip(props) {

    const [validationError, setValidationError] = useState(null);

    const validate = (event) => {
        const zipCodePattern = /^\d{5}$/;
        const cityName = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
        const validCity = cityName.test(event.target.value);
        const validZip = zipCodePattern.test(event.target.value);
        
        if (validZip) {//valid zip code
            setValidationError('');
            props.onZipChange(event.target.value);
        }else if(validCity) {//valid city code
        	setValidationError('');
        	
        }else {
            setValidationError('* should be a 5 digit number only or city name');
            props.clearResponse();
        }
    };



    return (
        <div className="col-sm-4">
            <div className="row">
                <div className="col-sm-10">
                    
                    <style jsx="true">{`
                        .form-control::-webkit-input-placeholder {
                            color: #ddd;
                        }
                    `}
                    </style>
                    
                    
                    <input 
                        type="text" 
                        className="form-control" 
                        id="usr" 
                        placeholder="US Zip Code (5 digit) or NZ City Name"
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                            		validate(event);
                            }
                        }}
                    ></input>   
                    
                    
                </div>
            </div>
            <div className="pl-3 row">
                <div className="text-danger small"> { validationError }</div>
            </div>
        </div>
    );
}

export default Zip