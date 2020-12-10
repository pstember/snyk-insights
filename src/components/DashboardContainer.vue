<template>
  <div class="hello">
    <b-container>
      <b-row>
        <b-col class="text-center">
          <h1> Pilot Dashboard for {{ customer }}</h1>
        </b-col>
      </b-row>
      <dashboard-open-source></dashboard-open-source>        
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import DashboardOpenSource from './openSourceDep/DashboardOpenSource.vue'

@Component({
  components: {
    DashboardOpenSource,
  },
})
export default class DashboardContainer extends Vue {
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
