<template>
  <div id="app">
    <LoginPage />
    <ToDos />
  </div>
</template>

<script>


import LoginPage from "@/components/LoginPage.vue";
import ToDos from "@/components/ToDos.vue";

export default {
  name: 'App',
  components: {
    LoginPage,
    ToDos
  }
}
</script>

<style>
#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}
body {
  background-color: #474747;
  margin: 0;
  padding: 0;
}
</style>
