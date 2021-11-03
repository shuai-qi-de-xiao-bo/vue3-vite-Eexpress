const express = require("express");
const router = express.Router();
const Profile = require("../db/profile.js");

const errorData = require("./error.js");
const successData = require("./success.js");

router.get("/profile/list", (req, res) => {
    Profile.findOne(req.query).then((data) => {
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

router.post("/profile/add", (req, res) => {
    Profile.insertOne(req.body).then((data) => {
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

router.post("/profile/update", (req, res) => {
    const { _id, ...data } = req.body;
    Profile.updateOne({ _id, data }).then((data) => {
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