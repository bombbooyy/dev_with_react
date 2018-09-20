import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteEdu } from '../../actions/profileAction';
import PropTypes from 'prop-types';

class Education extends Component {
	
	deleteClick(id) {
		this.props.deleteEdu(id);
	};

	render() {
		const education = this.props.education.map(edu => (
				<tr key={edu._id}>
					<td>{edu.school}</td>
					<td>{edu.degree}</td>
					<td><Moment format='YYYY-MM-DD'>{edu.from}</Moment> - <Moment format='YYYY-MM-DD'>{edu.to === null ? 'Now' : edu.to}</Moment></td>
					<td><button className='btn btn-danger' onClick={this.deleteClick.bind(this, edu._id)}>Delete</button></td>
				</tr>
			));

		return(
			<div>
				<h4 className='mb-4'>Education Credentials</h4>
				<table className='table'>
					<thead>
						<tr>
							<th>School</th>
							<th>Degree</th>
							<th>Years</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{education}
					</tbody>
				</table>
			</div>
			)
		

	};

}

Education.propTypes = {
	deleteEdu: PropTypes.func.isRequired
};

export default connect(null, { deleteEdu })(Education);