 import axios from 'axios';

 import { SET_CURRENT_USER, 
 		  GET_PROFILE, 
 		  PROFILE_LOADING, 
 		  GET_ERRORS, 
 		  CLEAR_CURRENT_PROFILE, 
 		  GET_PROFILES } from './types';

 //Get current profile

 export const getCurrentProfile = () => dispatch => {
 	dispatch(setProfileLoading());
 	axios.get('/api/profile')
 	.then(res =>
 		dispatch({
 			type: GET_PROFILE,
 			payload: res.data
 		}) 
 	)
 	.catch(err => 
 		dispatch({
 			type: GET_PROFILE,
 			payload: {}
 		})
 	);
 };

//Get userid profile

 export const getIdProfile = (id) => dispatch => {
 	dispatch(setProfileLoading());
 	axios.get(`/api/profile/user/${id}`)
 	.then(res =>
 		dispatch({
 			type: GET_PROFILE,
 			payload: res.data
 		}) 
 	)
 	.catch(err => 
 		dispatch({
 			type: GET_PROFILE,
 			payload: null
 		})
 	);
 };

  //Get all profile

 export const getProfiles = () => dispatch => {
 	dispatch(setProfileLoading());
 	axios.get('/api/profile/all')
 	.then(res =>
 		dispatch({
 			type: GET_PROFILES,
 			payload: res.data
 		}) 
 	)
 	.catch(err => 
 		dispatch({
 			type: GET_PROFILES,
 			payload: null
 		})
 	);
 };

//Create Profile
export const createProfile = (profileData, history) => dispatch => {
	axios.post('/api/profile', profileData)
	.then(res => history.push('/dashboard'))
	.catch(err => 
		dispatch({
		type: GET_ERRORS,
		payload: err.response.data
	})
	);
};

//Delete account
export const deleteProfile = () => dispatch => {
	if(window.confirm('Are You sure??')) {
		axios.delete('/api/profile')
		.then(res => {
			dispatch({
			type: SET_CURRENT_USER,
			payload: {}
			});
			dispatch(clearProfile());	
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		});
	}	
}

//Add experience 
export const addExp = (exp, history) => dispatch => {
	axios.post('/api/profile/exp', exp)
	.then(res => {
		history.push('/dashboard');
	})
	.catch(err => dispatch({
		type: GET_ERRORS,
		payload: err.response.data
	})
	);
};

//Delete experience 
export const deleteExp = (exp_id) => dispatch => {
	axios.delete(`/api/profile/exp/${ exp_id }`)
	.then(res => {
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		})
	})
	.catch(err => dispatch({
		type: GET_ERRORS,
		payload: err.response.data
	})
	);
};

//Add education 
export const addEdu = (edu, history) => dispatch => {
	axios.post('/api/profile/edu', edu)
	.then(res => {
		history.push('/dashboard');
	})
	.catch(err => dispatch({
		type: GET_ERRORS,
		payload: err.response.data
	})
	);
};

//Delete education 
export const deleteEdu = (edu_id) => dispatch => {
	axios.delete(`/api/profile/edu/${ edu_id }`)
	.then(res => {
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		})
	})
	.catch(err => dispatch({
		type: GET_ERRORS,
		payload: err.response.data
	})
	);
};

export const clearCurrentProfile = () => dispatch => {
	dispatch(clearProfile());
}

 //Profile loading 
 export const setProfileLoading = () => {
 	return {
 		type: PROFILE_LOADING
 	};
 };

 //clear profile
 export const clearProfile = () => {
 	return {
 		type: CLEAR_CURRENT_PROFILE
 	};
 };