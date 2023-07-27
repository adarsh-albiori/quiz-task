<template>
  <div class="mt-16">
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        v-model="email"
      ></v-text-field>

      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        Password
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        v-model="password"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-btn
        block
        class="mb-6 mt-4"
        color="blue"
        size="large"
        variant="tonal"
        @click="login"
      >
        Log In
      </v-btn>

      <v-card-text class="text-center">
        <v-btn
          class="text-blue text-decoration-none"
          to="/signup"
          variant="flat"
          rel="noopener noreferrer"
        >
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { quizStore } from "../store/index.js";
import { ref } from "vue";
const visible = ref(false);
const email = ref("");
const password = ref("");
const router = useRouter();
const store = quizStore();

function login() {
  const userInfo = JSON.parse(localStorage.getItem("users")) || [];
  const matchedUsers = userInfo.filter(
    (user) => user.email === email.value && user.password === password.value
  );
  if (matchedUsers.length > 0) {
    store.loggedInUser = matchedUsers[0];
    localStorage.setItem("loggedInUser", JSON.stringify(matchedUsers[0]));
    store.isLoggedIn = true;
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
    localStorage.setItem("isAdmin", JSON.stringify(false));
    router.push("/home");
  } else if (email.value == "admin@" && password.value == "admin") {
    localStorage.setItem("isAdmin", JSON.stringify(true));
    localStorage.setItem("loggedInUser", JSON.stringify("Admin"));
    store.isLoggedIn = true;
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
    router.push("/home");
  } else {
    alert("sorry wrong password or email");
    localStorage.setItem("isAdmin", JSON.stringify(false));
  }
}
</script>
