<template>
  <div>
    <highcharts v-if="$store.getters.updated" :options="chartOptions" ref="chart"></highcharts>
     <div v-else>LOADING</div>
  </div>
</template>

<script>

import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'
import store from "./../../store";

exportingInit(Highcharts)

export default {
  data() {
    return {
      chartOptions: store.getters.chartOptions
    };
  }
};
</script>
