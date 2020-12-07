<template>
  <div class="hello">
    <b-container>
      <b-row>
        <b-col class="text-center">
          <h1> POC Dashboard for {{ customer }}</h1>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          Graph 1
          <Chart></Chart>
        </b-col>
        <b-col>
          Graph 2
          <Bars></Bars>
        </b-col>
      </b-row>
            <b-row>
        <b-col>
          Graph 3
          <Bars></Bars>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div>
            <b-button class="mr-1">Button</b-button>
            <b-button class="mr-1">Button</b-button>
            <b-button class="mr-1">Button</b-button>
            <b-button>Button WOOOOO YEPEEEE</b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Chart from './charts/Chart.vue';
import Bars from './charts/Bars.vue';

console.log('vuln log printed');

@Component({
  components: {
    Chart,
    Bars,
  },
})
export default class Vulns extends Vue {
  @Prop() private customer!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
