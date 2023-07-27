import { defineStore } from 'pinia'

export const quizStore = defineStore('quizs', {
  state: () => ({
    isLoggedIn: false,
    loggedInUser: "",
    quizIndex: "",
    userData: [],
    result: "",
    userIndex: ""
  }),
  getters: {
    double: state => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
