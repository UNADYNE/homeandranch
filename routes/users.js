const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const config = require('../config/database');
const User = require('../models/user');
// const session = require('express-session');
// const app = require('../app');


// Socket.io area

router.get(`/search:?`, (req, res, next) => {
    const query = {$text: {$search: req.query.search}};
    const projection = {password: 0, __v: 0, email: 0};

    User.searchUsers(query, projection, (err, results) => {
        if (err) {
            res.json({
                success: false,
                error_message: err,
                query: query
            });
        } else {
            res.json({
                success: true,
                doc: results
            });
        }
    })
});

router.get(`/get-profile/:id`, (req, res) => {
    const projection = {
        password: 0,
        __v: 0,
        friendRequests: 0
    };

    User.getUserById(req.params.id, projection, (err, userData) => {
        if (err) {
            res.json({
                success: false,
                error_message: err
            });
        } else {
            res.json({
                success: true,
                doc: userData
            });
        }
    });

});

router.get('/get-members-by-state/:stateName', (req, res) => {
    User.getUsersByState(req.params.stateName, (err, results) => {
        if (err) throw err;
        res.json({
            success: true,
            body: results
        });
    });
});

router.post('/register', (req, res, next) => {
    console.log('made it to /register');
    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username.toLocaleLowerCase(),
        email: req.body.email,
        password: req.body.password,
        subLevel: 3,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin
    });
    const projections = {
        __v: 0,
        email: 0,
        password: 0,
        profilePicUrl: 0,
        username: 0,
        name: 0,
        subLevel: 0
    };
    User.addUser(newUser, projections, (err, results) => {
        if (err) throw err;
        res.json({
            success: true,
            msg: 'Registration Complete',
            user: results
        });
    });
});

router.put('/update-member', (req, res) => {
    // console.log('users route');
    User.updateMember(req.body, (err, results) => {
        if (err) {
            res.json({
                success: false,
                error: err
            });
            throw err;
        }
        res.json({
            success: true,
            member: results
        });
    });
});


// State does exist in front end
router.patch('./add-user-to-state', (req, res) => {
    const data = {
        state_id: req.body.state_id,
        user_id: req.body.user_id
    };
    State.addUserToState(data, (err) => {
        if (err) throw err;
        res.json({
            success: true,
            msg: 'User Added to State'
        });
    });
});

router.patch('/update/profilepic', (req, res, next) => {
    User.updateProfilePic(req.body.user_id, req.body.profilePicUrl, (err) => {
        if (err) throw err;
    });
    res.json({
        success: true,
        reqBody: req.body
    });
});

router.patch('/online-state', (req, res) => {
    User.setUserOnlineState(req.body.user_id, req.body.online, (err, callback) => {
        if (err) throw err;
        res.json({
            success: true,
            online: callback.online
        });
    });
});

/* TODO after three failed attempts to auth user is banned for 15 minutes then one attempt every 15 minutes until 6 hours has passed*/
/* TODO clear localStorage after expiration*/
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username.toLocaleLowerCase();
    const password = req.body.password;
    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (user) {
            User.comparePassword(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    try {
                        userData = {
                            name: user.name,
                            username: user.username,
                            email: user.email,
                            subLevel: user.subLevel
                        };
                        const token = jwt.sign(userData, config.secret, {
                            expiresIn: '2h'
                        });
                        res.json({
                            success: true,
                            token: token,
                            user: {
                                name: user.name,
                                username: user.username,
                                email: user.email,
                                displayName: user.displayName,
                                profilePicUrl: user.profilePicUrl,
                                subLevel: user.subLevel
                            },
                            id: user._id
                        });
                    } catch (error) {
                        // console.log(user);
                        console.log('error----> ', error);
                    }
                } else {
                    if (err) throw err;
                    res.json({success: false, msg: 'Authentication Failed password'});
                }
            });
        } else {
            res.json({success: false, msg: 'User not found'});
        }
    });
});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

router.get(`/view-profile/:id`, (req, res) => {
    const user_id = req.params.id;
    const projection = {
        password: 0,
        __v: 0,
        friendRequests: 0
    };

    User.getUserById(user_id, projection, (err, user) => {
        if (err) throw err;
        res.json({
            success: true,
            user: user
        });
    });
});

router.delete('/delete-user/:id', (req, res) => {
    const query = req.params.id;
    User.deleteMember(query, (err, results) => {
        if (err) throw err;
        res.json({
            success: true,
            results: results
        });
    });
});


router.post('/find-members-by-category', (req, res) => {
    const query = {state: req.body.state, focus: req.body.focus};

    User.findMembersByCategory(query, (err, results) => {
        if (err) throw(err);
        res.json({
            data: results
        });
    });
});

module.exports = router;
