const express = require("express");
const router = express.Router();
const Profile = require("../db/profile.js");
const Contact = require("../db/contact.js");
const Blog = require("../db/blog.js");

const errorData = require("./error.js");
const successData = require("./success.js");

router.get("/web/profile/list", (req, res) => {
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

router.get("/web/blog/list", (req, res) => {
    Blog.find(req.query).then((data) => {
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

router.get("/web/blog/detail", (req, res) => {
    Blog.findOne(req.query).then((data) => {
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

router.post("/web/contact/add", (req, res) => {
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

module.exports = router;