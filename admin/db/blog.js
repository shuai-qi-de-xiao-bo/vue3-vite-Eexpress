const connect = require('./connect.js'); // 引入mongodb模块，获得客户端对象

const {
    idFormatter,
    filterData
} = require("../utils/idFormatter.js");
const pageFormatter = require("../utils/pageFormatter.js");

// blog表视图模型
const model = ['_id', 'title', 'content', 'createTime', 'updateTime'];

module.exports = {
    /** 查询多条数据 */
    find(data) {
        return new Promise((resolve, reject) => {
            connect('blog').then(async ({
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

    /** 查询全部数据 */
    findAll() {
        return new Promise((resolve, reject) => {
            connect('blog').then(async ({
                mongodb,
                collection
            }) => {
                collection.find().toArray((err, result) => {
                    err ? reject({
                        msg: '查询失败'
                    }) : resolve({
                        data: result,
                        msg: '查询成功'
                    });
                    mongodb.close(); // 关闭数据库
                })
            });
        });
    },

    /** 上一条&下一条 */
    findNext(id, type) {
        const rule = {
            "0": {
                expression: (_id) => {
                    return {
                        '_id': idFormatter(_id)
                    }
                },
                sort: 1
            },
            "1": {
                expression: (_id) => {
                    return {
                        '_id': {
                            '$gt': idFormatter(_id)
                        }
                    }
                },
                sort: 1 // 升序
            },
            "-1": {
                expression: (_id) => {
                    return {
                        '_id': {
                            '$lt': idFormatter(_id)
                        }
                    }
                },
                sort: -1 // 降序
            }
        };
        return new Promise((resolve, reject) => {
            if (!rule[type]) {
                return reject({
                    msg: '参数错误'
                });
            }
            connect('blog').then(async ({
                mongodb,
                collection
            }) => {
                collection.find(rule[type].expression(id)).sort({
                    _id: rule[type].sort
                }).limit(2).toArray((err, result) => {
                    err ? reject({
                        msg: '查询失败'
                    }) : resolve({
                        data: result,
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
            connect('blog').then(({
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
            connect('blog').then(({
                mongodb,
                collection
            }) => {
                collection.findOne(filterData(model, data), {
                    projection: {
                        title: 1,
                        content: 1,
                        createTime: 1,
                        updateTime: 1,
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
            connect('blog').then(({
                mongodb,
                collection
            }) => {
                collection.findOne({
                    _id: idFormatter(data._id)
                }, {
                    projection: {
                        title: 1,
                        content: 1,
                        createTime: 1,
                        updateTime: 1,
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
            connect('blog').then(({
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
            connect('blog').then(({
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
            connect('blog').then(({
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