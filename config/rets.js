const rets = require('rets-client');
const fs = require('fs');

const clientSettings = {
    loginUrl: 'http://rets18.utahrealestate.com/contact/rets/login',
    username: 'cortwrong',
    password: 'c0rtwrong',
    version: 'RETS/1.7.2',
    userAgent: 'RETS node-client/4.x',
    method: 'GET'  // this is the default, or for some servers you may want 'POST'
};

const clientSettings = {
    version: 'RETS/1.7.2',
    userAgent: userAgent,
    userAgentPassword: userAgentPassword,
    sessionId: sessionId
};

// function outputFields(obj, opts) {
//     if (!obj) {
//         console.log("      "+JSON.stringify(obj))
//     } else {
//         if (!opts) opts = {};
//
//         var excludeFields;
//         var loopFields;
//         if (opts.exclude) {
//             excludeFields = opts.exclude;
//             loopFields = Object.keys(obj);
//         } else if (opts.fields) {
//             loopFields = opts.fields;
//             excludeFields = [];
//         } else {
//             loopFields = Object.keys(obj);
//             excludeFields = [];
//         }
//         for (var i = 0; i < loopFields.length; i++) {
//             if (excludeFields.indexOf(loopFields[i]) != -1) {
//                 continue;
//             }
//             if (typeof(obj[loopFields[i]]) == 'object') {
//                 console.log("      " + loopFields[i] + ": " + JSON.stringify(obj[loopFields[i]], null, 2).replace(/\n/g, '\n      '));
//             } else {
//                 console.log("      " + loopFields[i] + ": " + JSON.stringify(obj[loopFields[i]]));
//             }
//         }
//     }
//     console.log("");
// }

