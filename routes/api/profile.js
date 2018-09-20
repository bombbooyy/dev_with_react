const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const validateProfileInput = require('../../validator/profile');
const validateExpInput = require('../../validator/exp');
const validateEduInput = require('../../validator/edu');
//Load models of profile & User
const Profile = require('../../models/Profile');
const User    = require('../../models/User');


//@route   GET api/profile/test
//@desc    Test profile route
//@access  Public
router.get('/test', (req, res) => res.json({msg: "profile's work"}));

//@route   GET api/profile
//@desc    Profile route
//@access  Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
	const errors = {};

	Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar'])
	.then((profile) => {
		if(!profile){
			errors.user = "You have no profile";
			return res.status(404).json(errors);
		}
		res.json(profile);
	})
	.catch(err => res.status(404).json(err));
})

//@route   POST api/profile
//@desc    create user profile
//@access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
	const {errors, isValid} = validateProfileInput(req.body);
	const profileFields = {};

	if(isValid) return res.status(404).json(errors);
	//create profile to save
	profileFields.user = req.user.id;
	if(req.body.handle) profileFields.handle = req.body.handle;
	if(req.body.location) profileFields.location = req.body.location;
	if(req.body.status) profileFields.status = req.body.status;
	if(typeof(req.body.skills) !== undefined) profileFields.skills = req.body.skills.split(',');
	if(req.body.bio) profileFields.bio = req.body.bio;
	if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;

	Profile.findOne({user: req.user.id})
	.then((profile) => {
		//if exist => update
		if(profile) {
			Profile.findOneAndUpdate({user: profileFields.user}, 
									 {$set: profileFields}, 
									 {new: true})
			.then((updated) => res.json(updated));
		} else {
		//check handle
			Profile.findOne({handle: profileFields.handle})
			.then((repeated) => {
				if(repeated) {
					errors.handle = "The handle already exists";
					return res.status(400).json(errors);
				} 
				new Profile(profileFields).save().then(newone => res.json(newone));

			});
		}
	});
});

//@route   GET api/profile/handle/:handle
//@desc    Get profile by handle
//@access  Public
router.get('/handle/:handle', (req, res) => {
	const errors = {};
	Profile.findOne({handle: req.params.handle})
				 .populate('user', ['user', 'avatar'])
				 .then(profile => {
				 	if(!profile){
				 		errors.handle = "Handle not found";
				 		return res.status(404).json(errors);
				 	} else{
				 		res.json(profile);
				 	}
				 })
				 .catch(() => {
				 	errors.handle = "Handle not found";
				 	return res.status(404).json(errors);
				 });
});

//@route   GET api/profile/user/:user_id
//@desc    Get profile by user_id
//@access  Public
router.get('/user/:user_id', (req, res) => {
	const errors = {};
	Profile.findOne({user: req.params.user_id})
				 .populate('user', ['user', 'avatar'])
				 .then(profile => {
				 	if(!profile){
				 		errors.user = "user not found";
				 		return res.status(404).json(errors);
				 	} else{
				 		res.json(profile);
				 	}
				 })
				 .catch(() => {
				 	errors.user = "user not found";
				 	return res.status(404).json(errors);
				 });
});

//@route   get api/profile/all
//@desc    Get all profile
//@access  Public
router.get('/all', (req, res) => {
	const errors = {};
	Profile.find()
				 .populate('user', ['user', 'avatar', 'name'])
				 .then(profiles => {
				 	if(!profiles){
				 		errors.all = "There are not profile";
				 		return res.status(404).json(errors);
				 	} else{
				 		res.json(profiles);
				 	}
				 })
				 .catch(() => {
				 	errors.all = "There are not profile";
				 	return res.status(404).json(errors);
				 });
});

//@route   POST api/profile/exp
//@desc    add exp
//@access  Private

router.post("/exp", 
						passport.authenticate('jwt', {session: false}), 
						(req, res) => {
							let {errors, isValid} = validateExpInput(req.body);
							if(isValid) return res.status(404).json(errors);
							const exp = {};
							exp.title = req.body.title;
							exp.company = req.body.company;
							exp.location = req.body.location;
							exp.from = req.body.from;
							if(req.body.to) exp.to = req.body.to;
							exp.description = req.body.description;

							Profile.findOne({user: req.user.id})
							.then(profile => {
								if(profile){
									profile.experience.unshift(exp);
									profile.save()
									.then(res.json(profile));
								} else{
									errors.profile = "Please submit the basic profile first";
									return res.status(400).json(errors);
								}
							})


})

//@route   POST api/profile/edu
//@desc    add edu
//@access  Private

router.post("/edu", 
						passport.authenticate('jwt', {session: false}), 
						(req, res) => {
							let {errors, isValid} = validateEduInput(req.body);
							if(isValid) return res.status(404).json(errors);
							const exp = {};
							exp.school = req.body.school;
							exp.degree = req.body.degree;
							exp.department = req.body.department;
							exp.from = req.body.from;
							if(req.body.to) exp.to = req.body.to;

							Profile.findOne({user: req.user.id})
							.then(profile => {
								if(profile){
									profile.education.unshift(exp);
									profile.save()
									.then(res.json(profile));
								} else{
									errors.profile = "Please submit the basic profile first";
									return res.status(400).json(errors);
								}
							})


})

//@route   DELETE api/profile/exp
//@desc    delete exp
//@access  Private
router.delete('/exp/:exp_id', 
							passport.authenticate('jwt', {session: false}),
							(req, res) => {
								Profile.findOne({user: req.user.id})
								.then(profile => {
									if(!profile){
										return res.status(400).json({err: "Not found"});
									}
									profile.experience = profile.experience.filter(i => (i.id) !== req.params.exp_id);
									profile.save()
									.then(profile => res.json(profile));
	});
});

//@route   DELETE api/profile/edu
//@desc    delete exp
//@access  Private
router.delete('/edu/:edu_id', 
							passport.authenticate('jwt', {session: false}),
							(req, res) => {
								Profile.findOne({user: req.user.id})
								.then(profile => {
									if(!profile){
										return res.status(400).json({err: "Not found"});
									}
									profile.education = profile.education.filter(i => (i.id) !== req.params.edu_id);
									profile.save()
									.then(profile => res.json(profile));
								});
							});

//@route   DELETE api/profile/
//@desc    delete user and profile
//@access  Private
router.delete('/', passport.authenticate('jwt', {session: false}), (req, res) => {
	Profile.findOneAndRemove({user: req.user.id})
	.then(() => {
		User.findOneAndRemove({_id: req.user.id})
		.then(() => res.json({msg: 'success'}));
	})
	
})

module.exports = router;