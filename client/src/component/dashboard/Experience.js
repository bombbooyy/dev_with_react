import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteExp } from '../../actions/profileAction';
import PropTypes from 'prop-types';

class Experience extends Component {

	deleteClick(id) {
		this.props.deleteExp(id);
	};

	render() {
		const experience = this.props.experience.map(exp => (
				<tr key={exp._id}>
					<td>{exp.company}</td>
					<td>{exp.title}</td>
					<td><Moment format='YYYY-MM-DD'>{exp.from}</Moment> - <Moment format='YYYY-MM-DD'>{exp.to === null ? 'Now' : exp.to}</Moment></td>
					<td><button className='btn btn-danger' onClick={this.deleteClick.bind(this, exp._id)} name={exp._id}>Delete</button></td>
				</tr>
			));

		return(
			<div>
				<h4 className='mb-4'>Experience Credentials</h4>
				<table className='table'>
					<thead>
						<tr>
							<th>Company</th>
							<th>Title</th>
							<th>Years</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{experience}
					</tbody>	
				</table>
			</div>
			)
		

	};

}

Experience.propTypes = {
	deleteExp: PropTypes.func.isRequired
};

export default connect(null, { deleteExp })(Experience);