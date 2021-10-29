const express = require("express");
const router = express.Router();
const User = require("../db/user.js");

const errorData = require("./error.js");
const successData = require("./success.js");

router.get("/user/list", (req, res) => {
    User.find(req.query).then((data) => {
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

router.post("/user/add", (req, res) => {
    User.insertOne(req.body).then((data) => {
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

router.post("/user/update", (req, res) => {
    const { _id, ...data } = req.body;
    User.updateOne({ _id, data }).then((data) => {
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

router.post("/user/delete", (req, res) => {
    User.deleteOne(req.body).then((data) => {
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

router.post("/user/deleteMany", (req, res) => {
    User.deleteMany(req.body).then((data) => {
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