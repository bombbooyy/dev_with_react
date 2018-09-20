import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addComment } from '../../actions/postAction';

class CommentForm extends Component {
	constructor(props){
		super(props);

		this.state = {
			text: '',
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.errors)
			this.setState({
				errors: nextProps.errors
			});
	};

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	onSubmit(e) {
		e.preventDefault();
		const { postId } = this.props;

		const newPost = {
			text: this.state.text,
		};

		this.props.addComment(newPost, postId);
		this.setState({text: ''});
	}

	render() {
		const { errors } = this.state;

		return (
			<div className="post-form mb-3">
	      <div className="card card-info">
	        <div className="card-header bg-info text-white">
	          Say Somthing...
	        </div>
	        <div className="card-body">
	          <form onSubmit={this.onSubmit} >
	            <div className="form-group">
	              <TextAreaFieldGroup 
	              	placeholder='Create a comment' 
	              	name='text' 
	              	value={this.state.text} 
	              	onChange={this.onChange} 
	              	error={errors.text} 
	              />
	              </div>
	            <button type="submit" className="btn btn-dark">Submit</button>
	          </form>
	        </div>
	      </div>
	    </div>
		);
	}
}

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	post: state.post,
	errors: state.errors
});

export default connect(mapStateToProps, { addComment })(CommentForm)