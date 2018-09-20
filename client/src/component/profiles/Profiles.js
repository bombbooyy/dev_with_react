import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfiles, clearCurrentProfile } from '../../actions/profileAction';
import PropTypes from 'prop-types';
import Spinner from '../common/spinner';
import ProfileItem from './ProfileItem';

class Profiles extends Component {

	componentDidMount() {
		this.props.getProfiles()
		this.props.clearCurrentProfile();
	}


	render() {
		const { profiles, loading } = this.props.profile;
		let profileItems;

		if( profiles === null || loading )
			profileItems = <Spinner />
		else{
			if(profiles.length > 0) {
				profileItems = profiles.map(profile => (<ProfileItem key={profile._id} profile={profile} />))
			} else {
				profileItems = <h4>No profiles</h4>
			}
		}
		return (
			<div className='profiles'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12'>
							<h1 className='display-4 text-center'>Developer Profiles</h1>
							<p className='lead text-center'>
								Browse and connect with developers
							</p>
							{ profileItems }
						</div>
					</div>
				</div>
			</div>
		);
	};

};

Profiles.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	clearCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors
});


export default connect(mapStateToProps, { getProfiles, clearCurrentProfile })(Profiles);