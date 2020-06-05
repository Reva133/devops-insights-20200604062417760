import React, { useState } from 'react';

function Zip(props) {

    const [validationError, setValidationError] = useState(null);

    const validate = (event) => {
    	console.log(event.target.value);
        const cityName = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
        const validCity = cityName.test(event.target.value);

		if(!validCity) {//valid city code
        	setValidationError('* should be city name');
            props.clearResponse();
        }else {
            setValidationError('');
        	props.onCityChange(event.target.value);
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
                        placeholder="NZ City Name"
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