<template>
  <v-app>
    <NavBar v-if="store.isLoggedIn" />
    <v-content class="mt-16">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script setup>
import { quizStore } from "./store/index";
// import { storeToRefs } from "pinia";
import NavBar from "./components/NavBar.vue";
import { onMounted } from "vue";
const store = quizStore();

// const isLoggedIn = ref(false);

onMounted(() => {
  store.isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
});
</script>
