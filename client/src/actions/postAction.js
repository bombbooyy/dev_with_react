import axios from 'axios';
import { ADD_POST, 
				 GET_ERRORS, 
				 POST_LOADING, 
				 GET_POSTS, 
				 GET_POST, 
				 DELETE_POST, 
				 CLEAR_ERRORS} from './types';

//Add post
export const addPost = (postData) => dispatch => {
	axios.post('/api/posts', postData)
	.then(res => 
		dispatch({
			type: ADD_POST,
			payload: res.data
		})
	)
	.catch(err => 
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

//Get post
export const getPosts = () => dispatch => {
	dispatch(setPostLoading());

	axios.get('/api/posts')
	.then(res => 
		dispatch({
			type: GET_POSTS,
			payload: res.data
		})
	)
	.catch(err => 
		dispatch({
			type: GET_POSTS,
			payload: null
		})
	);
};

//Get post
export const getPost = (id) => dispatch => {
	dispatch(setPostLoading());

	axios.get(`/api/posts/${id}`)
	.then(res => 
		dispatch({
			type: GET_POST,
			payload: res.data
		})
	)
	.catch(err => 
		dispatch({
			type: GET_POST,
			payload: null
		})
	);
};

//Delete post
export const deletePost = (id) => dispatch => {
	axios.delete(`/api/posts/${id}`)
	.then(res => 
		dispatch({
			type: DELETE_POST,
			payload: id
		})
	)
	.catch(err => 
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

//Add likes
export const addLike = (id) => dispatch => {
	axios.post(`/api/posts/like/${id}`)
	.then(res => dispatch(getPosts()))
	.catch(err => dispatch({
		type: GET_ERRORS,
		payload: err.response.data
	}));
};

//remove likes
export const disLike = (id) => dispatch => {
	axios.post(`/api/posts/unlike/${id}`)
	.then(res => dispatch(getPosts()))
	.catch(err => dispatch({
		type: GET_ERRORS,
		payload: err.response.data
	}));
};

//Add comment
export const addComment = (commentData, post_id) => dispatch => {
	dispatch(clearErros());
	axios.post(`/api/posts/comment/${post_id}`, commentData)
	.then(res => dispatch({
			type: GET_POST,
			payload: res.data
		}))
	.catch(err => 
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

//Delete comment
export const deleteComment = (post_id, comment_id) => dispatch => {
	axios.delete(`/api/posts/comment/${post_id}/${comment_id}`)
	.then(res => 
		dispatch({
			type: GET_POST,
			payload: res.data
		})
	)
	.catch(err => 
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

//Set loading state
export const setPostLoading = () => ({
		type: POST_LOADING
})

//Clear errors
export const clearErros = () => ({
		type: CLEAR_ERRORS
})