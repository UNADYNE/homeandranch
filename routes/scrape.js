const express = require('express');
const router = express.Router();
const rets = require('rets-client');
const _ = require('underscore');
const crypto = require('crypto');
const Property = require('../models/property');
const async = require('async');

let clientSettings = {
    loginUrl: 'http://rets18.utahrealestate.com/contact/rets/login',
    username: 'cortwrong',
    password: 'c0rtwrong',
    version: 'RETS/1.7.2',
    userAgent: 'RETS node-client/5.2.3'
};

const reqLimit = 50000;
const timeout = 250;

let mediaArray = [];
let listnums = [];

// Function for handling new cookie for header changes, should be run after initial login
function checkSessionHeader(client) {
    console.log("sign-in successful, setting session?");
    let cookie = client.metadata.retsSession.head().headers.cookie;
    // console.log(`headers ===> ${JSON.stringify(client.metadata.retsSession.head().headers)}`);


    console.log("looking for cookie", cookie);
    if (cookie.indexOf('RETS-Session-ID') != -1) {
        let cookieSplit, retsIdx, retsCookie;
        console.log("RETS-Session-ID found!");
        cookieSplit = cookie.split(';');
        console.log("cookieSplit", cookieSplit);
        let cIdx = -1;
        _.forEach(cookieSplit, function (c, i) {
            if (c.indexOf('RETS-Session-ID')) {
                cIdx = i;
            }
        });
        console.log("cIdx", cIdx);
        if (cIdx != -1) {
            console.log("cIdx valid... continuing");
            retsCookie = cookieSplit[cIdx].split('=')[1];
            console.log("RETS-Session-ID is ", retsCookie,
                "... Setting client.settings.sessionId and recomputing UA-Authorization Header");
            client.settings.sessionId = retsCookie;
            // Compute new Header
            return computeUAHeader(client);
        } else return false
    }
    else return false;
}


// crypto function to reset RETS-UA-Authorization in a dynamic fashion.
function computeUAHeader(client) {
    var a1, retsUaAuth;
    if (!client.settings.sessionId) {
        console.log("NO SESSIONID");
        return false
    } else {
        a1 = crypto.createHash('md5').update([clientSettings.username, clientSettings.password].join(":")).digest('hex');
        retsUaAuth = crypto.createHash('md5').update([a1, "", client.settings.sessionId || "", client.settings.version || client.headers['RETS-Version']].join(":")).digest('hex');
        client.headers['RETS-UA-Authorization'] = "Digest " + retsUaAuth;
        console.log("New UA-Auth header set, result", client.headers['RETS-UA-Authorization']);
        return true
    }
}

function outputFields(obj, opts) {
    if (!obj) {
        console.log("      " + JSON.stringify(obj))
    } else {
        if (!opts) opts = {};

        let excludeFields;
        let loopFields;
        if (opts.exclude) {
            excludeFields = opts.exclude;
            loopFields = Object.keys(obj);
        } else if (opts.fields) {
            loopFields = opts.fields;
            excludeFields = [];
        } else {
            loopFields = Object.keys(obj);
            excludeFields = [];
        }
        for (var i = 0; i < loopFields.length; i++) {
            if (excludeFields.indexOf(loopFields[i]) != -1) {
                continue;
            }
            if (typeof(obj[loopFields[i]]) == 'object') {
                console.log("      " + loopFields[i] + ": " + JSON.stringify(obj[loopFields[i]], null, 2).replace(/\n/g, '\n      '));
            } else {
                console.log("      " + loopFields[i] + ": " + JSON.stringify(obj[loopFields[i]]));
            }
        }
    }
    console.log("");
}


function listNumsStr() {
    let _lstr = '';
    for (let i = 0; i < listnums.length; i++) {
        _lstr += `${listnums[i]},`
    }
    // console.log(_lstr);
    return _lstr;
}

