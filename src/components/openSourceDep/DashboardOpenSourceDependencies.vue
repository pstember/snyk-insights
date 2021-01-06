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
                <!-- One can use the icon, value can be found here https://devicon.dev/ on the font version
                     Example here is for java plain (black and white) -->
                <i class="devicon-java-plain"></i>
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
                <!-- One can use the icon, value can be found here https://devicon.dev/ on the font version
                     Example here is for nodeJS coloered -->
                <i class="devicon-nodejs-plain colored"></i>
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
                <!-- One can use the icon, value can be found here https://devicon.dev/ on the font version
                     Example here is for ruby coloered -->
                <i class="devicon-ruby-plain colored"></i>
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
                <!-- One can use the SVG description directly from https://devicon.dev/ 
                     Example here is for python -->
                <svg viewBox="0 0 128 128">
                  <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"><stop offset="0" stop-color="#5A9FD4"></stop><stop offset="1" stop-color="#306998"></stop></linearGradient><path fill="url(#a)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137h-33.961c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491v-11.282c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548v-23.513c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zm-13.354 7.569c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"></path><linearGradient id="b" gradientUnits="userSpaceOnUse" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"><stop offset="0" stop-color="#FFD43B"></stop><stop offset="1" stop-color="#FFE873"></stop></linearGradient><path fill="url(#b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655h-24.665c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412h-24.664v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zm-13.873 59.547c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"></path><radialGradient id="c" cx="1825.678" cy="444.45" r="26.743" gradientTransform="matrix(0 -.24 -1.055 0 532.979 557.576)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#B8B8B8" stop-opacity=".498"></stop><stop offset="1" stop-color="#7F7F7F" stop-opacity="0"></stop></radialGradient><path opacity=".444" fill="url(#c)" enable-background="new" d="M97.309 119.597c0 3.543-14.816 6.416-33.091 6.416-18.276 0-33.092-2.873-33.092-6.416 0-3.544 14.815-6.417 33.092-6.417 18.275 0 33.091 2.872 33.091 6.417z"></path>
                </svg>
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
import { Component, Vue } from 'vue-property-decorator';
import Card from '../baseElements/baseCards/BaseCard.vue';
import StatsCard from '../baseElements/baseCards/BaseStatsCard.vue';
import PieChart from '../charts/PieChart.vue'
// required if we want to be able to use the icon in the font (using the <i>, 
// if you go with the <svg> then this is not required but I do beleive that some SVG are not well supported by older browsers
// also, the SVG is harder to read but get more details / colors than the font one, up for preference
import Devicon from 'devicon';

@Component({
  components: {
    StatsCard,
    Card,
    PieChart,
    Devicon,
  },
})
export default class DashboardOpenSourceDependencies extends Vue {
}
</script>