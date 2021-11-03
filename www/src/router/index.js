import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
import page from './page.js'
import Message from 'element-plus/lib/components/message'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [...page]
})

router.beforeEach((to, from, next) => {
    if (localStorage.getItem("token")) {
        if (to.path === '/login') { //如果登录成功访问登录页跳转到主页
            next({
                path: '/'
            })
        } else {
            next()
        }
    } else {
        if (to.path !== '/login') {
            next({
                path: '/login'
            })
        } else {
            next()
        }
    }
})

export default router;