router.get('/rets-client', (req, res, next) => {
    rets.getAutoLogoutClient(clientSettings, (client) => {
        if (checkSessionHeader(client)) {
            // Do rest of the client calls after
            return client.metadata.getResources()
                .then(function (data) {
                }).then(() => {
                    return client.metadata.getClass('Property');
                }).then(() => {
                    return client.metadata.getTable('Property', '*');
                }).then((data) => {
                    return data.results[0].metadata
                }).then((fieldsData) => {
                    let plucked = [];
                    for (let fieldItem = 0; fieldItem < fieldsData.length; fieldItem++) {
                        plucked.push(fieldsData[fieldItem].SystemName);
                    }
                    return plucked;
                }).then((fields) => {
                    return client.search.query("Property", "tt_res", "(dtlastmod=2018-11-16T07:36:46+),(status=|1,3,7)", {
                        limit: reqLimit,
                        offset: 10
                    })
                        .then(function (searchData) {
                            //iterate through search results
                            for (let dataItem = 0; dataItem < searchData.results.length; dataItem++) {
                                searchData.results[dataItem].image =
                                    `http://assets.utahrealestate.com/photos/640x480/${searchData.results[dataItem].image}`;
                                //<editor-fold desc="new Property Object">
                                let newProperty = new Property({
                                    listno: searchData.results[dataItem].listno, //mls
                                    accessibility: searchData.results[dataItem].accessibility,
                                    agent: searchData.results[dataItem].agent,
                                    agtfirst: searchData.results[dataItem].agtfirst,
                                    agtinitial: searchData.results[dataItem].agtinitial,
                                    agtlast: searchData.results[dataItem].agtlast,
                                    aircon: searchData.results[dataItem].aircon,
                                    amenities: searchData.results[dataItem].amenities,
                                    animals: searchData.results[dataItem].animals,
                                    area: searchData.results[dataItem].area,
                                    basement: searchData.results[dataItem].basement,
                                    basmntfin: searchData.results[dataItem].basmntfin,
                                    capcarport: searchData.results[dataItem].capcarport,
                                    capgarage: searchData.results[dataItem].capgarage,
                                    capparking: searchData.results[dataItem].capparking,
                                    cdom: searchData.results[dataItem].cdom,
                                    city: searchData.results[dataItem].city,
                                    coagent: searchData.results[dataItem].coagent,
                                    coagtfirst: searchData.results[dataItem].coagtfirst,
                                    coagtinitial: searchData.results[dataItem].coagtinitial,
                                    coagtlast: searchData.results[dataItem].coagtlast,
                                    conststatus: searchData.results[dataItem].conststatus,
                                    contact: searchData.results[dataItem].contact,
                                    contactph1: searchData.results[dataItem].contactph1,
                                    contactph2: searchData.results[dataItem].contactph2,
                                    contacttype: searchData.results[dataItem].contacttype,
                                    contactvoicetdd1: searchData.results[dataItem].contactvoicetdd1,
                                    contactvoicetdd2: searchData.results[dataItem].contactvoicetdd2,
                                    coordew: searchData.results[dataItem].coordew,
                                    coordns: searchData.results[dataItem].coordns,
                                    countycode: searchData.results[dataItem].countycode,
                                    deck: searchData.results[dataItem].deck,
                                    dimacres: searchData.results[dataItem].dimacres,
                                    dimback: searchData.results[dataItem].dimback,
                                    dimfrontage: searchData.results[dataItem].dimfrontage,
                                    dimirregular: searchData.results[dataItem].dimirregular,
                                    dimside: searchData.results[dataItem].dimside,
                                    dirpost: searchData.results[dataItem].dirpost,
                                    dirpre: searchData.results[dataItem].dirpre,
                                    dom: searchData.results[dataItem].dom,
                                    driveway: searchData.results[dataItem].driveway,
                                    dtcontract: searchData.results[dataItem].dtcontract,
                                    dtentry: searchData.results[dataItem].dtentry,
                                    dtlastmod: searchData.results[dataItem].dtlastmod,
                                    dtlist: searchData.results[dataItem].dtlist,
                                    dtphoto: searchData.results[dataItem].dtphoto,
                                    dtpricechange: searchData.results[dataItem].dtpricechange,
                                    dtstat: searchData.results[dataItem].dtstat,
                                    envcertification: searchData.results[dataItem].envcertification,
                                    exclusions: searchData.results[dataItem].exclusions,
                                    exterior: searchData.results[dataItem].exterior,
                                    featuresext: searchData.results[dataItem].featuresext,
                                    featuresint: searchData.results[dataItem].featuresint,
                                    floor: searchData.results[dataItem].floor,
                                    frontface: searchData.results[dataItem].frontface,
                                    garage: searchData.results[dataItem].garage,
                                    hascommunitypool: searchData.results[dataItem].hascommunitypool,
                                    hashoa: searchData.results[dataItem].hashoa,
                                    haspool: searchData.results[dataItem].haspool,
                                    hasspa: searchData.results[dataItem].hasspa,
                                    heating: searchData.results[dataItem].heating,
                                    hoaamenities: searchData.results[dataItem].hoaamenities,
                                    hoafee: searchData.results[dataItem].hoafee,
                                    hoaterms: searchData.results[dataItem].hoaterms,
                                    housenum: searchData.results[dataItem].housenum,
                                    image: searchData.results[dataItem].image,
                                    inclusions: searchData.results[dataItem].inclusions,
                                    inetvis: searchData.results[dataItem].inetvis,
                                    landscape: searchData.results[dataItem].landscape,
                                    latitude: searchData.results[dataItem].latitude,
                                    lev1bathfull: searchData.results[dataItem].lev1bathfull,
                                    lev1bathhalf: searchData.results[dataItem].lev1bathhalf,
                                    lev1bathtq: searchData.results[dataItem].lev1bathtq,
                                    lev1bed: searchData.results[dataItem].lev1bed,
                                    lev1den: searchData.results[dataItem].lev1den,
                                    lev1diningf: searchData.results[dataItem].lev1diningf,
                                    lev1dinings: searchData.results[dataItem].lev1dinings,
                                    lev1famroom: searchData.results[dataItem].lev1famroom,
                                    lev1fireplace: searchData.results[dataItem].lev1fireplace,
                                    lev1formalliving: searchData.results[dataItem].lev1formalliving,
                                    lev1kitchenb: searchData.results[dataItem].lev1kitchenb,
                                    lev1kitchenk: searchData.results[dataItem].lev1kitchenk,
                                    lev1laundry: searchData.results[dataItem].lev1laundry,
                                    lev1sqf: searchData.results[dataItem].lev1sqf,
                                    lev2bathfull: searchData.results[dataItem].lev2bathfull,
                                    lev2bathhalf: searchData.results[dataItem].lev2bathhalf,
                                    lev2bathtq: searchData.results[dataItem].lev2bathtq,
                                    lev2bed: searchData.results[dataItem].lev2bed,
                                    lev2den: searchData.results[dataItem].lev2den,
                                    lev2diningf: searchData.results[dataItem].lev2diningf,
                                    lev2dinings: searchData.results[dataItem].lev2dinings,
                                    lev2famroom: searchData.results[dataItem].lev2famroom,
                                    lev2fireplace: searchData.results[dataItem].lev2fireplace,
                                    lev2formalliving: searchData.results[dataItem].lev2formalliving,
                                    lev2kitchenb: searchData.results[dataItem].lev2kitchenb,
                                    lev2kitchenk: searchData.results[dataItem].lev2kitchenk,
                                    lev2laundry: searchData.results[dataItem].lev2laundry,
                                    lev2sqf: searchData.results[dataItem].lev2sqf,
                                    lev3bathfull: searchData.results[dataItem].lev3bathfull,
                                    lev3bathhalf: searchData.results[dataItem].lev3bathhalf,
                                    lev3bathtq: searchData.results[dataItem].lev3bathtq,
                                    lev3bed: searchData.results[dataItem].lev3bed,
                                    lev3den: searchData.results[dataItem].lev3den,
                                    lev3diningf: searchData.results[dataItem].lev3diningf,
                                    lev3dinings: searchData.results[dataItem].lev3dinings,
                                    lev3famroom: searchData.results[dataItem].lev3famroom,
                                    lev3fireplace: searchData.results[dataItem].lev3fireplace,
                                    lev3formalliving: searchData.results[dataItem].lev3formalliving,
                                    lev3kitchenb: searchData.results[dataItem].lev3kitchenb,
                                    lev3kitchenk: searchData.results[dataItem].lev3kitchenk,
                                    lev3laundry: searchData.results[dataItem].lev3laundry,
                                    lev3sqf: searchData.results[dataItem].lev3sqf,
                                    lev4bathfull: searchData.results[dataItem].lev4bathfull,
                                    lev4bathhalf: searchData.results[dataItem].lev4bathhalf,
                                    lev4bathtq: searchData.results[dataItem].lev4bathtq,
                                    lev4bed: searchData.results[dataItem].lev4bed,
                                    lev4den: searchData.results[dataItem].lev4den,
                                    lev4diningf: searchData.results[dataItem].lev4diningf,
                                    lev4dinings: searchData.results[dataItem].lev4dinings,
                                    lev4famroom: searchData.results[dataItem].lev4famroom,
                                    lev4fireplace: searchData.results[dataItem].lev4fireplace,
                                    lev4formalliving: searchData.results[dataItem].lev4formalliving,
                                    lev4kitchenb: searchData.results[dataItem].lev4kitchenb,
                                    lev4kitchenk: searchData.results[dataItem].lev4kitchenk,
                                    lev4laundry: searchData.results[dataItem].lev4laundry,
                                    lev4sqf: searchData.results[dataItem].lev4sqf,
                                    levbbathfull: searchData.results[dataItem].levbbathfull,
                                    levbbathhalf: searchData.results[dataItem].levbbathhalf,
                                    levbbathtq: searchData.results[dataItem].levbbathtq,
                                    levbbed: searchData.results[dataItem].levbbed,
                                    levbden: searchData.results[dataItem].levbden,
                                    levbdiningf: searchData.results[dataItem].levbdiningf,
                                    levbdinings: searchData.results[dataItem].levbdinings,
                                    levbfamroom: searchData.results[dataItem].levbfamroom,
                                    levbfireplace: searchData.results[dataItem].levbfireplace,
                                    levbformalliving: searchData.results[dataItem].levbformalliving,
                                    levbkitchenb: searchData.results[dataItem].levbkitchenb,
                                    levbkitchenk: searchData.results[dataItem].levbkitchenk,
                                    levblaundry: searchData.results[dataItem].levblaundry,
                                    levbsqf: searchData.results[dataItem].levbsqf,
                                    listprice: searchData.results[dataItem].listprice,
                                    listpriceoriginal: searchData.results[dataItem].listpriceoriginal,
                                    listpriceprevious: searchData.results[dataItem].listpriceprevious,
                                    longitude: searchData.results[dataItem].longitude,
                                    longitudeabs: searchData.results[dataItem].longitudeabs,
                                    lotfacts: searchData.results[dataItem].lotfacts,
                                    maintfree: searchData.results[dataItem].maintfree,
                                    mapvisible: searchData.results[dataItem].mapvisible,
                                    masterbedroom: searchData.results[dataItem].masterbedroom,
                                    nonstandaddress: searchData.results[dataItem].nonstandaddress,
                                    office: searchData.results[dataItem].office,
                                    offname: searchData.results[dataItem].offname,
                                    ownertype: searchData.results[dataItem].ownertype,
                                    patio: searchData.results[dataItem].patio,
                                    pets: searchData.results[dataItem].pets,
                                    photocount: searchData.results[dataItem].photocount,
                                    pool: searchData.results[dataItem].pool,
                                    possession: searchData.results[dataItem].possession,
                                    premarket: searchData.results[dataItem].premarket,
                                    pricepresqf: searchData.results[dataItem].pricepresqf,
                                    projectrestrict: searchData.results[dataItem].projectrestrict,
                                    proptype: searchData.results[dataItem].proptype,
                                    publicremarks: searchData.results[dataItem].publicremarks,
                                    quadrant: searchData.results[dataItem].quadrant,
                                    roof: searchData.results[dataItem].roof,
                                    rvpkgheight: searchData.results[dataItem].rvpkgheight,
                                    rvpkglength: searchData.results[dataItem].rvpkglength,
                                    schooldistrict: searchData.results[dataItem].schooldistrict,
                                    schoolelem: searchData.results[dataItem].schoolelem,
                                    schooljunior: searchData.results[dataItem].schooljunior,
                                    schoolother: searchData.results[dataItem].schoolother,
                                    schoolprivate: searchData.results[dataItem].schoolprivate,
                                    schoolsenior: searchData.results[dataItem].schoolsenior,
                                    seniorcommunity: searchData.results[dataItem].seniorcommunity,
                                    shortsale: searchData.results[dataItem].shortsale,
                                    shortsalereview: searchData.results[dataItem].shortsalereview,
                                    state: searchData.results[dataItem].state,
                                    status: searchData.results[dataItem].status,
                                    storage: searchData.results[dataItem].storage,
                                    street: searchData.results[dataItem].street,
                                    streettype: searchData.results[dataItem].streettype,
                                    style: searchData.results[dataItem].style,
                                    subdivision: searchData.results[dataItem].subdivision,
                                    taxes: searchData.results[dataItem].taxes,
                                    taxid: searchData.results[dataItem].taxid,
                                    telcom: searchData.results[dataItem].telcom,
                                    terms: searchData.results[dataItem].terms,
                                    totbath: searchData.results[dataItem].totbath,
                                    totbathfull: searchData.results[dataItem].totbathfull,
                                    totbathhalf: searchData.results[dataItem].totbathhalf,
                                    totbathtq: searchData.results[dataItem].totbathtq,
                                    totbed: searchData.results[dataItem].totbed,
                                    totden: searchData.results[dataItem].totden,
                                    totdiningf: searchData.results[dataItem].totdiningf,
                                    totdinings: searchData.results[dataItem].totdinings,
                                    totfamroom: searchData.results[dataItem].totfamroom,
                                    totfireplace: searchData.results[dataItem].totfireplace,
                                    totformalliving: searchData.results[dataItem].totformalliving,
                                    totkitchenb: searchData.results[dataItem].totkitchenb,
                                    totkitchenk: searchData.results[dataItem].totkitchenk,
                                    totlaundry: searchData.results[dataItem].totlaundry,
                                    totsqf: searchData.results[dataItem].totsqf,
                                    totsqfgla: searchData.results[dataItem].totsqfgla,
                                    ts: searchData.results[dataItem].ts,
                                    unitnbr: searchData.results[dataItem].unitnbr,
                                    utilities: searchData.results[dataItem].utilities,
                                    virttour: searchData.results[dataItem].virttour,
                                    water: searchData.results[dataItem].water,
                                    watershares: searchData.results[dataItem].watershares,
                                    windows: searchData.results[dataItem].windows,
                                    yearblt: searchData.results[dataItem].yearblt,
                                    yearremodeled: searchData.results[dataItem].yearremodeled,
                                    zip: searchData.results[dataItem].zip,
                                    zoning: searchData.results[dataItem].zoning,
                                    zoningchar: searchData.results[dataItem].zoningchar
                                });
                                //</editor-fold>
                                //persist properties to local db
                                Property.storeProperty(newProperty, (err, callback) => {
                                    if (err) {
                                        // host server sucks so stop when it shits its pants
                                        return false;
                                    }
                                });
                                //add mls numbers to array to search for photos
                                listnums.push(searchData.results[dataItem].listno);

                            }//================================= END FOR LOOP =========================================

                            if (searchData.maxRowsExceeded) {
                                console.log("   -------- More rows available!");
                            }
                            console.log('end property query');
                            res.json({
                                data: searchData,
                                status: 200
                            });
                        });
                });
        } else {
            console.log("Error in checkSessionHeader, returned FALSE");
        }
    });
});

