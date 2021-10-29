const os = require("os");
const netInfo = os.networkInterfaces(); //网络信息
let ip = netInfo["以太网"][1].address;

module.exports = (port) => {
    return `http://${ip}:${port}`;
}