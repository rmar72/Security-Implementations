const   express = require('express'),
        _  = require('lodash'),
        bodyParser = require('body-parser'),
        jwt = require('jsonwebtoken'),
        passport = require('passport'),
        passportJWT = require('passport-jwt');

////// -------------------------------- JWT SETUP
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy  = passportJWT.Strategy;
var jwtOptions = {};
//jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // this did not work
//jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT'); // this works
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('bearer'); // this also works
jwtOptions.secretOrKey = 'tasmanianDevil';


/////// ------------------------------------- PASSPORT SETUP

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  
  // server spits out decoded value: payload received { id: 1, iat: 1535877980 }
  console.log('payload received', jwt_payload);
  
  // usually this would be a database call:
  var user = users[_.findIndex(users, {id: jwt_payload.id})];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
  
passport.use(strategy);
var app  = express();
app.use(passport.initialize());


////// -------------------------------- OTHER SETUP
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

////// -------------------------------- MOCK DB USER
var users = [
  {
    id: 1,
    name: 'ruben',
    password: '22'
  },
  {
    id: 2,
    name: 'test',
    password: 'test'
  }
];


////// -------------------------------- ROUTES
app.get("/", function(req, res) {
  res.sendFile(process.cwd() + '/public/index.html'); // current working dir
});

app.post("/login", function(req, res) {
  if(req.body.name && req.body.password){
    var name = req.body.name;
    var password = req.body.password;
  }
  // usually this would be a database call:
  var user = users[_.findIndex(users, {name: name})];
  if(!user){
    res.status(401).json({message:"no such user found"});
  }

  if(user.password === password) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    var payload = {id: user.id};
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({message: "ok", token: token});
  } else {
    res.status(401).json({message:"passwords did not match"});
  }
});

app.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
  res.json("Success! You can not see this without a token");
});

app.get("/secretDebug",
  function(req, res, next){
    // ahh this is how you acccess the headers from the req body! with .get ... So this is what passport.authenticate()^ does in the background 
    console.log(req.get('Authorization')); // servers spits out the correct value in that header: Bearer + token
    // then it uses next which jumps to running the next callback which prints debugging in json 
    next();
  }, function(req, res){
    res.json("debugging");
});

app.listen(2018, () => console.log("Express running on port 2018") );
