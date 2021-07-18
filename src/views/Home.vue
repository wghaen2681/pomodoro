<template lang="pug">
#home
    #background
        #bg1
        #bg2
        #bg3
        #bg4

    router-link(to="./list")
      #menu

    #add_bar1
      //- 這邊真的不懂為什麼會有 'additem' method undefine 的錯誤
      b-form-input#b-form-input(v-model='newitem' :state='state' trim @keydown.enter='additem' placeholder="Add a new mission...")
      #add_btn(@click='additem')

    Alarm

    Function
</template>

<script>
import Alarm from '../components/Alarm.vue'
import Function from '../components/Function.vue'

export default {
  name: 'Home',
  components: {
    Alarm,
    Function
  },
  data () {
    return {
      newitem: '',
      listfields: [
        { key: 'name', label: '名稱' },
        { key: 'action', label: '操作' }
      ]
    }
  },
  computed: {
    state () {
      if (this.newitem.length === 0) {
        return null
      } else if (this.newitem.length < 2) {
        return false
      } else {
        return true
      }
    }
  },
  method: {
    additem () {
      if (this.state) {
        this.$store.commit('addList', this.newitem)
        this.newitem = ''
      } else {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '必須要兩個字以上'
        })
      }
    }
  }
}
</script>
