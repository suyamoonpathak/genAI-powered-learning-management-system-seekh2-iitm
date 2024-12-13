<template>
  
  <div id="app">
    <router-view/>
  </div>
</template>

<script>





export default {
  name: 'App',
}
</script>

<style>

@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

#app {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #dedede;
}
</style>