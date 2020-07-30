<template>
  <div class="l-page">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab cumque, delectus dolorem esse eveniet ipsa numquam possimus quos recusandae unde? Animi enim et exercitationem hic libero molestiae officia. Consectetur, rerum!</div>
</template>

<script>
  import { getFrameById } from '../services/frame-service';
  // eslint-disable-next-line no-unused-vars
  import { getTodoById } from '../services/todo-service';

  export default {
    name: 'FrameTasks',
    data() {
      return {
        frame: null,
      };
    },
    beforeMount() {
      this.getData();
    },
    methods: {
      async getData() {
        const { id } = this.$route.params;
        await getFrameById(id).then(res => (this.frames = res.data)).catch(() => this.$router.push('/'));
      }
    },
  }
</script>

<style lang="scss">
  @import '../assets/css/_utilities/_exports';
</style>
