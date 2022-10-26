const express = require("express");
const cors = require("cors"); 
require("dotenv").config();
const passport = require("passport");
const session = require("express-session")
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
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
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

const initializePassport = require('./passport.js');
initializePassport(passport);

app.use(cookieParser());
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

app.use('/', usersRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

module.exports = app;