// Import necessary libraries and modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

// Create an Express application
const app = express();

// Define the port for the server to listen on, using an environment variable if available, or a default value (3000)
const port = process.env.PORT || 3000;

// Configure middleware for handling JSON data in requests and sessions
app.use(bodyParser.json());
app.use(session({
    // Set a secret key for session management (can be any string)
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Enable CORS (Cross-Origin Resource Sharing) to allow requests from any origin
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

// Set up CORS for specific HTTP methods
app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'] }));
app.use(cors({ origin: '*' }));

// Include and use routes defined in separate files
app.use('/', require('./routes'));

// Configure Passport.js for GitHub OAuth2 authentication strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
}, function (accessToken, refreshToken, profile, done) {
    // GitHub authentication strategy callback function
    return done(null, profile);
}));

// Serialize and deserialize user objects for session management
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Handle uncaught exceptions and log errors
process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

// Define a route that checks if a user is logged in and displays their name if so
app.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out');
});

// Define a callback route for GitHub OAuth2 authentication
app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs',
    session: false
}), (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

// Initialize the MongoDB database connection
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        // Start the server and listen for incoming traffic on the specified port
        app.listen(port, () => {
            console.log(`Database is listening and node Running on port ${port}`);
        });
    }
});
