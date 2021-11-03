const pageFormatter = (data = {}) => {
    const body = Object.assign({
        pageNum: 1,
        pageSize: 10
    }, data);
    return body;
}

module.exports = pageFormatter;