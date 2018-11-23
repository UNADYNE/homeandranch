const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/database');

const UserSchema = mongoose.Schema({  // users are t
    firstName: {
        type: String,
        required: true,
        index: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        index: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },

    password: {
        type: String
    },
    subLevel: {
        type: Number,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = (id, projection, callback) => {
    User.findById(id, projection, callback);
};

module.exports.getUserByUsername = (username, callback) => {
    const query = {username: username};
    User.findOne(query, callback);
};

module.exports.getUsersByState = (state, callback) => {
    User.find({state: state}, callback);
};

module.exports.addUser = (newUser, projections, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.updateMember = (member, callback) => {
    const member_id = member.member_id;
    const newDoc = {
        "name": member.name,
        "username": member.username,
        "email": member.email,
        "phone": member.phone,
        "webLink": member.webLink,
        "state": member.state,
        "intro": member.intro,
        "bio": member.bio,
        "practice": member.practice,
        "focus": member.focus,
        "badge": member.badge
    };

    User.findByIdAndUpdate(member_id, newDoc, callback);
};
module.exports.updateProfilePic = (user_id, profilePicUrl, callback) => {
    User.findByIdAndUpdate(user_id, {profilePicUrl: profilePicUrl}, callback);
};

module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
};
