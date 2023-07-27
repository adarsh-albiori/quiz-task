<template>
  <!-- Page - 1 -->
  <div v-if="count == 0">
    <v-card class="mx-auto mt-16" max-width="500" elevation="18">
      <v-form ref="form" v-model="isValid" class="pa-4 pt-6">
        <v-card-title
          class="text-center text-h4 font-weight-regular text-decoration-underline"
          >Create Quiz
        </v-card-title>
        <v-card-subtitle class="mt-4 mb-2 ml-2">
          Write your quiz title here.
        </v-card-subtitle>
        <v-text-field
          :rules="[rules.required]"
          v-model="quizInfo.quizTitle"
          label="Quiz Title"
          type="text"
          variant="outlined"
          class="mx-6"
        >
          <template v-slot:append-inner>
            <v-fade-transition leave-absolute> </v-fade-transition>
          </template>
        </v-text-field>

        <v-card-subtitle class="mt-4 mb-2 ml-2">
          Write your quiz relevant topics here.
        </v-card-subtitle>
        <v-text-field
          :rules="[rules.required]"
          v-model="quizInfo.quizRelevantTopic"
          clearable
          label="Quiz Relevant Topic"
          type="text"
          variant="outlined"
          class="mx-6"
        >
          <template v-slot:append-inner>
            <v-fade-transition leave-absolute> </v-fade-transition>
          </template>
        </v-text-field>

        <v-card-subtitle class="mt-4 mb-2 ml-2">
          select the level of quiz.
        </v-card-subtitle>
        <v-select
          :rules="[rules.required]"
          class="mx-6"
          v-model="quizInfo.level"
          clearable
          variant="outlined"
          label="Quiz Level"
          :items="['Easy', 'Medium', 'Hard']"
        ></v-select>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue" variant="tonal" @click="next" :disabled="!isValid">
          Next
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
  <!-- Page - 2 -->
  <div v-if="count == 1">
    <v-card class="mx-auto mt-16" max-width="700" elevation="18">
      <v-form ref="form" v-model="isValid" class="pa-4 pt-6">
        <div v-for="(question, index) in quizInfo.questions" :key="index">
          <h4 class="mt-12 ml-4 mb-4">Question {{ index + 1 }}:</h4>
          <v-text-field
            :rules="[rules.required]"
            v-model="question.text"
            clearable
            label="Question"
            type="text"
            variant="outlined"
            class="mx-4"
          >
          </v-text-field>
          <h4 class="mt-2 ml-4 mb-4">correct answer</h4>
          <v-text-field
            :rules="[rules.required]"
            v-model="question.correctOption"
            clearable
            label="correct option"
            type="text"
            variant="outlined"
            class="mx-4"
          >
          </v-text-field>
          <div v-for="(option, optIndex) in question.options" :key="optIndex">
            <h4 class="mt-2 ml-4 mb-4">Option {{ optIndex + 1 }} :</h4>
            <v-text-field
              :rules="[rules.required]"
              v-model="question.options[optIndex]"
              clearable
              label="Option"
              type="text"
              variant="outlined"
              class="mx-4"
            >
            </v-text-field>
            <v-btn
              size="small"
              @click="removeOption(index, optIndex)"
              color="red"
              variant="tonal"
              >Remove Option</v-btn
            >
          </div>
          <v-btn
            size="small"
            @click="addOption(index)"
            color="green"
            variant="tonal"
            >Add Option</v-btn
          >
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            size="small"
            @click="removeQuestion(index)"
            color="red"
            variant="tonal"
            >Remove Question</v-btn
          >
          <v-btn size="small" @click="addQuestion" color="green" variant="tonal"
            >Add Question</v-btn
          >
        </v-card-actions>
      </v-form>
      <v-card-actions>
        <v-btn color="blue" variant="tonal" @click="previous"> Previous </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="blue" variant="tonal" @click="save" :disabled="!isValid">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { ref } from "vue";
const count = ref(0);
const router = useRouter();
const temp = ref(0);
const isValid = ref(false);

const rules = {
  required: (v) => !!v || "This field is required",
};

const qData = ref([]);
const quizInfo = reactive({
  quizTitle: "",
  quizRelevantTopic: "",
  level: "",
  createdBy: null,
  questions: [{ text: "", options: [], correctOption: "" }],
});

const addQuestion = () => {
  quizInfo.questions.push({ text: "", options: [] });
};

const removeQuestion = (index) => {
  if (index == 0) {
    alert("you have to add minimum 1 question");
  } else {
    quizInfo.questions.splice(quizInfo.questions.length - 1, 1);
  }
};

const addOption = (questionIndex) => {
  if (temp.value < 4) {
    quizInfo.questions[questionIndex].options.push("");
    temp.value++;
  } else {
    alert("You can only Add 4 options");
    temp.value = 0;
  }
  console.log(temp.value);
};

const removeOption = (questionIndex, optionIndex) => {
  quizInfo.questions[questionIndex].options.splice(optionIndex, 1);
  temp.value--;
  console.log(temp.value);
};

function save() {
  qData.value = JSON.parse(localStorage.getItem("quiz-data")) || [];
  quizInfo.createdBy = JSON.parse(localStorage.getItem("loggedInUser")) || [];
  qData.value.push(quizInfo);
  localStorage.setItem("quiz-data", JSON.stringify(qData.value));
  quizInfo.quizTitle = "";
  quizInfo.quizRelevantTopic = "";
  quizInfo.level = "";
  quizInfo.createdBy = null;
  quizInfo.questions = [{ text: "", options: [], correctOption: "" }];
  router.push("/home");
}

function next() {
  return count.value++;
}
function previous() {
  return count.value--;
}
</script>
