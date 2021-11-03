const express = require("express");
const webscoket = require("express-ws");
const session = require("express-session");
const TOKEN = require("./utils/token.js");
const expressJwt = require("express-jwt");
const path = require("path");
const app = express();
const PORT = require("./utils/port.js"); // 服务端口
const getIp = require("./utils/getIp.js");

/** 设置允许跨域 */
app.all("*", function (req, res, next) {
    let originHeader = req.headers.origin;
    res.header("Access-Control-Allow-Origin", originHeader);
    // 设置允许跨域的域名，*代表允许任意域名跨域
    // res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type, authorization");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    if (req.method.toLowerCase() == 'options')
        res.sendStatus(200); //让options尝试请求快速结束
    else {
        next();
    }
})
webscoket(app);
app.use(express.static(path.join(__dirname, 'views'))); // 设置静态资源读取目录
app.use(express.json());
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1 * 60 * 1000
    }
}))

// 获取token得到用户信息
app.use((req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        TOKEN.getToken(token).then(data => {
            console.log('token信息', data);
            next();
        }).catch((err) => {
            next();
        })
    } else {
        next();
    }
})

// 验证token是否过期并规定哪些接口不需要验证token
app.use(expressJwt({
    secret: TOKEN.jwtSign, // 签名
    algorithms: ['HS256'] // 算法
}).unless({
    path: ['/captcha', '/login', /^\/uploads\/.*/, /^\/web\/.*/] // 不需要验证的接口集合
}))

// token验证错误回调
app.use((err, req, res, next) => {
    if (err.status === 401) {
        return res.status(200).send({
            code: 401,
            msg: 'error',
            data: {
                msg: 'token失效,请重新登录'
            }
        })
    }
})

const login = require("./routes/login");
const chat = require("./routes/chat");
const user = require("./routes/user");
const upload = require("./routes/upload");
const site = require("./routes/site");
const profile = require("./routes/profile");
const contact = require("./routes/contact");
const blog = require("./routes/blog");
const web = require("./routes/web");
const index = require("./routes");
app.use(login);
app.use(index);
app.use(site);
app.use(profile);
app.use(contact);
app.use(blog);
app.use(upload);
app.use(chat);
app.use(user);
app.use(web);

app.listen(PORT, () => {
    let d = new Date();
    let dateTime = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    console.log(`启动时间:${dateTime} ----`, getIp(PORT), '----- 服务已经启动成功');
})