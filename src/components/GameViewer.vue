<template>
  <div id="gameViewer">
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import Core from '@/game/Core';

@Options({
  data: () => {
    return {

    }
  },
  mounted: () => {
    new Core();
  }
})
export default class GameViewer extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#gameViewer {
  position: inherit;
  width: 100%;
  height: 100%;
}
</style>
