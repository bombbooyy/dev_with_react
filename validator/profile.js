const Validator = require('validator');
const isEmpty = require('./isEmpty');

const validateProfileInput = (data) => {
	const errors = {};

	data.handle = isEmpty(data.handle) ? "" : data.handle;
	data.location = isEmpty(data.location) ? "" : data.location;
	data.status = isEmpty(data.status) ? "" : data.status;
	data.skills = isEmpty(data.skills) ? "" : data.skills;

	if(!Validator.isLength(data.handle, {min: 2, max: 40})) errors.handle = "Handle must be between 2 & 40";
	if(Validator.isEmpty(data.handle)) errors.handle = "Handle is required";
	if(Validator.isEmpty(data.status)) errors.status = "status is required";
	if(Validator.isEmpty(data.skills)) errors.skills = "skills is required";

	return {
		errors, 
		isValid: !isEmpty(errors)
	};
}

module.exports = validateProfileInput;