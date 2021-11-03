const express = require("express");
const router = express.Router();
const Blog = require("../db/blog.js");

const errorData = require("./error.js");
const successData = require("./success.js");

router.get("/blog/list", (req, res) => {
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

router.post("/blog/add", (req, res) => {
    Blog.insertOne(req.body).then((data) => {
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

router.post("/blog/update", (req, res) => {
    const { _id, ...data } = req.body;
    Blog.updateOne({ _id, data }).then((data) => {
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

router.post("/blog/delete", (req, res) => {
    Blog.deleteOne(req.body).then((data) => {
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

router.post("/blog/deleteMany", (req, res) => {
    Blog.deleteMany(req.body).then((data) => {
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