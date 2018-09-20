const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},
	handle: {
		type: String,
		required: true,
		max: 40
	},
	location: {
		type: String
	},
	status: {
		type: String,
		required: true
	},
	skills: {
		type: [String],
		required: true
	},
	bio: {
		type: String
	},
	githubusername: {
		type: String
	},
	education: [
		{
			school: {
				type: String,
				required: true
			},
			degree: {
				type: String,
				required: true
			},
			department: {
				type: String,
				required: true
			},
			from: {
				type: Date,
				required: true
			},
			to: {
				type: Date
			}
		}
	],
	experience: [
		{
			title: {
				type: String,
				required: true
			},
			company: {
				type: String,
				required: true
			},
			location: {
				type: String
			},
			from: {
				type: Date,
				required: true
			},
			to: {
				type: Date
			},
			description: {
				type: String
			}
		}
	]
})


module.exports = Profile = mongoose.model('profiles', ProfileSchema);