const page = [
    {
        path: "/",
        component: () => import("@/page/layout/index.vue"),
        redirect: "/index",
        children: [
            {
                path: "/index",
                component: () => import("@/views/index.vue")
            },
            {
                path: "/user",
                component: () => import("@/views/user/index.vue")
            },
            {
                path: "/site",
                component: () => import("@/views/site/index.vue")
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/login/index.vue")
    }
]

export default page