function scrapeMedia(listno) {
    rets.getAutoLogoutClient(clientSettings, (client) => {
        if (checkSessionHeader(client)) {
            return client.metadata.getResources()
                .then(function (data) {
                }).then(() => {
                    return client.metadata.getClass('Property');
                }).then(() => {
                    return client.metadata.getTable('Property', '*');
                }).then((data) => {
                    return data.results[0].metadata
                }).then((fieldsData) => {
                    let plucked = [];
                    for (let fieldItem = 0; fieldItem < fieldsData.length; fieldItem++) {
                        plucked.push(fieldsData[fieldItem].SystemName);
                    }
                    return plucked;
                }).then(() => {
                    return client.search.query("Media", "Media", `(listno=${listno})`, {
                        limit: reqLimit,
                        offset: 10
                    });
                }).then((results) => {
                    mediaArray.push(results);
                    console.log(`mediaArray ${listno}`);
                });
        }
    });
}

router.get('/get-media', (req, res, next) => {
    rets.getAutoLogoutClient(clientSettings, (client) => {
        if (checkSessionHeader(client)) {
            return client.metadata.getResources()
                .then(function (data) {
                }).then(() => {
                    return client.metadata.getClass('Property');
                }).then(() => {
                    return client.metadata.getTable('Property', '*');
                }).then((data) => {
                    return data.results[0].metadata
                }).then((fieldsData) => {
                    let plucked = [];
                    for (let fieldItem = 0; fieldItem < fieldsData.length; fieldItem++) {
                        plucked.push(fieldsData[fieldItem].SystemName);
                    }
                    return plucked;
                }).then(() => {
                    return client.search.query("Media", "Media", `(listno=${req.query.listno})`, {
                        limit: reqLimit,
                        offset: 10
                    });
                }).then((results) => {
                    const picData = {
                        caption: results.caption,
                        url: results.url
                    };
                    res.json({results});
                });
        }
    });
});

