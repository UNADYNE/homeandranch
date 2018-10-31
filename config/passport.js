const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
// const User = require('../models/user');
const config = require ('../config/database');


// module.exports =  (passport) => {

//     let opts = {};

//    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();

//    opts.secretOrKey = config.secret;

//    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
//        User.getUserById(jwt_payload.user_id, (err, user) => {
//            let userToFE = {
//                name: user.name,
//                user_id: user._id,
//                username: user.username,
//                displayName: user.displayName,
//                email: user.email,
//                profilePicUrl: user.profilePicUrl,
//                quote: user.quote,
//                friendsList: user.friendsList,
//                loggedIn: user.loggedIn
//            };

//            if (err){
//                return done(err, false);
//            }
//            if(user){
//                return done(null, userToFE);
//            } else {
//                return done(null, false);
//            }
//        });
//    }));
// };