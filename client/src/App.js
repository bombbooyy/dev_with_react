import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom' //somepeople do it in index some in App.
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authAction';
import { clearProfile } from './actions/profileAction';
import {Provider} from 'react-redux';
import store from './store';
import './App.css';

// import Navbar from "./component/layout/Navbar";
import Navbar from "./component/layout/Navbar";
import Landing from "./component/layout/Landing";
import Footer from "./component/layout/Footer";
import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import Dashboard from "./component/dashboard/Dashboard";
import PrivateRoute from './component/common/PrivateRoute';
import CreateProfile from './component/create-profile/CreateProfile';
import EditProfile from './component/edit-profile/EditProfile';
import AddExp from './component/add-credential/AddExp';
import AddEdu from './component/add-credential/AddEdu';
import Profiles from './component/profiles/Profiles';
import Profile from './component/profile/Profile';
import NotFound from './component/NotFound/NotFound';
import Posts from './component/posts/Posts';
import Post from './component/post/Post';


//usgin privider to tell redux what my store include

class App extends Component {
  render() {
  	//check the jwtToken
  	if(localStorage.jwtToken){
  		//set jwtToken
  		setAuthToken(localStorage.jwtToken);
  		//get user data and exp
  		const decode = jwt_decode(localStorage.jwtToken);
  		//dispatch the action
  		store.dispatch(setCurrentUser(decode));
  		//exp time
  		const currentTime = Date.now() / 1000;
  		if(decode.exp < currentTime){
  			store.dispatch(logoutUser());
        store.dispatch(clearProfile());
  			localStorage.clear();
  			window.location.href = "/login";
  		}
  	}
  	

    return (
    	<Provider store={ store }>  
	    	<BrowserRouter>
	      	<div className="App">
		        <Navbar />
		        <Route exact path="/" component={ Landing } />
		        <div className="container">
		       		<Route exact path="/register" component={ Register } />
		        	<Route exact path="/login" component={ Login } />
              <Route exact path="/profiles" component={ Profiles } />
              <Route exact path="/profile/:id" component={ Profile } />
              <Switch>
                <PrivateRoute exact path='/dashboard' component={ Dashboard } />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/create-profile' component={ CreateProfile } />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/edit-profile' component={ EditProfile } />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/add-experience' component={ AddExp } />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/add-education' component={ AddEdu } />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/feed' component={ Posts } />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/post/:id' component={ Post } />
              </Switch>
              <Route exact path="/notfound" component={ NotFound } />
            </div>
		        <Footer />
	     	 </div>
	      </BrowserRouter>
      </Provider> 
    );
  }
}

export default App;
