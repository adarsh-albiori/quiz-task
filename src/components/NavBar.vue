<template>
  <v-card elevation="10">
    <v-toolbar color="blue-darken-1" app>
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click="sidebar = !sidebar"> </v-toolbar-side-icon>
      </span>
      <v-toolbar-title class="ml-16">
        <span style="cursor: pointer" @click="redirect" class="ml-16">
          <v-icon icon="mdi-home" size="md" class="mb-1" />
          Home
        </span>
        <span
          v-if="isAdmin === true"
          style="cursor: pointer"
          @click="users"
          class="ml-16"
        >
          <v-icon icon="mdi-account" size="md" class="mb-1" />
          Users
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat to="/create">
          <v-icon left dark icon="mdi-pen"></v-icon>
          Create Quiz
        </v-btn>
        <v-btn color="red" variant="elevated" @click="signOut">
          <v-icon left dark icon="mdi-lock-open" />
          Sign Out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-card>
</template>

<script setup>
import { useRouter } from "vue-router";
import { quizStore } from "../store/index";
import { ref } from "vue";
import { onBeforeMount } from "vue";

const router = useRouter();
const store = quizStore();
const isAdmin = ref("");

onBeforeMount(() => {
  isAdmin.value = JSON.parse(localStorage.getItem("isAdmin")) || [];
});

function signOut() {
  store.loggedInUser = "";
  store.isLoggedIn = false;
  store.quizIndex = "";
  localStorage.setItem("isLoggedIn", JSON.stringify(false));
  localStorage.setItem("isAdmin", JSON.stringify(false));
  localStorage.setItem("loggedInUser", JSON.stringify(""));
  router.push("/");
}

function redirect() {
  router.push("/home");
}
function users() {
  router.push("/user-list");
}
</script>
