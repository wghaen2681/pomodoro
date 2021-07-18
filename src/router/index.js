import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import List from '../views/List.vue'
import Chart from '../views/Chart.vue'
import Settings from '../views/Settings.vue'
import Progress from '../views/Progress.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '番茄鐘'
    }
  },
  {
    path: '/list',
    name: 'List',
    component: List,
    meta: {
      title: '番茄鐘 | 清單'
    }
  },
  // 把 import 寫在路徑這邊的寫法
  // {
  //   path: '/list',
  //   name: 'List',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/List.vue')
  //   meta: '番茄鐘 | 清單'
  // }
  {
    path: '/chart',
    name: 'Chart',
    component: Chart,
    meta: {
      title: '番茄鐘 | 圖表'
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      title: '番茄鐘 | 設定'
    }
  },
  {
    path: '/progress',
    name: 'Progress',
    component: Progress,
    meta: {
      title: '番茄鐘 | 進度'
    }
  }
]

const router = new VueRouter({
  routes
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
