const express = require("express");
const router = express.Router();
const Site = require("../db/site.js");

const errorData = require("./error.js");
const successData = require("./success.js");

router.get("/site/list", (req, res) => {
    Site.findOne(req.query).then((data) => {
        res.status(200).send({
            ...successData,
            data
        })
    }).catch((data) => {
        res.status(200).send({
            ...errorData,
            data
        });
    });
})

router.post("/site/add", (req, res) => {
    Site.insertOne(req.body).then((data) => {
        res.status(200).send({
            ...successData,
            data
        })
    }).catch((data) => {
        res.status(200).send({
            ...errorData,
            data
        });
    });
})

router.post("/site/update", (req, res) => {
    const { _id, ...data } = req.body;
    Site.updateOne({ _id, data }).then((data) => {
        res.status(200).send({
            ...successData,
            data
        })
    }).catch((data) => {
        res.status(200).send({
            ...errorData,
            data
        });
    });
})

module.exports = router;