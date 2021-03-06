const connect = require('./connect.js'); // 引入mongodb模块，获得客户端对象

const {
    idFormatter,
    filterData
} = require("../utils/idFormatter.js");
const pageFormatter = require("../utils/pageFormatter.js");

// contact表视图模型
const model = ['name', 'email', 'message', 'createTime'];

module.exports = {
    /** 查询多条数据 */
    find(data) {
        return new Promise((resolve, reject) => {
            connect('contact').then(async ({
                mongodb,
                collection
            }) => {
                data = pageFormatter(data);
                let total = await collection.find().count(); // 获取总页数
                collection.find(filterData(model, data, 'select')).skip(Number(data.pageSize) * (Number(data.pageNum) - 1)).limit(Number(data.pageSize)).toArray((err, result) => {
                    err ? reject({
                        msg: '查询失败'
                    }) : resolve({
                        data: result,
                        total,
                        msg: '查询成功'
                    });
                    mongodb.close(); // 关闭数据库
                })
            });
        });
    },

    /** 插入单条数据 */
    insertOne(data) {
        return new Promise((resolve, reject) => {
            connect('contact').then(({
                mongodb,
                collection
            }) => {
                collection.insertOne(filterData(model, data, 'insert')).then(result => {
                    result ? resolve({
                        data: result,
                        msg: '添加成功'
                    }) : reject({
                        msg: '添加失败'
                    });
                    mongodb.close(); // 关闭数据库
                })
            });
        });
    },

    /** 查询单个数据 */
    findOne(data) {
        return new Promise((resolve, reject) => {
            connect('contact').then(({
                mongodb,
                collection
            }) => {
                collection.findOne(filterData(model, data), {
                    projection: {
                        name: 1,
                        email: 1,
                        message: 1,
                        createTime: 1,
                        _id: 1
                    }
                }).then(result => {
                    result ? resolve({
                        data: result,
                        msg: '登录成功'
                    }) : reject({
                        msg: '用户名或密码错误'
                    });
                    mongodb.close(); // 关闭数据库
                })
            });
        });
    },

    /** 单条数据详情 */
    userDetail(data) {
        return new Promise((resolve, reject) => {
            connect('contact').then(({
                mongodb,
                collection
            }) => {
                collection.findOne({
                    _id: idFormatter(data._id)
                }, {
                    projection: {
                        name: 1,
                        email: 1,
                        message: 1,
                        createTime: 1,
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
            connect('contact').then(({
                mongodb,
                collection
            }) => {
                collection.updateOne({
                    _id: idFormatter(data._id)
                }, {
                    $set: filterData(model, data.data, 'update')
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
    },

    /** 删除单挑数据 */
    deleteOne(data) {
        return new Promise((resolve, reject) => {
            connect('contact').then(({
                mongodb,
                collection
            }) => {
                collection.deleteOne({
                    _id: idFormatter(data._id)
                }).then(result => {
                    result.deletedCount ? resolve({
                        data: result,
                        msg: '删除成功'
                    }) : reject({
                        msg: '删除失败'
                    });
                    mongodb.close(); // 关闭数据库
                })
            });
        });
    },

    /** 删除多条数据 */
    deleteMany(data) {
        return new Promise((resolve, reject) => {
            connect('contact').then(({
                mongodb,
                collection
            }) => {
                collection.deleteMany({
                    _id: {
                        $in: data.map(id => idFormatter(id))
                    }
                }).then(result => {
                    result ? resolve({
                        data: result,
                        msg: '删除成功'
                    }) : reject({
                        msg: '删除失败'
                    });
                    mongodb.close(); // 关闭数据库
                })
            });
        });
    },
}