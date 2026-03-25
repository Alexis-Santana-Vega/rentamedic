<template>
  <v-app>
    <v-app-bar title="Auth Layout">
      <v-btn text to="/auth/login">Login</v-btn>
      <v-btn text to="/auth/signup">Signup</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script lang="ts">
  console.log('AuthLayout loaded');
</script>
