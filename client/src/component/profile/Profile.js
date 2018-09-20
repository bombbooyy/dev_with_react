import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getIdProfile } from '../../actions/profileAction';
import Spinner from '../common/spinner';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGit from './ProfileGit';

class Profile extends Component {


	componentDidMount() {
		if(this.props.match.params.id){
			this.props.getIdProfile(this.props.match.params.id);
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.profile.profile === null && this.props.profile.loading){
			this.props.history.push('/notfound');
		} else {
			this.props.profile.profile = nextProps.profile.profile;
		}
	}

	render() {
		const { profile, loading } = this.props.profile;
		let profileContent;

		if(profile === null || loading){
			profileContent = <Spinner />
		} else {
			profileContent = (
				<div>
					<div className='row'>
						<div className='col-md-6'>
							<Link to='/profiles' className='btn btn-light mb-3 float-left'>
									Back To Profiles
							</Link>
						</div>
						<div className='col-md-6'>
						</div>
					</div>
					<ProfileHeader profile={profile}/>
					<ProfileAbout profile={profile} />
					<ProfileCreds education={profile.education} experience={profile.experience} />
					<ProfileGit profile={profile} />
				</div>
			);
		}

		return (
			<div className='profile'>
				<div className='container'>
						<div className='col-md-12'>
							{profileContent}
						</div>
				</div>
			</div>
		);
	}
}


Profile.propTypes = {
	getIdProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile
});

export default connect(mapStateToProps, { getIdProfile })(Profile);