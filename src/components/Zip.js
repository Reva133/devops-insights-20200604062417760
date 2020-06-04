import React, { useState } from 'react';

function Zip(props) {

    const [validationError, setValidationError] = useState(null);

    const validate = (event) => {
        const zipCodePattern = /^\d{5}$/;
        const valid = zipCodePattern.test(event.target.value);
        if (!valid) {
            setValidationError('* should be a 5 digit number only');
            props.clearResponse();
        } else {
            setValidationError('');
            props.onZipChange(event.target.value);
        }
    };

//Unchecks the opposing radio button
function switchRadioButtons(id){
	//radio buttons to know
	var usa = document.getElementById("us");
	var nz = document.getElementById("nz");
	
	if(id == "nz"){//if we have clicked on nz
		usa.checked = false;
	}
	else{//if we have clicked on us
		nz.checked = false;
	}
}
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
                        placeholder="US Zip Code (5 digit)"
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                validate(event);
                            }
                        }}
                    ></input>   
                    
                    <div id = "options">
                    	<input type = "radio" id ="us" name = "usa" onclick ="(function(){document.getElementById('nz').checked = false;})()">
                    	<label for="us">US Zip Codes</label>
                    	<input type = "radio" id ="nz" name = "new" onclick ="(function(){document.getElementById('us').checked = false;})()">
                    	<label for="nz">NZ Zip Codes</label>
                    </div>
                </div>
            </div>
            <div className="pl-3 row">
                <div className="text-danger small"> { validationError }</div>
            </div>
        </div>
    );
}

export default Zip