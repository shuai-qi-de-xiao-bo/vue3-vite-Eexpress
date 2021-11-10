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
    Blog.findAll().then(({
        msg,
        data
    }) => {
        let index = data.findIndex(ele => ele._id.toString() === req.query._id);
        if (index !== -1) {
            index = index + Number(req.query.sort);
            res.status(200).send({
                ...successData,
                data: {
                    msg: msg,
                    data: data[index],
                    hasPre: index > 0,
                    hasNext: index < data.length - 1
                }
            })
        } else {
            res.status(200).send({
                ...errorData,
                data
            });
        }
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