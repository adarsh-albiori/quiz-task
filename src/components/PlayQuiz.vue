<template>
  <v-card
    class="mx-auto mt-10 mb-10"
    max-width="544"
    height="344"
    v-if="quizData"
    elevation="10"
  >
    <v-form ref="form" v-model="isValid" class="pa-4 pt-6">
      <v-card-item>
        <div class="text-overline mb-1 ml-3 mt-3">
          {{ quizData[store.quizIndex].questions[currentQuestion].text }}
        </div>
        <v-radio-group v-model="optValue" :rules="[rules.required]">
          <v-radio
            v-for="(option, optIndex) in quizData[store.quizIndex].questions[
              currentQuestion
            ].options"
            :key="optIndex"
            :value="option"
            :label="option"
          />
        </v-radio-group>
      </v-card-item>
    </v-form>
    <v-card-actions class="mb-2">
      <v-btn
        class="ml-3"
        color="blue"
        variant="elevated"
        v-if="currentQuestion > 0"
        @click="prevQuestion"
        >Previous</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!isValid"
        class="mr-3"
        color="blue"
        variant="elevated"
        @click="nextQuestion"
        v-if="currentQuestion < quizData[store.quizIndex].questions.length - 1"
        >Next</v-btn
      >
      <v-btn v-else @click="showResults" color="green" variant="elevated"
        >Show Results</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { quizStore } from "../store/index";
import { reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const quizData = ref(null);
const currentQuestion = ref(0);
const optValue = ref("");
const selectedOptions = reactive([]);
const store = quizStore();
const isValid = ref(false);

const rules = {
  required: (v) => !!v || "This field is required",
};

function nextQuestion() {
  if (
    currentQuestion.value <
    quizData.value[store.quizIndex].questions.length - 1
  ) {
    currentQuestion.value++;
    selectedOptions.push(optValue.value);
  }
}

function prevQuestion() {
  if (currentQuestion.value > 0) {
    currentQuestion.value--;
  }
}
function showResults() {
  selectedOptions.push(optValue.value);
  let score = 0;
  for (let i = 0; i < selectedOptions.length; i++) {
    if (
      selectedOptions[i] ==
      quizData.value[store.quizIndex].questions[i].correctOption
    ) {
      score++;
    }
    router.push("/result");
    store.result = score + "/" + selectedOptions.length;
  }
}
onMounted(() => {
  quizData.value = JSON.parse(localStorage.getItem("quiz-data"));
});
</script>
