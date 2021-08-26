<template lang="pug">
#settings
  Page
  #frame
    .pb-5.mb-5
      .mb-3 Time Setting
      .container
        #working_time.mb-2.d-flex.justify-content-between
          div Working time
          button
            span.mr-2 25 min
            font-awesome-icon(:icon='["fas", "chevron-down"]')
        #resting_time.mb-2.d-flex.justify-content-between
          div Resting time
          button
            span.mr-2 5 min
            font-awesome-icon(:icon='["fas", "chevron-down"]')
    div
      .mb-3 Alarm
      .container
        #volume.mb-2.d-flex.justify-content-between
          div Volume
          button
            span.mr-3 On
            font-awesome-icon(:icon='["fas", "toggle-on"]')
        #audio.mb-2.d-flex.justify-content-between
          div Audio
          b-form-select(v-model="selected" :options="options")
          button
            span.mr-2 basic
            font-awesome-icon(:icon='["fas", "chevron-down"]')
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
      items: [
        { name: '鈴聲', src: 'alarm.mp3' },
        { name: 'Yay', src: 'yay.mp3' }
      ],
      fields: [
        { key: 'name', label: '名稱' },
        { key: 'src', label: '試聽' },
        { key: 'select', label: '選擇' }
      ],

      // 音效選項
      selected: null,
      options: [
        { value: null, text: 'Please select some item' },
        { value: 'a', text: 'This is First option' }
      ]
    }
  },
  computed: {
    sound () {
      return this.$store.state.sound
    }
  },
  methods: {
    select (item) {
      this.$store.commit('selectSound', item.src)
    }
  }
}
</script>
