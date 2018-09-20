import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authAction';
import { clearProfile } from '../../actions/profileAction';

 
class Navbar extends Component {
	
	onLogoutClick = (e) => {
		e.preventDefault();
		this.props.logoutUser();
		this.props.clearProfile();
		window.location.href = "/";  //this.props.history.push need to be in exact so here using window...
	}


	render() {
		const {user, isAuthenticated} = this.props.auth;

		return(
		  <nav className="navbar navbar-expand-sm navbar-blue bg-blue mb-4">
		    <div className="container">
		      <Link className="navbar-brand" to="/">DevConnector</Link>
		      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
		        <span className="navbar-toggler-icon"></span>
		      </button>

		      <div className="collapse navbar-collapse" id="mobile-nav">
		        <ul className="navbar-nav mr-auto">
		          <li className="nav-item">
		            <Link className="nav-link" to="/profiles"> Developers
		            </Link>
		          </li>
		        </ul>

		        <ul className="navbar-nav ml-auto">
		          {!isAuthenticated && (<li className="nav-item">
		          		          		            <Link className="nav-link" to="/register">Sign Up</Link>
		          		          		          </li>)}
		          {!isAuthenticated && (<li className="nav-item">
		            <Link className="nav-link" to="/login">Login</Link>
		          </li>)}
		          {isAuthenticated && (<li className="nav-item">
		            <Link className="nav-link" to="/feed">Post Feed</Link>
		          </li>)}
		          {isAuthenticated && (<li className="nav-item">
		            <Link className="nav-link" to="/dashboard">Dashboard</Link>
		          </li>)}
		          {isAuthenticated && (<li className="nav-item">
		            <Link className="nav-link" to="/" onClick={this.onLogoutClick}><img src={user.avatar} className="avatar" alt={user.name}/>Logout</Link>
		          </li>)}
		        </ul>
		      </div>
		    </div>
		  </nav>
		)};
};

Navbar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	clearProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});


export default connect(mapStateToProps, { logoutUser, clearProfile })(Navbar);