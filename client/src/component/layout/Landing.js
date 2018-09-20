import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import back1 from '../../img/showcase.jpg'
import back2 from '../../img/table2.jpg'


class Landing extends Component {

	constructor(){
		super();
		this.state = {
			url: back1
		};

		this.onChange = this.onChange.bind(this);
		this.offChange = this.offChange.bind(this);
	}

	onChange() {
		this.setState({url: back2})
	};
	offChange() {
		this.setState({url: back1})
	}

	componentDidMount() {
		if(this.props.auth.isAuthenticated) 
			this.props.history.push('/dashboard');
	}

	render() {
		return (
		  <div className="landing" style={{backgroundImage: `url(${this.state.url})`}}>
		    <div className="dark-overlay landing-inner text-light">
		      <div className="container">
		        <div className="row">
		          <div className="col-md-12 text-center">
		            <h1 className="display-3 mb-4">Developer Connector
		            </h1>
		            <p className="lead"> Create a developer profile/portfolio, share posts and get help from other developers</p>
		            <hr />
		            <Link onMouseEnter={this.onChange} onMouseLeave={this.offChange} to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
		            <Link onMouseEnter={this.onChange} onMouseLeave={this.offChange} to="/login" className="btn btn-lg btn-light">Login</Link>
		          </div>
		        </div>
		      </div>
		    </div>
		  </div>			
		)};
};

Landing.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, {})(Landing);