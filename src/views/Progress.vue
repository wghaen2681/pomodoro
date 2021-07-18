<template lang="pug">
#chart.vw-100.vh-100
    apexchart(width="380" :options="chartOptions" :series="series")
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'Progress',
  components: {
    apexcharts: VueApexCharts
  },
  data: function () {
    return {
      chartOptions: {
        chart: {
          height: 280,
          type: 'radialBar'
        },
        series: [67],
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
      }
    }
  }
}
</script>
