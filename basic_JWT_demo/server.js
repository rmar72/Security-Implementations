const express 	  = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const morgan      = require('morgan');
const mongoose    = require('mongoose');

const jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('./config'); // contains secret key & mongodb connection
const User   = require('./app/models/user');

const { promisify } = require('util');
const jwtPromise = promisify(jwt.verify);

// configuration ===================================================
const port = process.env.PORT || 9000;
mongoose.connect(config.database);
app.set('superSecret', config.secret); // app variable holding secret key

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev')); 


// routes ==========================================================

// creates a sample user
app.get('/setup', (req, res) => {
	const user = new User({
		name: 'Saitama', 
		password: 'One punch',
		admin: true 
	});

	user.save((err) => {
		if (err) throw err;

		res.json({ success: true });
		console.log('User saved successfully');
	});
});

// basic route (http://localhost:8080)
app.get('/', (req, res) => 
	res.send('Hello! Welcome to API http://localhost:' + port + '/api')
);

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------

var apiRoutes = express.Router(); 
app.use('/api', apiRoutes);

// ---------------------------------------------------------
// authentication (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------
// http://localhost:8080/api/authenticate
apiRoutes.post('/authenticate', (req, res) => {

	// find the user
	User.findOne({ name: req.body.name }, (err, user) => {
		if (err) throw err;

		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {

			// check if password matches
			if (user.password != req.body.password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} else {
				// if user is found and password is right, create a token
				const payload = {
					admin: user.admin	
				}
				const token = jwt.sign(payload, app.get('superSecret'), {
					expiresIn: 86400 // expires in 24 hours
				});

				res.json({
					success: true,
					message: 'Enjoy your token!',
					token
				});
			}
		}
	});
});

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
apiRoutes.use( (req, res, next) => {
	// check header or url parameters or post parameters for token
	const token = req.body.token || req.param('token') || req.headers['x-access-token'];
	// decode token
	if (token) {
		// verifies secret and checks exp
		jwtPromise(token, app.get('superSecret'))
			.then(decoded => { 
				req.decoded = decoded;
				next();
			})
			.catch(err => res.json({ success: false, message: 'Failed to authenticate token.' }) );
	} else {
		// if there is no token
		// return an error
		return res.status(403).send({
			success: false, 
			message: 'No token provided.'
		});
	}
});

// ---------------------------------------------------------
// authenticated routes
// ---------------------------------------------------------
apiRoutes.get('/', (req, res) => {
	res.json({ message: 'Welcome to the coolest API on earth!' });
});

apiRoutes.get('/users', (req, res) => {
	User.find({}, (err, users) => {
		if(err) throw err;
		res.json(users);
	});

	// Mongoose Promise version
	// User.find({}).exec()
	// 	.then(users => res.json(users))
	// 	.catch(err => console.log(err))
});

apiRoutes.get('/check', (req, res) => res.json({"decoded token ": req.decoded}) );


// server start
app.listen(port);

