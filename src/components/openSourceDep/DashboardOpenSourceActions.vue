<template>
  <div>
    <b-row>
      <b-col>
        <h2>Top 10 vulnerabilities</h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table 
          small 
          v-bind:items="$store.getters.vulnerabilities.actionVulns"
          responsive=true
          hover=true
        >
          <!-- A custom formatted column -->
          <template #cell(isFixable)="items">
            <b-icon icon="hand-thumbs-up" font-scale="2" style="color: green;" v-if="items.item.isFixable"></b-icon>
            <b-icon icon="hand-thumbs-down" font-scale="2" style="color: red;" v-else></b-icon>
          </template>
          <template #cell(snykUrl)="items">
            <a :href="items.item.snykUrl">{{ items.item.snykUrl }}</a>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component,Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class DashboardOpenSourceActions extends Vue {
}
</script>