<template lang="pug">
#chart
    Page
    #data
        #statistics.d-flex.justify-content-between.text-center.pb-5.mb-5
            #today
                div Today
                div 7
            #weekly
                div Weekly
                div 60
            #totally
                div Totally
                div 102

        #controler.pr-3.text-right
            font-awesome-icon(:icon='["fas", "caret-left"]')
            span.px-3 7/09 - 7/15
            font-awesome-icon(:icon='["fas", "caret-right"]')

        #figure
            LineChart
</template>

<script>
import Page from './Page.vue'
import LineChart from '../components/LineChart.vue'

export default {
  name: 'Chart',
  components: {
    Page,
    LineChart
  }
}
</script>
