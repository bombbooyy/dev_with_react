const express = require('express'); //npm server , npm start, npm run server
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport'); 

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');


const app = express();

//body-parser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

//DB config
const mongoURI = require('./config/key').mongoURI;
//connect to mongoDB
mongoose
	.connect(mongoURI, {useNewUrlParser: true})
	.then(() => console.log(`Mongo successfully connected`))
	.catch((err) => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport)

//Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));