<template>
  <div>
    <dashboard-open-source-dependencies></dashboard-open-source-dependencies>
    <dashboard-open-source-licenses></dashboard-open-source-licenses>
    <dashboard-open-source-quality></dashboard-open-source-quality>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DashboardOpenSourceDependencies from './DashboardOpenSourceDependencies.vue';
import DashboardOpenSourceLicenses from './DashboardOpenSourceLicenses.vue';
import DashboardOpenSourceQuality from './DashboardOpenSourceQuality.vue';
import PieChart from '../charts/PieChart.vue'
import StatsCard from '../baseElements/baseCards/BaseStatsCard.vue';

@Component({
  components: {
    DashboardOpenSourceDependencies,
    DashboardOpenSourceLicenses,
    DashboardOpenSourceQuality,
    PieChart,
    StatsCard,
  },
})
export default class DashboardOpenSource extends Vue {
}
</script>