const express = require('express');
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio');

const url = `http://homerebates.com/repository_queries/search_mls_listings.php?query=&options[property_type]=residential&options[order_by]=dtlist&options[order]=DESC&options[active]=true&options[backup]=true&options[contract]=false&options[totsqf]=0&options[dimacres]=0&options[yearblt]=0&options[opens]=0&options[zipcode]=84404,84315`;

router.get('/hrr', (req, res) => {
    // const uri = `${url}${req.params.id}`
    request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            res.json({
                response: response.statusCode,
                data: JSON.parse(response.body)
            });
        }
        if (error) {
            res.json({
                status: response.statusCode,
                err: error
            });
        }
    });
});
//
// router.get('/map-icon', (req, res) => {
//     res.sendFile('../assets/images/icon_house.png');
// });

module.exports = router;