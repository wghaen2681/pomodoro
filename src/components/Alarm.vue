<template lang='pug'>
#alarm
  #timer_container.d-flex.flex-column.justify-content-center.align-items-center
    //- 顯示目前任務
    #title.pt-5.font-weight-light {{ currentText }}
    #timer.py-5.mb-4.d-flex.flex-row.justify-content-around
      #min.display-2 {{ timeMinute }}
      #colon.display-2.px-5 :
      #sec.display-2 {{ timeSecond }}

    //- 鬧鐘播放控制器
    #player.d-flex.flex-row.justify-content-around
      .m-3#alarm(v-if='alarm' @click='alarm(false)')
      .m-3#mute(v-if='!alarm' @click='alarm(true)')
      .m-3#play(v-if='status !== 1' @click='start')
      .m-3#pause(v-if='status === 1' @click='pause')
      .m-3#skip(v-if='current.length > 0' @click='finish(true)')

  //- 顯示下一個事項
  #next.d-flex
    h5.pr-2.font-weight-light Next:
    h5#subtitle.font-weight-light {{ currentNext }}
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'Alarm',
  components: {
    apexcharts: VueApexCharts
  },
  data () {
    return {
      chartOptions: {
        chart: {
          height: 280,
          type: 'radialBar'
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 15,
              size: '70%'
            },
            dataLabels: {
              showOn: 'always',
              name: {
                offsetY: -10,
                show: true,
                color: '#888',
                fontSize: '13px'
              },
              value: {
                color: '#111',
                fontSize: '30px',
                show: true
              }
            }
          }
        },
        stroke: {
          lineCap: 'round'
        },
        labels: ['Progress']
      },
      series: [{
        series: [67]
      }],
      timer: 0
    }
  },
  computed: {
    status () {
      return this.$store.state.status
    },
    list () {
      return this.$store.state.list
    },
    current () {
      return this.$store.state.current
    },
    currentNext () {
      return this.$store.state.currentNext
    },
    currentText () {
      let text = this.current
      if (text.length === 0) {
        if (this.list.length === 0) {
          text = '沒有事項'
        } else {
          text = '點擊開始'
        }
      }
      return text
    },
    timeleft () {
      return this.$store.state.timeleft
    },
    timeMinute () {
      const m = Math.floor(this.timeleft / 60)
      return m
    },
    timeSecond () {
      const s = Math.floor(this.timeleft % 60)
      return s
    }
  },
  methods: {
    pause () {
      clearInterval(this.timer)
      this.$store.commit('changeStatus', 2)
    },
    start () {
      if (this.status !== 2 && this.list.length > 0) {
        this.$store.commit('start')
      }
      if (this.current.length > 0) {
        this.$store.commit('changeStatus', 1)
        this.timer = setInterval(() => {
          this.$store.commit('countdown')
          if (this.timeleft <= -1) {
            this.finish(false)
          }
        }, 1000)
      }
    },
    finish (skip) {
      clearInterval(this.timer)
      this.$store.commit('changeStatus', 0)
      this.$store.commit('addFinish')

      if (this.$store.state.sound) {
        if (!skip) {
          const audio = new Audio()
          if (this.$store.state.music !== 'mute') {
            audio.src = require('../assets/' + this.$store.state.music)
            audio.play()
          }
        }
      }

      if (this.list.length > 0) {
        this.start()
      } else {
        this.$swal({
          icon: 'success',
          title: '恭喜你！',
          text: '已完成所有代辦事項'
        })
      }
    },
    alarm (index) {
      console.log(this.$store.state.alarm)
      // console.log('yes', index)
      // this.$store.commit('changeAlarm', index)
      // console.log('no', this.$store.state.alarm)
    }
  }
}
</script>
