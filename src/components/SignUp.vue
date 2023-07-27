<template>
  <v-card class="mx-auto" style="max-width: 500px">
    <v-toolbar color="blue-darken-1" cards dark flat>
      <v-card-title class="text-h6 font-weight-regular"> Sign up </v-card-title>
    </v-toolbar>
    <v-form ref="form" v-model="isValid" class="pa-4 pt-6">
      <v-text-field
        v-model="user.name"
        :rules="[rules.required]"
        variant="filled"
        color="deep-purple"
        label="Name"
      ></v-text-field>
      <v-text-field
        v-model="user.email"
        :rules="[rules.email]"
        variant="filled"
        color="deep-purple"
        label="Email address"
        type="email"
      ></v-text-field>
      <v-text-field
        v-model="user.password"
        :rules="[rules.password, rules.length(6)]"
        variant="filled"
        color="deep-purple"
        counter="6"
        label="Password"
        style="min-height: 96px"
        type="password"
      ></v-text-field>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        @click="submit"
        :disabled="!isValid"
        :loading="isLoading"
        color="deep-purple-accent-4"
      >
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup>
import router from "@/router";
import { reactive, ref } from "vue";
const data = ref([]);
const isValid = ref(false);
const isLoading = false;
const user = reactive({
  name: "",
  email: "",
  password: "",
});
const rules = {
  email: (v) => !!(v || "").match(/@/) || "Please enter a valid email",
  length: (len) => (v) =>
    (v || "").length >= len || `Invalid character length, required ${len}`,
  password: (v) =>
    !!(v || "").match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
    "Password must contain an upper case letter, a numeric character, and a special character",
  required: (v) => !!v || "This field is required",
};
function submit() {
  data.value = JSON.parse(localStorage.getItem("users")) || [];
  data.value.push(user);
  localStorage.setItem("users", JSON.stringify(data.value));
  user.name = "";
  user.email = "";
  user.password = "";
  router.push("/");
}
</script>
