<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-app-bar app title="M-Bingo-App" color="surface-variant"></v-app-bar>
    <v-main class="background">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      bingo_url: '/',
    }
  }
}
</script>

<style scoped>
.background {
  background-image: url("./assets/forest.jpg");
  background-size:cover;
}
</style>
