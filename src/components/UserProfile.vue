<template>
  <v-card class="mx-auto" max-width="522" color="blue-lighten-4">
    <v-card class="mx-auto my-10" max-width="404" elevation="16">
      <v-sheet class="d-flex justify-center" :height="170" color="#1F7087">
        <v-avatar color="grey" size="150" rounded="5" class="mt-3">
          <v-img
            v-if="quizData"
            cover
            :src="`https://robohash.org/${
              quizData[store.quizIndex].createdBy.name
            }`"
          ></v-img>
        </v-avatar>
      </v-sheet>

      <v-card-title v-if="quizData">
        {{ quizData[store.quizIndex].createdBy.name }}
      </v-card-title>

      <v-card-actions>
        <v-btn color="orange-lighten-2" variant="text" @click="okay">
          Okay
        </v-btn>

        <v-spacer></v-spacer>

        <p class="ml-5">contact details</p>
        <v-btn
          size="small"
          :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="show = !show"
        ></v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text v-if="quizData"
            >Email:
            {{ quizData[store.quizIndex].createdBy.email }}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </v-card>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { quizStore } from "../store/index";
import { useRouter } from "vue-router";

const show = ref(false);
const router = useRouter();
const store = quizStore();
const quizData = ref(null);

function okay() {
  router.push("/home");
}
onMounted(() => {
  quizData.value = JSON.parse(localStorage.getItem("quiz-data"));
});
</script>
