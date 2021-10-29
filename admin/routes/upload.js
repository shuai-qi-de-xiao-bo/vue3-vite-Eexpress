const express = require("express");
const router = express.Router();
const errorData = require("./error.js");
const successData = require("./success.js");
const PORT = require("../utils/port.js"); // 服务端口
const getIp = require("../utils/getIp.js");
const fs = require('fs');
const multer = require('multer');
const upload = multer({
    dest: './uploads/'
}).single('file'); // 文件上传储存路径

// 图片上传
router.post('/upload', function (req, res, next) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError || err) {
            res.status(200).send({
                ...errorData,
                data: {
                    msg: '文件上传失败'
                }
            });
        } else {
            res.status(200).send({
                ...successData,
                data: {
                    msg: '文件上传成功',
                    src: `${getIp(PORT)}/uploads/${req.file.filename}`, //返回图片URL
                }
            });
        }
    })

});

// 获取文件
router.get('/uploads/:name', function (req, res, next) {
    //建议使用绝对路径查找图片
    const rs = fs.createReadStream('./uploads/' + req.params.name);
    rs.pipe(res);
});

module.exports = router;