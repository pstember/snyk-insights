<template>
  <b-row>
      <b-col>
          <stats-card>
            <div slot="header" class="icon-success">
              <b-icon icon="exclamation-octagon-fill" class="con-big text-center" style="color: purple;"></b-icon>
            </div>
            <div slot="content" class="numbers">
                    <p>Critical</p>
                    {{ $store.getters.overview.critical }}<br/>
            </div>
            <div slot="footer">
              <b-icon icon="tools"></b-icon> {{ $store.getters.overview.criticalFixable }} fixable
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
                    {{ $store.getters.overview.high }}
            </div>
            <div slot="footer" class="text-left">
              <b-icon icon="tools"></b-icon> {{ $store.getters.overview.highFixable }} fixable <br/> 
              <b-icon icon="exclamation-triangle-fill" style="color: red;"></b-icon> {{ $store.getters.overview.highMature }} mature exploits <br/>
              <b-icon icon="tools"></b-icon> + <b-icon icon="exclamation-triangle-fill" style="color: red;"></b-icon> = {{ $store.getters.overview.highAction }}
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
                    {{ $store.getters.overview.medium }}
            </div>
            <div slot="footer">
              <b-icon icon="tools"></b-icon> {{ $store.getters.overview.mediumFixable }} fixable
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
                    {{ $store.getters.overview.low }}
            </div>
            <div slot="footer">
              <b-icon icon="tools"></b-icon> {{ $store.getters.overview.lowFixable }} fixable
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
                    {{ $store.getters.overview.none }}
            </div>
            <div slot="footer">
              <b-icon icon="tools"></b-icon> {{ $store.getters.overview.noneFixable }} fixable
            </div>
          </stats-card>
        </b-col>
    </b-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Card from '../baseElements/baseCards/BaseCard.vue';
import StatsCard from '../baseElements/baseCards/BaseStatsCard.vue';

@Component({
  components: {
    StatsCard,
    Card,
  },
})
export default class Overview extends Vue {
  @Prop() private customer!: string;
}
</script>