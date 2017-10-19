<template>
  <div :class="className" :id="id" :options="options" :style="{height:height,width:width}">
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    str: {
      type: String,
      default: 'a'
    },
    id: {
      type: String,
      default: 'chart'
    },
    options: {
      type: Object,
      default: function() {
        return {}
      }
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    options: {
      handler: function di(val) {
        this.setOptions(val)
      },
      deep: true
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.setOptions(this.options)
    },
    setOptions(data) {
      this.chart.setOption(data)
    }
  }
}
</script>
