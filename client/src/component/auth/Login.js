import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authAction';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	componentDidMount() {
		if(this.props.auth.isAuthenticated) 
			this.props.history.push('/dashboard');
	};

	componentWillReceiveProps(nextProps) {
		if(nextProps.auth.isAuthenticated){
			this.props.history.push('/dashboard');
		}

		if(nextProps.errors){
			this.setState({
				errors : nextProps.errors
			});
		}
	}

	onSubmit(e){
		e.preventDefault();
		const user = {
			email: this.state.email,
			password: this.state.password
		};
		this.props.loginUser(user)
	}

	render() {
		const {errors} = this.state;

		return (
			<div className="login">
			    <div className="container">
			      <div className="row">
			        <div className="col-md-8 m-auto">
			          <h1 className="display-4 text-center">Log In</h1>
			          <p className="lead text-center">Sign in to your DevConnector account</p>
			          <form noValidate onSubmit={this.onSubmit}>
			            <div className="form-group">
			              <TextFieldGroup 
			              	type="email"
			              	placeholder="Email Address" 
			              	name="email" 
			              	value={this.state.email} 
			              	onChange={this.onChange} 
			              	error={errors.email}  
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
			            <input type="submit" className="btn btn-info btn-block mt-4" />
			          </form>
			        </div>
			      </div>
			    </div>
			</div>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProp = (state) => ({
		auth: state.auth,
		errors: state.errors
});

export default connect(mapStateToProp, {loginUser})(Login);