const express = require('express');
const fs = require('fs');
const app = express();
const http = require('http');
const https = require('https');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
// require('./config/passport')(passport);
const session = require('express-session');
const config = require('./config/database');
const contacts = require('./routes/contacts');
const scrape = require('./routes/scrape');



app.set('port', (process.env.PORT || 8080));

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

/* http confg => dev*/
const server = http.createServer(app);


// /* https config => for prod */
// const https = require('https');
// const key = fs.readFileSync('../../../etc/letsencrypt/live/unadyne.com/privkey.pem');
// const cert = fs.readFileSync('../../../etc/letsencrypt/live/unadyne.com/cert.pem');

// const httpsOptions = {
//     cert: cert,
//     key: key
// };

// const server = https.createServer(httpsOptions, app);

const io = require('socket.io').listen(server);


const sessionMiddleware = session({
    secret: 'secret', // TODO generate hashed value later
    resave: false,
    saveUninitialized: true
});

app.use(sessionMiddleware);

app.use(cors());

app.use(bodyParser.json({
    limit: '3mb'
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/contacts', contacts);
app.use('/scrape', scrape);



app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;

//*********************************************************************************************************************
server.listen(app.get('port'), () => {
    let date = new Date().toTimeString().split(' ')[0];
    console.log(`UNADYNE listening on ${app.get('port')} timestamp => ${date}`);
});