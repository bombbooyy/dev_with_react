import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
	name,
	placeholder,
	value,
	error,
	label,
	info,
	type,
	onChange,
	disabled
}) => {
	return (
		<div className='form-group'>
			<input 
			className={classnames('form-control form-control-lg', {'is-invalid': error})}
			type={type} 
			name={name} 
			value={value} 
			placeholder={placeholder} 
			onChange={onChange} 
			disabled={disabled} 
			label={label}
			/>
			{info && <small className="form-text text-muted">{info}</small>}
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
		);
};

TextFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	error: PropTypes.string,
	label: PropTypes.string,
	info: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.string
}

TextFieldGroup.defaultProps = {
	type: 'text'
};

export default TextFieldGroup;
