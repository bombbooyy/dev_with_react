import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import { addEdu } from '../../actions/profileAction';

class AddExp extends Component {
	constructor(props){
		super(props);

		this.state = {
			school: '',
			degree: '',
			department: '',
			errors: '',
			from: '',
			to: '',
			current: false,
			disabled: false,
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCheck = this.onCheck.bind(this);

	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.errors){
			this.setState({
			errors: nextProps.errors
			});
		}
	};

	onChange (e) {
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit (e) {
		e.preventDefault();
		const edu = {
			school: this.state.school,
			degree: this.state.degree,
			department: this.state.department,
			from: this.state.from,
			to: this.state.to
		};
		this.props.addEdu(edu, this.props.history);
	}

	onCheck() {
		this.setState({
			disabled: !this.state.disabled,
			current: !this.state.current
		});
	}



	render() {
		const { errors } = this.state;

		return (
			<div className='AddEdu'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-8 m-auto'>
							<Link to="/dashboard" className="btn btn-light">Go Back</Link>
							<h1 className='display-4 text-center'>Add Education</h1>
							<p className='lead text-center'>Add any educatoin that you have had in the past or current</p>
							<small className='d-block pb-3'>* = required field</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder='* School' 
									name='school' 
									value={this.state.school} 
									onChange={this.onChange} 
									error={errors.school} 
								/>
								<TextFieldGroup
									placeholder='* Degree'  
									name='degree' 
									value={this.state.degree} 
									onChange={this.onChange} 
									error={errors.degree} 
								/>
								<TextFieldGroup
									placeholder='* Department' 
									name='department' 
									value={this.state.department} 
									onChange={this.onChange} 
									error={errors.department} 
								/>
								<h6>*From Date</h6>
								<TextFieldGroup
									name='from' 
									type='date' 
									value={this.state.from} 
									onChange={this.onChange} 
									error={errors.from} 
								/>
								<h6>To Date</h6>
								<TextFieldGroup
									name='to' 
									type='date' 
									value={this.state.to} 
									onChange={this.onChange} 
									error={errors.to} 
									disabled={this.state.disabled ? 'disabled' : ''}
								/>
								<div className='form-check mb-4'>
									<input 
										type='checkbox' 
										className='form-check-input' 
										name='current' 
										value={this.state.current} 
										checked={this.state.current} 
										onChange={this.onCheck} 
										id='current'
									/>
									<label htmlFor='current' className='form-check-label'>
										Current Job
									</label>
								</div>
								<input type='submit' value='Submit' className='btn btn-light' />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
};


AddExp.propTypes = {
	addEdu: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors
})

export default connect(mapStateToProps, { addEdu })(withRouter(AddExp));