import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const time = parseInt(process.env.VUE_APP_TIME)
const timeBreak = parseInt(process.env.VUE_APP_TIME_BREAK)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sound: 'alarm.mp3',
    // 顯示未完成資料的名稱陣列
    list: [],
    // 顯示已完成資料的名稱陣列
    finished: [],
    current: '',
    currentNext: '',
    timeleft: time,
    isBreak: false,
    // 0 = 停止
    // 1 = 倒數中
    // 2 = 暫停
    status: 0
    // alarm: null
  },
  mutations: {
    selectSound (state, data) {
      state.sound = data
    },
    addList (state, data) {
      state.list.push({
        name: data,
        edit: false,
        model: data
      })
    },
    editList (state, data) {
      state.list[data].edit = true
    },
    changeList (state, data) {
      state.list[data].name = state.list[data].model
      state.list[data].edit = false
    },
    cancelList (state, data) {
      state.list[data].model = state.list[data].name
      state.list[data].edit = false
    },
    delList (state, data) {
      state.list.splice(data, 1)
    },
    start (state) {
      if (state.isBreak) {
        state.current = '休息一下'
      } else {
        state.current = state.list.shift().name
        state.currentNext = state.list[0].name
      }
    },
    changeStatus (state, data) {
      state.status = data
    },
    countdown (state) {
      state.timeleft--
    },
    addFinish (state) {
      if (!state.isBreak) {
        state.finished.push(state.current)
      }
      state.current = ''
      if (state.list.length > 0) {
        state.isBreak = !state.isBreak
      }
      state.timeleft = state.isBreak ? timeBreak : time
    },
    delFinish (state, data) {
      state.finished.splice(data, 1)
    },
    chgFinished (index, state, data) {
      if (index) {
        state.finished.push(state.current)
        state.list.splice(data, 1)
      } else {
        state.list.push({
          name: data,
          edit: false,
          model: data
        })
        state.finished.splice(data, 1)
      }
    }
    // changeAlarm (state, data) {
    //   state.alarm = data
    // }
  },
  getters: {
    list (state) {
      return state.list
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      key: 'pomodoro'
    })
  ]
})
