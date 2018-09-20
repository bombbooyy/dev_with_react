import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/spinner';
import { getPost } from '../../actions/postAction';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import PostItem from './PostItem';
// import Comments from './Comments';


class Post extends Component {

	componentWillMount() {
		this.props.getPost(this.props.match.params.id)
		console.log('1')
	}

	componentDidMount() {
		// this.props.getPost(this.props.match.params.id)
		console.log('2')
	} 

	render() {
		const { post, auth } = this.props;  
		console.log('3')
		let postContent;
		if(post.loading || (Object.keys(post.post).length === 0 && post.post.constructor === Object)){
			console.log('4')
			postContent = <Spinner />
		} else {
			console.log(post.post)
			console.log('5')
			postContent = (
				<div>
					<div className='post'>
						<PostItem post={post} auth={auth} />
					</div>
					<div className='comment'>
			      <CommentForm postId={this.props.match.params.id} />
			    </div>
			    <div className='commentFeed'>
			      <CommentFeed postId={post.post._id} comments={post.post.comments} />
			    </div>
		    </div>
			);
		}
 

		return (
			<div className="post">
		    <div className="container">
		      <div className="row">
		        <div className="col-md-12">
		        	<Link to='/feed' className='btn btn-light mb-3'>
		        		Back To Feed
		        	</Link>
		        	{postContent}
		        </div>
		      </div>
		    </div>
		  </div>
		);
	}
}

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);