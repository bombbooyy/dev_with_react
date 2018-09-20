import React, { Component } from 'react';
import isEmpty from '../../validator/isEmpty';
import Moment from 'react-moment';

export default class ProfileCreds extends Component {
	render() {
		const { education } = this.props;
		const { experience } = this.props;

		const exp = experience.map((e) => (
			<li className="list-group-item" key={e._id}>
        <h4>{e.company}</h4>
        <p><Moment format='YYYY-MM'>{e.from}</Moment> - <Moment format='YYYY-MM'>{(e.to)===null ? 'Now' : e.to}</Moment></p>
        <p>
          <strong>Position:</strong> {e.title}
        </p>
        <p>
          <strong>Location:</strong> {e.location}
        </p>
        {isEmpty(e.description) ? null : (<p>
          <strong>Description:</strong> {e.description}</p>)}
      </li>
			))

		const edu = education.map((e) => (
			<li className="list-group-item" key={e._id}>
	      <h4>{e.school}</h4>
	      <p><Moment format='YYYY-MM'>{e.from}</Moment> - <Moment format='YYYY-MM'>{(e.to)===null ? 'Now' : e.to}</Moment></p>
	      <p>
	        <strong>Degree: </strong>{e.degree}</p>
	      <p>
	        <strong>Field Of Study: </strong>{e.department}</p>
	    </li>
			))



		return (
			<div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          <ul className="list-group">
            {exp}
          </ul>
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          <ul className="list-group">
            {edu}
          </ul>
        </div>
      </div>
		);
	}
}
