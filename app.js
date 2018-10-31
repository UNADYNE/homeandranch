const express = require('express');
const fs = require('fs');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
// require('./config/passport')(passport);
const io = require('socket.io').listen(server);
const session = require('express-session');
const config = require('./config/database');
const contacts = require('./routes/contacts');

app.set('port', (process.env.PORT || 8080));

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

const sessionMiddleware = session({
    secret: 'secret', // TODO generate hashed value later
    resave: false,
    saveUninitialized: true
});

app.use(sessionMiddleware);

app.use(cors());

app.use(bodyParser.json({limit: '3mb'}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/contacts', contacts);



app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;

//*********************************************************************************************************************
server.listen(app.get('port'), () => {
    let date = new Date().toTimeString().split(' ')[0];
    console.log(`UNADYNE listening on ${app.get('port')} timestamp => ${date}`);
});