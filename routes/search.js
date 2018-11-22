const express = require('express');
const router = express.Router();
const Property = require('../models/property');


router.get('/properties-with-filters', (req, res, next) => {
    const query = req.query;
    //return properties between gte and lte
    if (query.hasOwnProperty('lte') && query.hasOwnProperty('gte')) {
        query.listprice = {$lte: query.lte, $gte: query.gte};// <== this being out of order is bugging me but it works
        delete query.lte;
        delete query.gte;
    } else if (query.hasOwnProperty('gte')) {
        query.listprice = {$gte: query.gte};
        delete query.gte;
    } else if (query.hasOwnProperty('lte')) {
        query.listprice = {$lte: query.lte};
        delete query.lte;
    }
    Property.searchProperties(query, (err, callback) => {
        if (err) throw err;
        res.json({
            status: 200,
            data: callback,
            query: query
        });
    });
});

router.get('/all-properties', (req, res, next) => {
    Property.getAllProperties({}, (err, data) => {
        if(err) res.json({error: err});
        res.json({data});
    });
});

module.exports = router;