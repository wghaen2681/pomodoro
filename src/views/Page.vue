<template lang="pug">
#page
    #background
        #bg1
        #bg2
    router-link(to="./" style={"color": "inherit"})
      font-awesome-icon(:icon='["fas", "times"]')#close_icon
    Alarm
    Function
</template>

<script>
import Alarm from '../components/Alarm.vue'
import Function from '../components/Function.vue'

export default {
  name: 'Page',
  components: {
    Alarm,
    Function
  }
}
</script>
