<template lang="pug">
#list
    Page

    #add_bar2
        b-form-input#b-form-input(v-model='newitem' :state='state' trim @keydown.enter='additem' placeholder="Add a new mission...")
        font-awesome-icon#btn_plus(:icon='["fas", "plus"]' @click='additem')

    #chart
        #title
            //- id 表示法
            //- font-awesome-icon(:icon='["fas", "calendar-alt"]' id='icon')
            font-awesome-icon(:icon='["fas", "calendar-alt"]')#icon.float-left
            //- font-awesome-icon#icon(:icon='["fas", "calendar-alt"]')
            //- 行內樣式
            //- font-awesome-icon#icon(:icon='["fas", "calendar-alt"]' style={color: 'white'})
            #month_control.d-inline-block
                font-awesome-icon(:icon='["fas", "chevron-left"]')
                span.px-3 June, 28 2021
                font-awesome-icon(:icon='["fas", "chevron-right"]')

        #frame
            b-table#b-table.table-borderless.mb-0(:items='list' :fields='listfields')
                template(#cell(name)='data')
                    //- 顯示事項未完成的 fontawesome 符號
                    span.mr-3
                        font-awesome-icon(:icon='["far", "circle"]')
                    //- 若在編輯模式下顯示，顯示可編輯的輸入方框
                    b-form-input(
                        v-if='data.item.edit'
                        v-model='data.item.model'
                        trim
                        :state='data.item.state'
                        @keydown.enter='changelist(data.index)'
                        @keydown.esc='cancellist(data.index)')
                    //- 若不在編輯模式下顯示，顯示內容
                    span {{ data.value }}

                    span.float-right.bg-transparent.border-0(@click='dellist(data.index)')
                        font-awesome-icon(:icon='["fas", "trash"]')

            b-table-simple.table-borderless
                tr(v-for='(item, idx) in finished' :key='idx')
                    //- 顯示事項已完成的 fontawesome 符號
                    td
                        span.mr-3
                            font-awesome-icon(:icon='["far", "check-circle"]')
                        span {{ item }}
                    td
                        span.float-right.bg-transparent.border-0.cursor-pointer(@click='delfinish(idx)')
                            font-awesome-icon(:icon='["fas", "trash"]')
</template>

<script>
import Page from './Page.vue'

export default {
  name: 'List',
  components: {
    Page
  },
  data () {
    return {
      newitem: '',
      listfields: [
        { key: 'name', label: '名稱' }
      ]
    }
  },
  // 可以計算變數或是用來查詢儲存在 store 的物件狀態
  computed: {
    state () {
      if (this.newitem.length === 0) {
        return null
      } else if (this.newitem.length < 2) {
        return false
      } else {
        return true
      }
    },
    list () {
      return this.$store.getters.list.map(item => {
        if (item.model.length < 2) {
          item.state = false
        } else {
          item.state = true
        }
        return item
      })
    },
    // 查詢該清單物件狀態是否為已完成的 method
    finished () {
      return this.$store.state.finished
    }
  },
  // 更改變數值
  methods: {
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
    },
    editlist (index) {
      this.$store.commit('editList', index)
    },
    changelist (index) {
      if (this.list[index].state) {
        this.$store.commit('changeList', index)
      }
    },
    cancellist (index) {
      this.$store.commit('cancelList', index)
    },
    dellist (index) {
      this.$store.commit('delList', index)
    },
    delfinish (index) {
      this.$store.commit('delFinish', index)
    },
    chgfinish (index) {
      this.$store.commit('chgFinished', index)
    }
  }
}
</script>
