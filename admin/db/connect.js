const MongoClient = require('mongodb').MongoClient; // 引入mongodb模块，获得客户端对象

const DB_URL = 'mongodb://localhost:27017'; // 数据库地址

const DB_BASE = 'blog'; // 数据库名

/** 
 * @param {string} table - 表名
 * @description 连接数据库 
 */
const connect = (table) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(DB_URL, {
            useUnifiedTopology: true
        }, (err, mongodb) => {
            if (err) {
                console.log('数据库连接失败，错误原因: ', err);
                reject();
            } else {
                const collection = mongodb.db(DB_BASE).collection(table); // 连接[DB_BASE]数据库的[table]表
                resolve({ mongodb, collection }); // 执行数据库操作
            }
        })
    });
}

module.exports = connect;