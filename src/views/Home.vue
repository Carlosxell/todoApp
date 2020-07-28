<template>
  <div class="l-page--home">
    <FrameContainer />
  </div>
</template>

<script>
import FrameContainer from '../components/FrameContainer';

export default {
  name: 'Home',
  components: { FrameContainer },
  data: () => {
    return {};
  },
}
</script>

<style lang="scss">
  @import '../assets/css/_utilities/_exports';
</style>