router.get('/rets-client-media', (req, res, next) => {
    rets.getAutoLogoutClient(clientSettings, function (client) {
        console.log("===================================");
        console.log("========  System Metadata  ========");
        console.log("===================================");
        console.log('   ~~~~~~~~~ Header Info ~~~~~~~~~');
        outputFields(client.loginHeaderInfo);
        console.log('   ~~~~~~~~~ System Data ~~~~~~~~~');
        outputFields(client.systemData);

        //get resources metadata
        return client.metadata.getResources()
            .then(function (data) {
                console.log("======================================");
                console.log("========  Resources Metadata  ========");
                console.log("======================================");
                console.log('   ~~~~~~~~~ Header Info ~~~~~~~~~');
                outputFields(data.headerInfo);
                console.log('   ~~~~~~ Resources Metadata ~~~~~');
                outputFields(data.results[0].info);
                for (var dataItem = 0; dataItem < data.results[0].metadata.length; dataItem++) {
                    console.log("   -------- Resource " + dataItem + " --------");
                    outputFields(data.results[0].metadata[dataItem], {fields: ['ResourceID', 'StandardName', 'VisibleName', 'ObjectVersion']});
                }
            }).then(function () {

                //get class metadata
                return client.metadata.getClass("Media");
            }).then(function (data) {
                console.log("===========================================================");
                console.log("========  Class Metadata (from Media Resource)  ========");
                console.log("===========================================================");
                console.log('   ~~~~~~~~~ Header Info ~~~~~~~~~');
                outputFields(data.headerInfo);
                console.log('   ~~~~~~~~ Class Metadata ~~~~~~~');
                outputFields(data.results[0].info);
                for (var classItem = 0; classItem < data.results[0].metadata.length; classItem++) {
                    console.log("   -------- Table " + classItem + " --------");
                    outputFields(data.results[0].metadata[classItem], {fields: ['ClassName', 'StandardName', 'VisibleName', 'TableVersion']});
                }
            });
    });
});

module.exports = router;

