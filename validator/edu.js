const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateEduInput(data) {
	let errors = {};
	data.school = isEmpty(data.school) ? "" : data.school;
	data.degree = isEmpty(data.degree) ? "" : data.degree;
	data.from = isEmpty(data.from) ? "" : data.from;
	data.department = isEmpty(data.department) ? "" : data.department;

	if(Validator.isEmpty(data.school)) errors.school = "school is required";
	if(Validator.isEmpty(data.degree)) errors.degree = "degree is required";
	if(Validator.isEmpty(data.from)) errors.from = "from is required";
	if(Validator.isEmpty(data.department)) errors.department = "department is required";

	return {
		errors,
		isValid: !isEmpty(errors)
	};
};