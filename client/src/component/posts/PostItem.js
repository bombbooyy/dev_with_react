import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletePost, addLike, disLike } from '../../actions/postAction';

class PostItem extends Component {

	onDeleteClick(id) {
		this.props.deletePost(id);
	};

	likeClick(id) {
		this.props.addLike(id);
	};

	dislikeClick(id){
		this.props.disLike(id);
	};

	haveLike(post, auth){
		if(post.likes.filter(like => like.user === auth.user.id).length > 0)
			return true;
		return false;
	}

	render() {
		const { post, auth } = this.props;
		const liked = this.haveLike(post, auth);

		return (
			<div className="card card-body mb-3">
	      <div className="row">
	        <div className="col-md-2">
	          <Link to={`/profile/${ post.user }`}>
	            <img className="rounded-circle d-none d-md-block" 
	            	src={ post.avatar }
	              alt="" />
	          </Link>
	          <br />
	          <p className="text-center">{ post.name }</p>
	        </div>
	        <div className="col-md-10">
	          <p className="lead">{ post.text }</p>
	          <button type="button" className="btn btn-light mr-1" onClick={this.likeClick.bind(this, post._id)}>
	            <i className={classnames("fas fa-thumbs-up", {'text-secondary': liked }, {'text-info': !liked })}></i>
	            <span className="badge badge-light">{ post.likes ? post.likes.length : 0 }</span>
	          </button>
	          <button type="button" className="btn btn-light mr-1" onClick={this.dislikeClick.bind(this, post._id)}>
	            <i className={classnames("fas fa-thumbs-down", {'text-secondary': !liked }, {'text-danger': liked })}></i>
	          </button>
	          <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
	            Comments
	          </Link>
	          {post.user === auth.user.id ? (
	          		<button type='button' className='btn btn-danger' onClick={this.onDeleteClick.bind(this, post._id)}>
	          			<i className='fas fa-times' />
	          		</button>
	          	) : null}
	       </div>
	      </div>
	    </div>
		);
	}
}

PostItem.propTypes = {
	deletePost: PropTypes.func.isRequired,
	addLike: PropTypes.func.isRequired,
	disLike: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
})

export default connect(mapStateToProps, { deletePost, addLike, disLike })(PostItem)
