const mongoose = require('mongoose');

PropertySchema = mongoose.Schema({
    listno: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    accessibility: {
        type: String
    },
    agent: {
        type: String
    },
    agtfirst: {
        type: String
    },
    agtinitial: {
        type: String
    },
    agtlast: {
        type: String
    },
    aircon: {
        type: String
    },
    amenities: {
        type: String
    },
    animals: {
        type: String
    },
    area: {
        type: String
    },
    basement: {
        type: String
    },
    basmntfin: {
        type: String
    },
    capcarport: {
        type: String
    },
    capgarage: {
        type: String
    },
    capparking: {
        type: String
    },
    cdom: {
        type: String
    },
    city: {
        type: String
    },
    coagent: {
        type: String
    },
    coagtfirst: {
        type: String
    },
    coagtinitial: {
        type: String
    },
    coagtlast: {
        type: String
    },
    conststatus: {
        type: String
    },
    contact: {
        type: String
    },
    contactph1: {
        type: String
    },
    contactph2: {
        type: String
    },
    contacttype: {
        type: String
    },
    contactvoicetdd1: {
        type: String
    },
    contactvoicetdd2: {
        type: String
    },
    coordew: {
        type: String
    },
    coordns: {
        type: String
    },
    countycode: {
        type: String
    },
    deck: {
        type: String
    },
    dimacres: {
        type: String
    },
    dimback: {
        type: String
    },
    dimfrontage: {
        type: String
    },
    dimirregular: {
        type: String
    },
    dimside: {
        type: String
    },
    dirpost: {
        type: String
    },
    dirpre: {
        type: String
    },
    dom: {
        type: String
    },
    driveway: {
        type: String
    },
    dtcontract: {
        type: String
    },
    dtentry: {
        type: String
    },
    dtlastmod: {
        type: String
    },
    dtlist: {
        type: String
    },
    dtphoto: {
        type: String
    },
    dtpricechange: {
        type: String
    },
    dtstat: {
        type: String
    },
    envcertification: {
        type: String
    },
    exclusions: {
        type: String
    },
    exterior: {
        type: String
    },
    featuresext: {
        type: String
    },
    featuresint: {
        type: String
    },
    floor: {
        type: String
    },
    frontface: {
        type: String
    },
    garage: {
        type: String
    },
    hascommunitypool: {
        type: String
    },
    hashoa: {
        type: String
    },
    haspool: {
        type: String
    },
    hasspa: {
        type: String
    },
    heating: {
        type: String
    },
    hoaamenities: {
        type: String
    },
    hoafee: {
        type: String
    },
    hoaterms: {
        type: String
    },
    housenum: {
        type: String
    },
    image: {
        type: String
    },
    inclusions: {
        type: String
    },
    inetvis: {
        type: String
    },
    landscape: {
        type: String
    },
    latitude: {
        type: String
    },
    lev1bathfull: {
        type: String
    },
    lev1bathhalf: {
        type: String
    },
    lev1bathtq: {
        type: String
    },
    lev1bed: {
        type: String
    },
    lev1den: {
        type: String
    },
    lev1diningf: {
        type: String
    },
    lev1dinings: {
        type: String
    },
    lev1famroom: {
        type: String
    },
    lev1fireplace: {
        type: String
    },
    lev1formalliving: {
        type: String
    },
    lev1kitchenb: {
        type: String
    },
    lev1kitchenk: {
        type: String
    },
    lev1laundry: {
        type: String
    },
    lev1sqf: {
        type: String
    },
    lev2bathfull: {
        type: String
    },
    lev2bathhalf: {
        type: String
    },
    lev2bathtq: {
        type: String
    },
    lev2bed: {
        type: String
    },
    lev2den: {
        type: String
    },
    lev2diningf: {
        type: String
    },
    lev2dinings: {
        type: String
    },
    lev2famroom: {
        type: String
    },
    lev2fireplace: {
        type: String
    },
    lev2formalliving: {
        type: String
    },
    lev2kitchenb: {
        type: String
    },
    lev2kitchenk: {
        type: String
    },
    lev2laundry: {
        type: String
    },
    lev2sqf: {
        type: String
    },
    lev3bathfull: {
        type: String
    },
    lev3bathhalf: {
        type: String
    },
    lev3bathtq: {
        type: String
    },
    lev3bed: {
        type: String
    },
    lev3den: {
        type: String
    },
    lev3diningf: {
        type: String
    },
    lev3dinings: {
        type: String
    },
    lev3famroom: {
        type: String
    },
    lev3fireplace: {
        type: String
    },
    lev3formalliving: {
        type: String
    },
    lev3kitchenb: {
        type: String
    },
    lev3kitchenk: {
        type: String
    },
    lev3laundry: {
        type: String
    },
    lev3sqf: {
        type: String
    },
    lev4bathfull: {
        type: String
    },
    lev4bathhalf: {
        type: String
    },
    lev4bathtq: {
        type: String
    },
    lev4bed: {
        type: String
    },
    lev4den: {
        type: String
    },
    lev4diningf: {
        type: String
    },
    lev4dinings: {
        type: String
    },
    lev4famroom: {
        type: String
    },
    lev4fireplace: {
        type: String
    },
    lev4formalliving: {
        type: String
    },
    lev4kitchenb: {
        type: String
    },
    lev4kitchenk: {
        type: String
    },
    lev4laundry: {
        type: String
    },
    lev4sqf: {
        type: String
    },
    levbbathfull: {
        type: String
    },
    levbbathhalf: {
        type: String
    },
    levbbathtq: {
        type: String
    },
    levbbed: {
        type: String
    },
    levbden: {
        type: String
    },
    levbdiningf: {
        type: String
    },
    levbdinings: {
        type: String
    },
    levbfamroom: {
        type: String
    },
    levbfireplace: {
        type: String
    },
    levbformalliving: {
        type: String
    },
    levbkitchenb: {
        type: String
    },
    levbkitchenk: {
        type: String
    },
    levblaundry: {
        type: String
    },
    levbsqf: {
        type: String
    },
    listprice: {
        type: Number
    },
    listpriceoriginal: {
        type: Number
    },
    listpriceprevious: {
        type: Number
    },
    longitude: {
        type: String
    },
    longitudeabs: {
        type: String
    },
    lotfacts: {
        type: String
    },
    maintfree: {
        type: String
    },
    mapvisible: {
        type: String
    },
    masterbedroom: {
        type: String
    },
    nonstandaddress: {
        type: String
    },
    office: {
        type: String
    },
    offname: {
        type: String
    },
    ownertype: {
        type: String
    },
    patio: {
        type: String
    },
    pets: {
        type: String
    },
    photocount: {
        type: String
    },
    pool: {
        type: String
    },
    possession: {
        type: String
    },
    premarket: {
        type: String
    },
    pricepresqf: {
        type: String
    },
    projectrestrict: {
        type: String
    },
    proptype: {
        type: String
    },
    publicremarks: {
        type: String
    },
    quadrant: {
        type: String
    },
    roof: {
        type: String
    },
    rvpkgheight: {
        type: String
    },
    rvpkglength: {
        type: String
    },
    schooldistrict: {
        type: String
    },
    schoolelem: {
        type: String
    },
    schooljunior: {
        type: String
    },
    schoolother: {
        type: String
    },
    schoolprivate: {
        type: String
    },
    schoolsenior: {
        type: String
    },
    seniorcommunity: {
        type: String
    },
    shortsale: {
        type: String
    },
    shortsalereview: {
        type: String
    },
    state: {
        type: String
    },
    status: {
        type: String
    },
    storage: {
        type: String
    },
    street: {
        type: String
    },
    streettype: {
        type: String
    },
    style: {
        type: String
    },
    subdivision: {
        type: String
    },
    taxes: {
        type: String
    },
    taxid: {
        type: String
    },
    telcom: {
        type: String
    },
    terms: {
        type: String
    },
    totbath: {
        type: String
    },
    totbathfull: {
        type: String
    },
    totbathhalf: {
        type: String
    },
    totbathtq: {
        type: String
    },
    totbed: {
        type: String
    },
    totden: {
        type: String
    },
    totdiningf: {
        type: String
    },
    totdinings: {
        type: String
    },
    totfamroom: {
        type: String
    },
    totfireplace: {
        type: String
    },
    totformalliving: {
        type: String
    },
    totkitchenb: {
        type: String
    },
    totkitchenk: {
        type: String
    },
    totlaundry: {
        type: String
    },
    totsqf: {
        type: String
    },
    totsqfgla: {
        type: String
    },
    ts: {
        type: String
    },
    unitnbr: {
        type: String
    },
    utilities: {
        type: String
    },
    virttour: {
        type: String
    },
    water: {
        type: String
    },
    watershares: {
        type: String
    },
    windows: {
        type: String
    },
    yearblt: {
        type: String
    },
    yearremodeled: {
        type: String
    },
    zip: {
        type: String
    },
    zoning: {
        type: String
    },
    zoningchar: {
        type: String
    },
    photos: [{
        url: String,
        caption: String
    }]
});

const Property = module.exports = mongoose.model('Property', PropertySchema);

module.exports.storeProperty = (data, callback) => {
    data.save(callback);
};

module.exports.addPics = (data, callback) => {
    let queryTerms = {listno: data.listno};
    let photoData = data;
    Property.findOneAndUpdate(queryTerms, {$push: {photos: photoData}}, callback);
};

module.exports.searchProperties = (query, callback) => {
    // console.log(`model ${JSON.stringify(query)}`);
    Property.find(query, callback);
};

module.exports.getAllProperties = (data, callback) => {
    Property.find(data, callback);
};