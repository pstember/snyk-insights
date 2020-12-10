<template>
  <div>
    <b-row>
      <b-col>
        <h2>Open-source</h2>
      </b-col>
    </b-row>
    <overview></overview>
    <b-row>
      <b-col>
        <pie-chart v-if="$store.getters.updated" v-bind:chartOptions="$store.getters.chartOptions"></pie-chart>
        <b-spinner v-else class="mx-auto" label="Spinning" ></b-spinner>
      </b-col>
      <b-col>
        <pie-chart v-if="$store.getters.licUpdated" v-bind:chartOptions="$store.getters.licenseChart"></pie-chart>
        <b-spinner v-else class="mx-auto" label="Spinning" ></b-spinner>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Overview from './Overview.vue';
import PieChart from '../charts/PieChart.vue'

@Component({
  components: {
    Overview,
    PieChart,
  },
})
export default class DashboardOpenSource extends Vue {
}
</script>