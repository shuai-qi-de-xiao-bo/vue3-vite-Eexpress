const express = require("express");
const router = express.Router();
const createCaptcha = require("../utils/captcha");
const User = require("../db/user.js");
const TOKEN = require("../utils/token.js");

const errorData = require("./error.js");
const successData = require("./success.js");

// 获取验证码
router.get("/captcha", (req, res) => {
    const num = Math.random().toString().slice(2, 6);
    let newCap = createCaptcha(num);
    req.session.code = num;
    res.status(200).send({
        ...successData,
        data: {
            src: newCap
        }
    });
})

// 用户登录
router.post("/login", (req, res) => {
    const { code, ...data } = req.body;
    if (code === req.session.code) {
        User.findOne(data).then((result) => {
            // 登陆成功生成相应token
            TOKEN.setToken(result.data).then(token => {
                res.status(200).send({
                    ...successData,
                    data: {
                        ...result,
                        token: 'Bearer ' + token
                    }
                });
            })
        }).catch((data) => {
            res.status(200).send({
                ...errorData,
                data
            });
        });
    } else {
        res.status(200).send({
            ...errorData,
            data: {
                msg: req.session.code ? "验证码错误" : "验证码已过期"
            }
        });
    }
})

module.exports = router;