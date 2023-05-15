const express = require("express");
const path = require('path');
const cors = require("cors"); 
require("dotenv").config();
const passport = require("passport");
const session = require("express-session")
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const mongoDb = process.env.DB_URL;
mongoose.connect(mongoDb, {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, "Mongo connection error!"))

// PASSPORT
app.use(cookieParser());
app.use(session({ 
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false,
    cookie: { 
        maxAge: 60*60*1000,
        httpOnly: true,
    }, 
}));
app.use(passport.initialize());
app.use(passport.session());

const initializePassport = require('./passport.js');
initializePassport(passport);

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
)

// HANDLE ROUTES
const usersRouter = require('./routes/users');
const authRouter = require("./routes/auth");
const thoughtsRouter = require('./routes/thoughts');

app.use('/', usersRouter);
app.use('/auth', authRouter);
app.use('/', thoughtsRouter);

if(process.env.NODE_ENV==='production') {
    app.use(express.static(path.join(__dirname +'/../build/')))

    app.get('*', (req, res) => {
        res.sendFile(path.join((__dirname + '/../build/index.html')));
  });
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

module.exports = app;