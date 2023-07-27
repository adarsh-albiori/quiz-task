<template>
  <v-container>
    <v-card class="mx-auto" elevation="10" color="blue-lighten-4">
      <v-row dense>
        <v-col cols="12">
          <v-card
            color="#1F7087"
            theme="dark"
            class="mx-10 my-8"
            v-for="(user, index) in users"
            :key="index"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="text-h5 mt-2">
                  {{ user.name }}
                </v-card-title>
                <v-card-actions>
                  <v-btn
                    class="ms-2"
                    variant="outlined"
                    size="small"
                    @click="showUser(index)"
                  >
                    See User Details
                  </v-btn>
                  <!-- <br /> -->
                  <v-btn
                    class="ms-2"
                    variant="tonal"
                    size="small"
                    color="red"
                    @click="remove(index)"
                  >
                    Delete User
                  </v-btn>
                </v-card-actions>
              </div>

              <v-avatar class="ma-3" size="125" rounded="0">
                <v-img :src="`https://robohash.org/${user.name}`"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script setup>
import { onBeforeMount } from "vue";
import { ref } from "vue";
import { quizStore } from "../store/index";
const store = quizStore();
import { useRouter } from "vue-router";
const router = useRouter();

const users = ref(null);
const loggedInUser = ref(null);

function remove(index) {
  users.value.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users.value));
}

function showUser(index) {
  store.userIndex = index;
  router.push("/user-card");
}

onBeforeMount(() => {
  users.value = JSON.parse(localStorage.getItem("users"));
  loggedInUser.value = JSON.parse(localStorage.getItem("loggedInUser"));
});
</script>
