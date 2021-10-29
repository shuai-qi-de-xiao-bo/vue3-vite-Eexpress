const jwt = require("jsonwebtoken");
const jwtSign = "jianguo_token"; // token签名

// 生成token的方法
const setToken = (data) => {
    return new Promise((resolve, reject) => {
        const token = jwt.sign(
            data,
            jwtSign,
            {
                expiresIn: "3600s" // 过期时间
            }
        );
        resolve(token);
    })
}

// 解析token
const getToken = (token) => {
    return new Promise((resolve, reject) => {
        if (!token) {
            reject("用户未登录");
        } else {
            try {
                const data = jwt.verify(token.split(" ")[1], jwtSign);
                resolve(data);
            } catch(err) {
                resolve("无效token");
            }
        }
    })
}

module.exports = {
    jwtSign,
    setToken,
    getToken
}