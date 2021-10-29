const express = require("express");
const router = express.Router();
const userList = [];
const chatList = [];
router.ws("/chat", (ws, req) => {
    console.log('收到ws聊天连接');
    if (!(userList.find(item => item === ws))) {
        userList.push(ws); // 存储所有的websocket连接
    }
    ws.send(JSON.stringify({
        list: chatList,
    }));
    ws.on('message', function (req) {
        let data = JSON.parse(req);
        chatList.push(data);
        for (let i = 0; i < userList.length; i++) {
            userList[i].send(JSON.stringify({
                list: chatList,
            }));
        } // 给所有websoket用户发送实时信息
    })
    ws.on('close', function (req) {
        for (let i = 0; i < userList.length; i++) {
            if (userList[i] === ws) {
                userList.splice(i, 1);
                break;
            }
        }
    })
})

module.exports = router;