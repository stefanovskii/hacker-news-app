<template>
  <HomePage></HomePage>
</template>

<script>
import HomePage from './components/HomePage.vue';
import '@fortawesome/fontawesome-svg-core/styles.css'; 


export default {
  name: 'App',
  components: {
    HomePage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html, body, #app{
  width: 100%;
  height: 100%;
}

</style>

