<template>
  <GameViewer></GameViewer>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import GameViewer from './components/GameViewer.vue';

@Options({
  components: {
    GameViewer,
  },
})
export default class App extends Vue {}
</script>

<style>
</style>
