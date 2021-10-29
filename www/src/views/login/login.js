import {
    reactive,
    ref
} from "vue";
import { login } from "@/api/login";
import Message from 'element-plus/lib/components/message';
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default function (getCaptchaSrc) {
    const router = useRouter();
    const store = useStore();
    
    const loginRef = ref(null);
    const loginForm = reactive({
        username: "",
        password: "",
        code: ""
    });
    const loginRules = reactive({
        username: [{
            required: true,
            message: "账号不能为空",
            trigger: ["blur"]
        }, ],
        password: [{
                required: true,
                message: "密码不能为空",
                trigger: ["blur"]
            },
            {
                validator: (rule, value, callback) => {
                    if (!/^[a-zA-Z]\w{5,14}$/.test(value)) {
                        callback(new Error("密码以字母开头，长度在6-15位之间"));
                    }
                    callback();
                },
                trigger: ["change"]
            },
        ],
        code: [{
            required: true,
            message: "验证码不能为空",
            trigger: ["blur"]
        }],
    });
    const loginSubmit = () => {
        loginRef.value.validate((valid) => {
            if (valid) {
                login(loginForm).then((res) => {
                    Message.success(res.msg);
                    store.commit('SET_USER_INFO', res.data);
                    store.commit('SET_TOKEN', res.token);
                    router.push("/");
                }).catch((res) => {
                    Message.error(res.msg);
                    getCaptchaSrc();
                });
            }
        });
    };
    return {
        loginRef,
        loginForm,
        loginRules,
        loginSubmit
    }
}