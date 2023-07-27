<template>
  <v-card
    class="mx-auto"
    max-width="800"
    color="#1F7087"
    elevation="10"
    variant="tonal"
  >
    <v-row class="mx-4 my-2">
      <v-responsive class="ml-10 pt-5 mr-3" max-width="700">
        <v-text-field
          v-model="search"
          variant="outlined"
          label="Search"
          append-inner-icon="mdi-magnify"
          hide-details
        ></v-text-field>
      </v-responsive>
      <v-responsive class="mx-auto" max-width="100">
        <v-select
          v-model="selectedLevel"
          :rules="[(v) => !!v || 'Item is required']"
          class="mt-5"
          variant="outlined"
          label="Filter"
          :items="['All', 'Easy', 'Medium', 'Hard']"
          required
        ></v-select>
      </v-responsive>
    </v-row>
  </v-card>
  <v-card
    class="mx-10 my-10"
    max-width="auto"
    max-height="auto"
    elevation="12"
    color="blue-lighten-4"
  >
    <div v-for="(item, index) in filteredArray" :key="index">
      <v-card
        class="mx-auto my-7"
        max-width="700"
        max-height="330"
        elevation="7"
      >
        <v-sheet class="align-end text-white" :height="100" color="#1F7087">
          <v-row class="mx-1">
            <v-card-subtitle class="mt-8"> Quiz name </v-card-subtitle>

            <v-spacer></v-spacer>
            <v-card-subtitle class="mt-8 mr-10"> created by </v-card-subtitle>
          </v-row>
          <v-row class="mx-2">
            <v-card-title class="ml-3">{{ item.quizTitle }}</v-card-title>
            <v-spacer></v-spacer>
            <v-card-title>
              <span
                style="cursor: pointer"
                class="ml-1"
                @click="userProfile(index)"
              >
                {{ item.createdBy.name }}
              </span>
            </v-card-title>
          </v-row>
        </v-sheet>
        <v-row class="mt-1">
          <v-card-text class="ml-2"> Reference topics </v-card-text>
        </v-row>
        <div class="ml-3 mt-1">
          <v-chip color="blue-darken-4" class="m1-5">
            {{ item.quizRelevantTopic }}
          </v-chip>
        </div>
        <div>
          <v-divider
            :thickness="5"
            class="border-opacity-100 mt-3"
            width="180"
            color="#1F7087"
          ></v-divider>
        </div>
        <v-row class="mt-1">
          <v-card-text class="ml-3"> Quiz Level </v-card-text>
        </v-row>
        <div class="ml-3">
          <v-chip color="teal-darken-2" class="m1-5">
            {{ item.level }}
          </v-chip>
        </div>

        <v-card-actions class="mb-2 mr-1">
          <v-spacer></v-spacer>
          <v-btn
            v-if="
              (qData[index].createdBy.name == loggedInUser.name &&
                qData[index].createdBy.email == loggedInUser.email) ||
              isAdmin
            "
            color="green"
            variant="tonal"
            @click="edit(index)"
          >
            Edit Quiz
          </v-btn>
          <v-btn
            v-if="
              (qData[index].createdBy.name == loggedInUser.name &&
                qData[index].createdBy.email == loggedInUser.email) ||
              isAdmin
            "
            color="red"
            variant="tonal"
            @click="remove(index)"
          >
            Delete
          </v-btn>
          <v-btn color="#1F7087" variant="tonal" @click="play(index)">
            Play Quiz
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-card>
</template>
<script setup>
import { useRouter } from "vue-router";
import { quizStore } from "../store/index";
import { ref, onMounted } from "vue";
import { computed } from "vue";

const router = useRouter();
const store = quizStore();
const selectedLevel = ref("All");
const qData = ref(null);
const uData = ref(null);
const loggedInUser = ref(null);
const isAdmin = ref("");
const search = ref("");

const filteredArray = computed(() => {
  let filtered = null;
  if (selectedLevel.value == "All" && search.value == "") {
    filtered = qData.value;
  } else {
    filtered = qData.value.filter((quiz) => {
      const levelCheck =
        selectedLevel.value !== "All"
          ? quiz.level === selectedLevel.value
          : true;
      const searchCheck =
        quiz.quizTitle.toLowerCase().includes(search.value) ||
        quiz.quizRelevantTopic.includes(search.value);
      return levelCheck && searchCheck;
    });
  }
  return filtered;
});

function play(index) {
  router.push("/play-quiz");
  store.quizIndex = index;
}
function remove(index) {
  qData.value.splice(index, 1);
  localStorage.setItem("quiz-data", JSON.stringify(qData.value));
}

function edit(index) {
  router.push("/edit");
  store.quizIndex = index;
}

function userProfile(index) {
  router.push("/user");
  store.quizIndex = index;
}

onMounted(() => {
  uData.value = JSON.parse(localStorage.getItem("users")) || [];
  qData.value = JSON.parse(localStorage.getItem("quiz-data")) || [];
  isAdmin.value = JSON.parse(localStorage.getItem("isAdmin")) || [];
  loggedInUser.value = JSON.parse(localStorage.getItem("loggedInUser")) || [];
});
</script>
