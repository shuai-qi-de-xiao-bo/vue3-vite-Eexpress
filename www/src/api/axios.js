import Message from 'element-plus/lib/components/message';
import router from '@/router/index.js';
import store from '@/store/index.js';
function Axios () {
    
}

//表单序列化
Axios.prototype.serialize = function(data = {}) {
    let list = Object.keys(data);
    if (!list.length) {
        return '';
    }
    list = list.map(ele => `${ele}=${data[ele]}`);
    return '?' + list.join('&');
};

Axios.prototype.ajax = function (method, url, data, options) {
    return new Promise((resolve, reject) => {
        const baseUrl = (/(https:\/\/)|(http:\/\/)/.test(url) || process.env.NODE_ENV === 'production') ? '' : 'http://localhost:3333/api';
        const xhr = new XMLHttpRequest();
        xhr.open(method, baseUrl + url, true);

        
        for (let key in options) {
            xhr[key] = options[key];
            if (key === "headers") {
                for (let key in options.headers) {
                    xhr.setRequestHeader(key, options.headers[key]);
                }
            }
        }
        // 如果已经登录则设置请求头token
        xhr.setRequestHeader("authorization", localStorage.getItem("token"));

        xhr.send(data);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let data = xhr.response;
                    if (!options.responseType || options.responseType === 'text') {
                        data = JSON.parse(data);
                    }
                    if (data.code === 401) {
                        Message.error(data.data.msg);
                        store.commit('SET_TOKEN', '');
                        router.push({
                            path: '/login'
                        });
                        reject(data.data);
                    }
                    data.code === 200 ? resolve(data.data) : reject(data.data);
                } else {
                    Message.error('请求超时')
                    reject(baseUrl + url + '请求超时');
                }
            }
        }
        xhr.onerror = function() {
            console.log(xhr.responseText);
        }
    })
}

Axios.prototype.get = function (options) {
    let { url, data, params, ...config } = options;
    config = Object.assign({
        withCredentials: true,
        timeout: 4 * 1000, // 设置超时时间
    }, config);
    return this.ajax("GET", url + this.serialize(params), null, config);
}

Axios.prototype.post = function (options) {
    let { url, data, params, ...config } = options;
    config = Object.assign({
        headers: data instanceof FormData ? {} : {
            "Content-Type": "application/json;charset=UTF-8"
        },
        responseType: "json",
        withCredentials: true,
        timeout: 4 * 1000, // 设置超时时间
    }, config);
    return this.ajax("POST", url + this.serialize(params), data instanceof FormData ? data : JSON.stringify(data), config);
}


export default new Axios();