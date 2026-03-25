<template>
  <v-app>
    <v-app-bar title="Public Layout">
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/about">About</v-btn>
      <v-btn text to="/contact">Contact</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script lang="ts">
  console.log('PublicLayout loaded');
</script>
