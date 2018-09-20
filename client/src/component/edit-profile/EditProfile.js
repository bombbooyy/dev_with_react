import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectFieldGroup from '../common/SelectFieldGroup';
// import InputGroup from '../common/InputGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileAction';
import { withRouter } from 'react-router-dom';
import isEmpty from '../../validator/isEmpty';

class CreateProfile extends Component { 
	constructor(props) {
		super(props);

		this.state  = {
			handle: '',
			location: '',
			status: '',
			githubusername: '',
			bio: '',
			skills: '',
			errors: ''
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	componentDidMount() {
		this.props.getCurrentProfile();
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.errors)
			this.setState({errors: nextProps.errors});
		if(nextProps.profile.profile){
			let newProfile = nextProps.profile.profile;
			const skillCSV = newProfile.skills.join(',');
			delete newProfile.skills;

			newProfile.location = isEmpty(newProfile.location) ? '' : newProfile.location;
			newProfile.githubusername = isEmpty(newProfile.githubusername) ? '' : newProfile.githubusername;
			newProfile.bio = isEmpty(newProfile.bio) ? '' : newProfile.bio;
			this.setState({...newProfile, skills: skillCSV});
		}
	}

	onSubmit(e) {
		e.preventDefault();

		const profileData = {
			...this.state
		};
		delete profileData.errors;
		this.props.createProfile(profileData, this.props.history);
	};

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
	};

	render() {
		const { errors } = this.state;

		const options = [
			{ label: '* Select Professional Status', value: 0 },
			{ label: 'Developer', value: 'Developer' },
			{ label: 'Junior Developer', value: 'Junior Developer' },
			{ label: 'Manager', value: 'Manager' },
			{ label: 'Student or Learning', value: 'Student or Learning' },
			{ label: 'Other', value: 'Other' },
		];

		return (
			<div className='create-profile'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-8 m-auto'>
							<h1>Create Your Profile</h1>
							<small className='d-block pb-3'>* = required fields</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder='*Profile Handle' 
									name='handle' 
									value={this.state.handle} 
									onChange={this.onChange} 
									error={errors.handle} 
									info='A unique handle for your profile.'
								/>
								<SelectFieldGroup
									placeholder='Status' 
									name='status' 
									value={this.state.status} 
									onChange={this.onChange} 
									options={options} 
									error={errors.status} 
									info='An idea where you are in your career.'
								/>
								<TextFieldGroup
									placeholder='Location' 
									name='location' 
									value={this.state.location} 
									onChange={this.onChange} 
									error={errors.location} 
									info='City you live'
								/>
								<TextFieldGroup
									placeholder='*Skills' 
									name='skills' 
									value={this.state.skills} 
									onChange={this.onChange} 
									error={errors.skills} 
									info='Please use comma separated value(eg.C++,JavaScript)'
								/>
								<TextFieldGroup
									placeholder='Github Username' 
									name='githubusername' 
									value={this.state.githubusername} 
									onChange={this.onChange} 
									error={errors.githubusername} 
									info='If you have one.'
								/>
								<TextAreaFieldGroup
									placeholder='Short Bio' 
									name='bio' 
									value={this.state.bio} 
									onChange={this.onChange} 
									error={errors.bio} 
									info='Tell us a little about yourself.'
								/>
								<input type="submit" 
											style={{'marginLeft': '85%'}} 
											className='btn btn-lg btn-primary mt-4'/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	};

};

CreateProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
	errors: state.errors
});

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(CreateProfile));