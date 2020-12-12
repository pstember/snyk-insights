<template>
  <div>
    <b-row>
      <b-col>
        <h2>Open-source</h2>
      </b-col>
    </b-row>
    <dashboard-open-source-overview></dashboard-open-source-overview>
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
    <dashboard-open-source-quality></dashboard-open-source-quality>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import DashboardOpenSourceOverview from './DashboardOpenSourceOverview.vue';
import PieChart from '../charts/PieChart.vue'
import DashboardOpenSourceQuality from './DashboardOpenSourceQuality.vue';

@Component({
  components: {
    DashboardOpenSourceOverview,
    PieChart,
    DashboardOpenSourceQuality,
  },
})
export default class DashboardOpenSource extends Vue {
}
</script>