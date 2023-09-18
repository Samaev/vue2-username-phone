<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


// import LoginPage from "@/components/LoginPage.vue";
// import ToDos from "@/components/ToDos.vue";
// import NoWhere from "@/components/NoWhere.vue";

export default {
  name: 'App',
  // components: {
  //   LoginPage,
  //   ToDos,
  //   NoWhere
  // }
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
