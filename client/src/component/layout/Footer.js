import React, {Component} from 'react';

class Footer extends Component {
	render() {
		return(
		  <footer className="bg-blue text-black mt-5 p-4 text-center">
		    Copyright &copy; {new Date().getFullYear()} DevConnector
		  </footer>
		)
	};
};

export default Footer;