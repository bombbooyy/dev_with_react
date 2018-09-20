const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateExpInput(data) {
	let errors = {};
	data.title = isEmpty(data.title) ? "" : data.title;
	data.company = isEmpty(data.company) ? "" : data.company;
	data.from = isEmpty(data.from) ? "" : data.from;
	data.location = isEmpty(data.location) ? "" : data.location;

	if(Validator.isEmpty(data.title)) errors.title = "title is required";
	if(Validator.isEmpty(data.company)) errors.company = "company is required";
	if(Validator.isEmpty(data.from)) errors.from = "from is required";
	if(Validator.isEmpty(data.location)) errors.location = "location is required";

	return {
		errors,
		isValid: !isEmpty(errors)
	};
};