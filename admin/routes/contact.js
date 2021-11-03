const express = require("express");
const router = express.Router();
const Contact = require("../db/contact.js");

const errorData = require("./error.js");
const successData = require("./success.js");

router.get("/contact/list", (req, res) => {
    Contact.find(req.query).then((data) => {
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

router.post("/contact/add", (req, res) => {
    Contact.insertOne(req.body).then((data) => {
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

router.post("/contact/update", (req, res) => {
    const { _id, ...data } = req.body;
    Contact.updateOne({ _id, data }).then((data) => {
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

router.post("/contact/delete", (req, res) => {
    Contact.deleteOne(req.body).then((data) => {
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

router.post("/contact/deleteMany", (req, res) => {
    Contact.deleteMany(req.body).then((data) => {
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