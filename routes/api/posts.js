const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const validatePostInput = require('../../validator/post');
const validateCommentInput = require('../../validator/comment');

const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const router = express.Router();

//@route   GET api/posts/test
//@desc    Test posts route
//@access  Public
router.get('/test', (req, res) => res.json({msg: "post's work"}));

//@route   POST api/posts
//@desc    Create posts
//@access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
	const {errors, isValid} = validatePostInput(req.body);
	if(isValid) return res.status(400).json(errors);
	const newpost = new Post({
		user: req.user.id,
		text: req.body.text,
		name: req.body.name,
		avatar: req.body.avatar
	});
	newpost.save().then(res.json(newpost));
})

//@route   GET api/posts
//@desc    GET posts
//@access  Public
router.get('/', (req, res) => {
	const errors = {};
	Post.find()
	.sort({date: -1})
	.then(post => res.json(post))
	.catch(err => res.status(404).json({nopost: "Not found"}));
});

//@route   GET api/posts/id
//@desc    GET posts by id
//@access  Public
router.get('/:post_id', (req, res) => {
	const errors = {};
	Post.findById(req.params.post_id)
	.then(post => res.json(post))
	.catch(err => res.status(404).json({nopost: "Not found"}));
});

//@route   DELETE api/posts/id
//@desc    Delete posts
//@access  Private
router.delete('/:post_id', passport.authenticate('jwt', {session: false}), (req, res) => {
	const errors = {};
	Post.findById(req.params.post_id)
	.then(post => {
		if(post.user.toString() === req.user.id){
			post.remove().then(() => res.json({msg:'success'}))
		} else{
			return res.status(404).json({authorization: false});
		}
	}) 
	.catch(err => (
		res.status(404).json({nopost: "Not found"})
	));
});

//@route   GET api/posts
//@desc    GET posts by user
//@access  Public
router.get('/user/:user_id', (req, res) => {
	const errors = {};
	Post.find({user: req.params.user_id})
	.then(post => {
		if(post){
			res.json(post)
		} else{
			errors.post = "Post not found";
			return res.status(404).json(errors);
		} 
	});
});

//@route   POST api/posts/like/post_id
//@desc    Add like to posts
//@access  Private
router.post('/like/:post_id', passport.authenticate('jwt', {session: false}),(req, res) => {
	Post.findById(req.params.post_id)
	.then(post => {
		if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
			return res.status(404).json({liked: true});
		} 
		post.likes.unshift({user: req.user.id});
		post.save().then(post => res.json(post));
		
	})
	.catch((err) => res.status(400).json({post: 'Not found'}));
});

//@route   POST api/posts/unlike/post_id
//@desc    Rmove like from posts
//@access  Private
router.post('/unlike/:post_id', passport.authenticate('jwt', {session: false}),(req, res) => {
	Post.findById(req.params.post_id)
	.then(post => {
		if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
			return res.status(404).json({liked: false});
		} 
		const removed = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
		post.likes.splice(removed, 1);
		post.save().then(post => res.json(post));
		
	})
	.catch((err) => res.status(400).json({post: 'Not found'}));
});

//@route   POST api/posts/comment/post_id
//@desc    Add comment to posts
//@access  Private
router.post('/comment/:post_id', passport.authenticate('jwt', {session: false}),(req, res) => {
	const {errors, isValid} = validateCommentInput(req.body);
	if(isValid) return res.status(404).json(errors);
	const newComment = {
		user: req.user.id,
		text: req.body.text,
		name: req.user.name
	};
	console.log(req.user.id);
	User.findById(req.user.id).then(user => { newComment.avatar = user.avatar;});
	Post.findById(req.params.post_id)
	.then(post => { 
		post.comments.unshift(newComment);
		post.save().then(post => res.json(post));
	})
	.catch((err) => res.status(400).json({post: 'Not found'}));
});

//@route   DELETE api/posts/comment/post_id/comment_id
//@desc    Delete comment from posts
//@access  Private
router.delete('/comment/:post_id/:comment_id', passport.authenticate('jwt', {session: false}),(req, res) => {
	Post.findById(req.params.post_id)
	.then(post => { 
		const removeIndex = post.comments.map(comment => comment._id.toString()).indexOf(req.params.comment_id);
		if(removeIndex < 0) return res.status(404).json({comment: "Not found"});
		if(post.comments[removeIndex].user.toString() === req.user.id){
			post.comments.splice(removeIndex, 1);
		} else{
			return res.status(404).json({authorization: false});
		}
		post.save().then(post => res.json(post));
	})
	.catch((err) => res.status(400).json({post: 'Not found'}));
});

module.exports = router;