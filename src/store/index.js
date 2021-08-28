import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const time = parseInt(process.env.VUE_APP_TIME)
const timeBreak = parseInt(process.env.VUE_APP_TIME_BREAK)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    work: time,
    rest: timeBreak,
    mute: false,
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
    selectWork (state, data) {
      state.work = data
    },
    selectRest (state, data) {
      state.rest = data
    },
    selectSound (state, data) {
      state.sound = data
    },
    addList (state, data) {
      // 在待辦事項陣列中新增資料
      state.list.push({
        name: data,
        edit: false,
        model: data
      })

      // 更改 currentNext 顯示狀態
      if (state.list.length === 1) {
        state.currentNext = state.list[0].name
      }
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
      if (state.list.length === 0) {
        state.currentNext = '已完成所有待辦事項'
      } else {
        state.currentNext = state.list[0].name
      }
    },
    start (state) {
      if (state.isBreak) {
        state.current = '休息一下'
      } else {
        state.current = state.list.shift().name
        if (state.list.length > 0) {
          state.currentNext = state.list[0].name
        } else {
          state.currentNext = '即將完成所有待辦事項'
        }
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
      } else {
        state.currentNext = '已完成所有待辦事項'
      }
      state.timeleft = state.isBreak ? state.rest : state.work
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
