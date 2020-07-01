import Vue from 'vue'
import App from './App'
import "./common/iconfont/iconfont.css";
import "./common/iconfonts/iconfont.css";
import "./common/common.js"
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
