<template>
  <div>
    <b-row>
      <b-col>
        <h2>Open-source dependencies</h2>
      </b-col>
    </b-row>
    <b-row>
        <b-col>
            <stats-card>
              <div slot="header" class="icon-success">
                <b-icon icon="exclamation-octagon-fill" class="con-big text-center" style="color: purple;"></b-icon>
              </div>
              <div slot="content" class="numbers">
                      <p>Critical</p>
                      {{ $store.getters.vulnerabilities.metrics.critical }}<br/>
              </div>
              <div slot="footer">
                <b-icon icon="tools"></b-icon> {{ $store.getters.vulnerabilities.metrics.criticalFixable }} fixable
              </div>
            </stats-card>
        </b-col>
              <b-col>
            <stats-card>
              <div slot="header" class="icon-success">
                <b-icon icon="exclamation-octagon-fill" class="con-big text-center" style="color: red;"></b-icon>
              </div>
              <div slot="content" class="numbers">
                      <p>High</p>
                      {{ $store.getters.vulnerabilities.metrics.high }}
              </div>
              <div slot="footer" class="text-left">
                <b-icon icon="tools"></b-icon> {{ $store.getters.vulnerabilities.metrics.highFixable }} fixable <br/> 
                <b-icon icon="exclamation-triangle-fill" style="color: red;"></b-icon> {{ $store.getters.vulnerabilities.metrics.highMature }} mature exploits <br/>
                <b-icon icon="tools"></b-icon> + <b-icon icon="exclamation-triangle-fill" style="color: red;"></b-icon> = {{ $store.getters.vulnerabilities.metrics.highAction }}
              </div>
            </stats-card>
        </b-col>
              <b-col>
            <stats-card>
              <div slot="header" class="icon-success">
                <b-icon icon="exclamation-triangle-fill" class="con-big text-center" style="color: orange;"></b-icon>
              </div>
              <div slot="content" class="numbers">
                      <p>Medium</p>
                      {{ $store.getters.vulnerabilities.metrics.medium }}
              </div>
              <div slot="footer">
                <b-icon icon="tools"></b-icon> {{ $store.getters.vulnerabilities.metrics.mediumFixable }} fixable
              </div>
            </stats-card>
        </b-col>
              <b-col>
            <stats-card>
              <div slot="header" class="icon-success">
                <b-icon icon="info-circle-fill" class="con-big text-center" style="color: green;"></b-icon>
              </div>
              <div slot="content" class="numbers">
                      <p>Low</p>
                      {{ $store.getters.vulnerabilities.metrics.low }}
              </div>
              <div slot="footer">
                <b-icon icon="tools"></b-icon> {{ $store.getters.vulnerabilities.metrics.lowFixable }} fixable
              </div>
            </stats-card>
        </b-col>
                    <b-col>
            <stats-card>
              <div slot="header" class="icon-success">
                <b-icon icon="info-circle-fill" class="con-big text-center" style="color: grey;"></b-icon>
              </div>
              <div slot="content" class="numbers">
                      <p>None</p>
                      {{ $store.getters.vulnerabilities.metrics.none }}
              </div>
              <div slot="footer">
                <b-icon icon="tools"></b-icon> {{ $store.getters.vulnerabilities.metrics.noneFixable }} fixable
              </div>
            </stats-card>
          </b-col>
      </b-row>
      <b-row>
      <b-col>
        <pie-chart v-if="$store.getters.vulnerabilities.updated" v-bind:chartOptions="$store.getters.vulnerabilities.vulnsCharOptions"></pie-chart>
        <b-spinner v-else class="mx-auto" label="Spinning" ></b-spinner>
      </b-col>
      <b-col>
        <pie-chart v-if="$store.getters.vulnerabilities.updated" v-bind:chartOptions="$store.getters.vulnerabilities.fixableVulnsCharOptions"></pie-chart>
        <b-spinner v-else class="mx-auto" label="Spinning" ></b-spinner>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Card from '../baseElements/baseCards/BaseCard.vue';
import StatsCard from '../baseElements/baseCards/BaseStatsCard.vue';
import PieChart from '../charts/PieChart.vue'

@Component({
  components: {
    StatsCard,
    Card,
    PieChart,
  },
})
export default class DashboardOpenSourceDependencies extends Vue {
  @Prop() private customer!: string;
}
</script>