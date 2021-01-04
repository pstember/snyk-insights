<template>
  <div>
    <b-row>
      <b-col>
        <h2>Open-source dependencies</h2>
      </b-col>
    </b-row>
    <!-- Severity Stats -->
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
                <b-icon icon="tools"></b-icon> {{ $store.getters.vulnerabilities.metrics.criticalFixable }} fixable <br/>
                <b-icon icon="exclamation-triangle-fill" style="color: red;"></b-icon> {{ $store.getters.vulnerabilities.metrics.critialMature }} mature exploits 
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
      <!-- Language Counts -->
      <b-row>
        <b-col>
          <stats-card>
            <div slot="header" class="icon-success">
              <b-icon icon="arrow-right" class="con-big text-center" style="color: green;"></b-icon>
            </div>
            <div slot="content" class="numbers">
              <p>Node Count</p>
              {{ $store.getters.vulnerabilities.metrics.nodeCount }}
            </div>
          </stats-card>
        </b-col>
        <b-col>
          <stats-card>
            <div slot="header" class="icon-success">
              <b-icon icon="arrow-right" class="con-big text-center" style="color: green;"></b-icon>
            </div>
            <div slot="content" class="numbers">
              <p>Javascript Count</p>
              {{ $store.getters.vulnerabilities.metrics.javascriptCount }}
            </div>
          </stats-card>
        </b-col>
        <b-col>
          <stats-card>
            <div slot="header" class="icon-success">
              <b-icon icon="arrow-right" class="con-big text-center" style="color: green;"></b-icon>
            </div>
            <div slot="content" class="numbers">
              <p>Ruby Count</p>
              {{ $store.getters.vulnerabilities.metrics.rubyCount }}
            </div>
          </stats-card>
        </b-col>
        <b-col>
          <stats-card>
            <div slot="header" class="icon-success">
              <b-icon icon="arrow-right" class="con-big text-center" style="color: green;"></b-icon>
            </div>
            <div slot="content" class="numbers">
              <p>Java Count</p>
              {{ $store.getters.vulnerabilities.metrics.javaCount }}
            </div>
          </stats-card>
        </b-col>
        <b-col>
          <stats-card>
            <div slot="header" class="icon-success">
              <b-icon icon="arrow-right" class="con-big text-center" style="color: green;"></b-icon>
            </div>
            <div slot="content" class="numbers">
              <p>Scala Count</p>
              {{ $store.getters.vulnerabilities.metrics.scalaCount }}
            </div>
          </stats-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <stats-card>
            <div slot="header" class="icon-success">
              <b-icon icon="arrow-right" class="con-big text-center" style="color: green;"></b-icon>
            </div>
            <div slot="content" class="numbers">
              <p>Python Count</p>
              {{ $store.getters.vulnerabilities.metrics.pythonCount }}
            </div>
          </stats-card>
        </b-col>
        <b-col>
          <stats-card>
            <div slot="header" class="icon-success">
              <b-icon icon="arrow-right" class="con-big text-center" style="color: green;"></b-icon>
            </div>
            <div slot="content" class="numbers">
              <p>Golang Count</p>
              {{ $store.getters.vulnerabilities.metrics.golangCount }}
            </div>
          </stats-card>
        </b-col>
        <b-col>
          <stats-card>
            <div slot="header" class="icon-success">
              <b-icon icon="arrow-right" class="con-big text-center" style="color: green;"></b-icon>
            </div>
            <div slot="content" class="numbers">
              <p>PHP Count</p>
              {{ $store.getters.vulnerabilities.metrics.phpCount }}
            </div>
          </stats-card>
        </b-col>
        <b-col>
          <stats-card>
            <div slot="header" class="icon-success">
              <b-icon icon="arrow-right" class="con-big text-center" style="color: green;"></b-icon>
            </div>
            <div slot="content" class="numbers">
              <p>Dotnet Count</p>
              {{ $store.getters.vulnerabilities.metrics.dotnetCount }}
            </div>
          </stats-card>
        </b-col>
        <b-col>
          <stats-card>
            <div slot="header" class="icon-success">
              <b-icon icon="arrow-right" class="con-big text-center" style="color: green;"></b-icon>
            </div>
            <div slot="content" class="numbers">
              <p>Swift ObjectiveC Count</p>
              {{ $store.getters.vulnerabilities.metrics.swiftObjectiveCCount }}
            </div>
          </stats-card>
        </b-col>
      </b-row>
      <!-- TO DELETE
      Where did these come from? -->
      <b-row>
        <b-col>
          <stats-card>
            <div slot="header" class="icon-success">
              <b-icon icon="arrow-right" class="con-big text-center" style="color: green;"></b-icon>
            </div>
            <div slot="content" class="numbers">
              <p>Unknown Count ??</p>
              {{ $store.getters.vulnerabilities.metrics.unknownCount }}
            </div>
          </stats-card>
        </b-col>
      </b-row>
      <!-- Pie Charts -->
      <b-row>
        <!-- Vulnerabilities Distribution -->
      <b-col>
        <pie-chart v-if="$store.getters.vulnerabilities.updated" v-bind:chartOptions="$store.getters.vulnerabilities.vulnsCharOptions"></pie-chart>
        <b-spinner v-else class="mx-auto" label="Spinning" ></b-spinner>
      </b-col>
        <!-- Fixable Vulnerabilities Distribution -->
      <b-col>
        <pie-chart v-if="$store.getters.vulnerabilities.updated" v-bind:chartOptions="$store.getters.vulnerabilities.fixableVulnsCharOptions"></pie-chart>
        <b-spinner v-else class="mx-auto" label="Spinning" ></b-spinner>
      </b-col>
    </b-row>
    <b-row>
      <!-- Vulnerabilities Distribution by Language-->
      <b-col>
        <pie-chart v-if="$store.getters.vulnerabilities.updated" v-bind:chartOptions="$store.getters.vulnerabilities.langVulnsCharOptions"></pie-chart>
        <b-spinner v-else class="mx-auto" label="Spinning" ></b-spinner>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
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
}
</script>