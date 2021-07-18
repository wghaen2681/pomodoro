import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './style/app.stylus'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

// ApexCharts 必要引用
import VueApexCharts from 'vue-apexcharts'
// fontawesome 必要引用
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// 根據 icon 的種類引用

import { faPlus, faTimes, faCalendarAlt, faCaretLeft, faCaretRight, faChevronLeft, faChevronRight, faChevronDown, faToggleOn, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons'
library.add(faPlus, faTimes, faCalendarAlt, faCaretLeft, faCaretRight, faChevronLeft, faChevronRight, faChevronDown, faToggleOn, faCheckCircle, faCircle, faTrash)

// font awesome 註冊元件
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueSweetalert2)

// ApexChart 註冊元件
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
