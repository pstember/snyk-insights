<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" style="height: 300px;">
    <dashboard-container customer="Stemby"/>
    <footer-element></footer-element>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DashboardContainer from './components/DashboardContainer.vue';
import FooterElement from './components/TheFooter.vue';

@Component({
  components: {
    DashboardContainer,
    FooterElement,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f8f9fa;
}
</style>
