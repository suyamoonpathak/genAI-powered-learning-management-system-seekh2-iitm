<template>
  <div ref="animationContainer" class="animation-container"></div>
</template>

<script>
import lottie from 'lottie-web';

export default {
  props: {
    animationData: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.loadAnimation();
  },
  methods: {
    loadAnimation() {
      console.log("Loading animation data:", this.animationData);
      lottie.loadAnimation({
        container: this.$refs.animationContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: this.animationData,
      });
    },
  },
};
</script>

<style scoped>
.animation-container {
  width: 100%;
  height: 100% /* Adjust height as needed */
}
</style>
  