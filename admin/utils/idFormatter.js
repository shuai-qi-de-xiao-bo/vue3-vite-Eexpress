const {
    ObjectId
} = require('mongoose').Types;
const {
    dateFormatter
} = require("../utils/index.js");

const idFormatter = (id) => {
    try {
        id = ObjectId(id);
    } catch (err) {
        console.log(err);
    }
    return id;
}

const filterData = (model, data = {}, type) => {
    let body = {};
    model.forEach(key => {
        if (key in data) {
            key === '_id' ? (body[key] = idFormatter(data[key])) : (body[key] = data[key]);
        }
    });
    switch (type) {
        case 'insert':
            return Object.assign(body, {
                createTime: dateFormatter(),
                updateTime: dateFormatter()
            });
        case 'update':
            return Object.assign(body, {
                updateTime: dateFormatter()
            });
        case 'select':
            for (let key in body) {
                body[key] = {
                    $regex: body[key] || ''
                }
            }
            return body;
        default:
            return body;
    }
}

module.exports = { idFormatter, filterData }