const connect = require('./connect.js'); // 引入mongodb模块，获得客户端对象
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

// site表视图模型
const model = ['title', 'background', 'createTime', 'updateTime'];

// 过滤site表没有的字段
const filterData = (data = {}, type) => {
    let body = {};
    model.forEach(key => {
        if (key in data) {
            body[key] = data[key];
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

module.exports = {
    /** 插入单条数据 */
    insertOne(data) {
        return new Promise((resolve, reject) => {
            connect('site').then(({
                mongodb,
                collection
            }) => {
                collection.insertOne(filterData(data, 'insert')).then(result => {
                    result ? resolve({
                        data: result,
                        msg: '添加成功'
                    }) : reject({
                        msg: '添加失败'
                    });
                    mongodb.close(); // 关闭数据库
                });
            });
        });
    },

    /** 查询单个数据 */
    findOne(data) {
        return new Promise((resolve, reject) => {
            connect('site').then(({
                mongodb,
                collection
            }) => {
                collection.findOne(filterData(data), {
                    projection: {
                        title: 1,
                        background: 1,
                        _id: 1
                    }
                }).then(result => {
                    result ? resolve({
                        data: result,
                        msg: '查询成功'
                    }) : reject({
                        msg: '查询失败'
                    });
                    mongodb.close(); // 关闭数据库
                })
            });
        });
    },

    /** 单条数据详情 */
    userDetail(data) {
        return new Promise((resolve, reject) => {
            connect('site').then(({
                mongodb,
                collection
            }) => {
                collection.findOne({
                    _id: idFormatter(data._id)
                }, {
                    projection: {
                        userhead: 1,
                        username: 1,
                        useraccount: 1,
                        _id: 1
                    } // 返回指定的字段
                }).then(result => {
                    result ? resolve({
                        result
                    }) : reject();
                    mongodb.close(); // 关闭数据库
                })
            });
        });
    },

    /** 更新单条数据 */
    updateOne(data) {
        return new Promise((resolve, reject) => {
            connect('site').then(({
                mongodb,
                collection
            }) => {
                collection.updateOne({
                    _id: idFormatter(data._id)
                }, {
                    $set: filterData(data.data, 'update')
                }).then((result) => {
                    result ? resolve({
                        data: result,
                        msg: '修改成功'
                    }) : reject({
                        msg: '修改失败'
                    });
                    mongodb.close(); // 关闭数据库
                })
            });
        });
    }
}