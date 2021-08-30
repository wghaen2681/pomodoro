<template lang="pug">
#settings
  Page
  #frame
    .pb-5.mb-5
      .mb-3 Time Setting
      .container
        #working_time.mb-2.d-flex.justify-content-between
          div Working time
          b-form-select#audioSetting(v-model="selected.work" :options="options.work" @change="selectWork")
        #resting_time.mb-2.d-flex.justify-content-between
          div Resting time
          b-form-select#audioSetting(v-model="selected.rest" :options="options.rest" @change="selectRest")
    div
      .mb-3 Alarm
      .container
        #volume.mb-2.d-flex.justify-content-between
          div Sound
          div(class="custom-control custom-switch")
            input(type="checkbox" class="custom-control-input" id="customSwitch1" v-model="selected.sound" @change="selectSound")
            label(class="custom-control-label" for="customSwitch1")
        #audio.mb-2.d-flex.justify-content-between
          div Music
          b-form-select#audioSetting(v-model="selected.music" :options="options.sound" @change="selectMusic")
</template>

<script>
import Page from './Page.vue'

export default {
  name: 'Settings',
  components: {
    Page
  },
  data () {
    return {
      // 設定選項
      options: {
        work: [
          { value: '10', text: '10 mins' },
          { value: '15', text: '15 mins' },
          { value: '20', text: '20 mins' },
          { value: '25', text: '25 mins' }
        ],
        rest: [
          { value: '5', text: '5 mins' },
          { value: '10', text: '10 mins' },
          { value: '15', text: '15 mins' },
          { value: '20', text: '20 mins' }
        ],
        sound: [
          { value: 'alarm.mp3', text: 'Alarm' },
          { value: 'yay.mp3', text: 'Yay' }
        ]
      },

      // 設定資料
      selected: {
        work: this.$store.state.work,
        rest: this.$store.state.rest,
        sound: this.$store.state.sound,
        music: this.$store.state.music
      }
    }
  },
  methods: {
    selectWork () {
      this.$store.commit('selectWork', this.selected.work)
    },
    selectRest () {
      this.$store.commit('selectRest', this.selected.rest)
    },
    selectSound () {
      this.$store.commit('selectSound', this.selected.sound)
    },
    selectMusic () {
      this.$store.commit('selectMusic', this.selected.music)
    }
  }
}
</script>
