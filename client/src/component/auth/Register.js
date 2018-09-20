import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authAction';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
	constructor(props){
		super(props);

		this.state = {
			name: "",
			email: "",
			password: "",
			password2: "",
			errors: {}
		};

		// this.onChange = this.onChange.bind(this);
		// this.onSubmit = this.onSubmit.bind(this); //using arrow function whithout bind
	}

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	componentDidMount(){
		if(this.props.auth.isAuthenticated) 
			this.props.history.push('/dashboard');
	};

	componentWillReceiveProps = (nextProps) => {
		if(nextProps.errors){
			this.setState({
				errors: nextProps.errors
			});
		}
	};

	onSubmit = (e) => {
		e.preventDefault();

		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		};

		this.props.registerUser(newUser, this.props.history);  //Usign withRouter allows us to this.props.history in action insdead of in component
	};

	render() {
		const {errors} = this.state;

		return (
			<div className="register">
		    <div className="container">
		      <div className="row">
		        <div className="col-md-8 m-auto">
		          <h1 className="display-4 text-center">Sign Up</h1>
		          <p className="lead text-center">Create your DevConnector account</p>
		          <form noValidate onSubmit={this.onSubmit}>
		            <div className="form-group">
		            	<TextFieldGroup 
			              	type="text"
			              	placeholder="Name" 
			              	name="name" 
			              	value={this.state.name} 
			              	onChange={this.onChange} 
			              	error={errors.name}  
			              />
		            </div>
		            <div className="form-group">
		            	<TextFieldGroup 
			              	type="email"
			              	placeholder="Email" 
			              	name="email" 
			              	value={this.state.email} 
			              	onChange={this.onChange} 
			              	error={errors.email}  
			              	info="The avatar comes from your email"
			              	/>
		            </div>
		            <div className="form-group">
		            	<TextFieldGroup 
			              	type="password"
			              	placeholder="Password" 
			              	name="password" 
			              	value={this.state.password} 
			              	onChange={this.onChange} 
			              	error={errors.password}  
			              />
		              </div>
		            <div className="form-group">
		            	<TextFieldGroup 
			              	type="password"
			              	placeholder="Password" 
			              	name="password2" 
			              	value={this.state.password2} 
			              	onChange={this.onChange} 
			              	error={errors.password2}  
			              />
		              </div>
		            <input type="submit" className="btn btn-info btn-block mt-4" />
		          </form>
		        </div>
		      </div>
		    </div>
			</div>
		);
	}
}
// it tell app which property ofr component I need in the global scope in store
//which properties of state I need in which component & which action I want to dispatch here 


Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}
 
const mapStateToProps = (state) => ({
	auth: state.auth, //come with combineReducers
	errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register));
      //state in store map to component  //action with these state