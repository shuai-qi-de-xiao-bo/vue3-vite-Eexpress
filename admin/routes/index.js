const express = require("express");
const router = express.Router();
const path = require("path");
const request = require('request');
const errorData = require("./error.js");
const successData = require("./success.js");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
})

// 获取天气
router.get("/weather", (req, res) => {
    let params = "?";
    for (let key in req.query) {
        params += `&${key}=${req.query[key]}`;
    }
    request({
        url: 'https://api.open-meteo.com/v1/forecast' + params,
        method: 'GET'
    }, (error, response, body) => {
        res.status(200).send({
            ...successData,
            data: JSON.parse(body)
        });
    })
})

module.exports = router;