<template>
  <v-card
    class="mx-10 my-5"
    max-width="auto"
    max-height="auto"
    elevation="12"
    color="blue-lighten-4"
  >
    <v-card
      class="mx-auto my-7 text-center"
      max-width="700"
      max-height="250"
      elevation="7"
    >
      <v-sheet class="align-end text-white" :height="70" color="#1F7087">
        <v-card-title class="pt-5">Result</v-card-title>
      </v-sheet>
      <v-card-item class="mt-4">
        You have scored <b> : {{ store.result }} </b>
      </v-card-item>
      <v-btn
        @click="go"
        color="#1F7087"
        class="text-white mb-6 mt-5"
        variant="elevated"
      >
        Home
      </v-btn>
    </v-card>
  </v-card>
</template>
<script setup>
import { quizStore } from "../store/index";
import { useRouter } from "vue-router";

const store = quizStore();
const router = useRouter();

function go() {
  router.push("/home");
}
</script>
