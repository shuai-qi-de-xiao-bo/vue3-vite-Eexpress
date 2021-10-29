const getStore = (key) => {
    let data = window.localStorage.getItem(key);
    try {
        data = JSON.parse(data);
    } catch(err) {}
    return data;
}

const user = {
    state: {
        userInfo: getStore("userInfo") || null,
        token: getStore("token") || "",
    },
    
    mutations: {
        SET_USER_INFO: (state, userInfo) => {
            state.userInfo = userInfo;
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
        },
        SET_TOKEN: (state, token) => {
            state.token = token;
            localStorage.setItem("token", token);
        },
    },

    actions: {

    },
}

export default user;