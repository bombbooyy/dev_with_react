import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';

class PostFeed extends Component {
	render() {
		const { posts } = this.props;

		const postshow = posts.map(post => (<PostItem key={post._id} post={post} />))

		return (
			<div>
				{postshow}
			</div>
		);
	}
}

PostFeed.propTypes = {
	posts: PropTypes.array.isRequired
};

export default PostFeed;