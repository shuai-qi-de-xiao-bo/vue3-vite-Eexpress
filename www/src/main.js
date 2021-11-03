import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import store from './store/index.js'


const app = createApp(App)
app.use(ElementPlus)

app.use(store)
app.use(router)
app.mount('#app')
