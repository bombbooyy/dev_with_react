const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/key');
const passport = require('passport');
const validateRegisterInput = require('../../validator/register');
const validateLoginInput =require('../../validator/login');
// Load User model
const User = require('../../models/User');

//@route   GET api/users/test
//@desc    Test users route
//@access  Public

router.get('/test', (req, res) => res.json({msg: "users's work"}));

//@route   POST api/users/register
//@desc    register users route
//@access  Public

router.post('/register', (req, res) => {
	//check validator
	//destructor
	const {errors, isValid} = validateRegisterInput(req.body);
	if(isValid)
		return res.status(400).json(errors);


	User.findOne({email: req.body.email})
	.then(user => {
		if(user){
			errors.email = "Email already exists";
			return res.status(400).json(errors);
		} else{
			const avatar = gravatar.url(req.body.email, {
				s: '200', //size
				r: 'pg',  // Rating
				d: 'mm'   //default => mm: no profile
			});

			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				avatar: avatar,
				password: req.body.password
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if(err) 
						throw err;
					newUser.password = hash;
					newUser.save()
						.then(user => res.json(user))
						.catch(err => consol.log(err));
				})
			})
		}
	})
})

//@route   POST api/users/login
//@desc    login users route
//@access  Public

router.post('/login', (req, res) => {
	//validator
	let {errors, isValid} = validateLoginInput(req.body);
	if(isValid)
		return res.status(400).json(errors)
	//check email
	const email = req.body.email;
	const password = req.body.password;
	//find the user-email
	User.findOne({email})
	.then(user => {
		//check for user
		if(!user){
			errors.email = "User not found"
			return res.status(400).json(errors);
		}
		//check for password
		bcrypt.compare(password, user.password) 
		.then((isMatch) => {
			if(!isMatch)  {
				errors.password = "password not correct" ;
				return res.status(404).json(errors);
			}
			//User matched
			const payload = {id: user.id, name: user.name, avatar: user.avatar} //things included in token

			//Sign Token
			jwt.sign(
				payload, 
				keys.secretOrKey, 
				{expiresIn: 3600}, 
				(err, token) => {
					res.json({
						success: true,
						token: 'Bearer ' + token
				});
			});
		});
	});
});

//@route   Get api/users/current
//@desc    login users payload
//@access  Private

router.get(
	'/current', 
	passport.authenticate('jwt', {session:false}),
	(req, res) => {
		res.json({
			id: req.user.id,
			name: req.user.name,
			email: req.user.email

		});
	}
);


module.exports = router;