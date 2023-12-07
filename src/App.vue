<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/NavBar.vue";

export default {
  components: {
    Navbar,
  },
};
</script>

<style>
body {
  background-color: #f4f1e4;
  margin: 0;
  font-family: 'Arial', sans-serif;
}




</style>
