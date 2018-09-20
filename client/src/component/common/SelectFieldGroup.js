import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectFieldGroup = ({
	name,
	placeholder,
	value,
	error,
	info,
	onChange,
	options
}) => {
	const option = options.map(e => (
		<option key={e.label} value={e.value}>{e.label}
		</option>
		)
	);

	return (
		<div className='form-group'>
			<select 
			className={classnames('form-control form-control-lg', {'is-invalid': error})}
			name={name} 
			value={value} 
			onChange={onChange} 
			>
				{option}
			</select>
			{info && <small className="form-text text-muted">{info}</small>}
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
		);
};

SelectFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	error: PropTypes.string,
	info: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	options: PropTypes.array.isRequired
}


export default SelectFieldGroup;
