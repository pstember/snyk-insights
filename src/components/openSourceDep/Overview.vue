<template>
  <b-row>
      <b-col>
          <stats-card>
            <div slot="header" class="icon-success">
              <b-icon icon="exclamation-octagon-fill" class="con-big text-center" style="color: purple;"></b-icon>
            </div>
            <div slot="content" class="numbers">
                    <p>Critical</p>
                    {{ $store.getters.overview.critical }}
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