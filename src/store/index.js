import { defineStore } from 'pinia'

export const quizStore = defineStore('quizs', {
  state: () => ({
    isLoggedIn: false,
    loggedInUser: "",
    isAdmin: false,
    quizIndex: "",
    userData: [],
    result: null,
    userIndex: ""
  }),
  getters: {
  },
  actions: {
    signout() {
      this.loggedInUser = "";
      this.isLoggedIn = false;
      this.quizIndex = "";
      localStorage.setItem("isLoggedIn", JSON.stringify(false));
      localStorage.setItem("isAdmin", JSON.stringify(false));
      localStorage.setItem("loggedInUser", JSON.stringify(""));
    },
    getLoggedInUser() {
      return JSON.parse(localStorage.getItem("loggedInUser")) || []
    },
    getUsers() {
      return JSON.parse(localStorage.getItem("users")) || [];
    },
    getQuizData() {
      return JSON.parse(localStorage.getItem("quiz-data")) || []
    },
    getIsAdmin() {
      return JSON.parse(localStorage.getItem("isAdmin")) || []
    },
    getIsLoggedIn() {
      return JSON.parse(localStorage.getItem("isLoggedIn")) || [];
    },
    setUsers(data) {
      return localStorage.setItem("users", JSON.stringify(data));
    },
    setQuizData(data) {
      return localStorage.setItem("quiz-data", JSON.stringify(data));
    },
    matchedUser() {
      localStorage.setItem("loggedInUser", JSON.stringify(this.loggedInUser));
      this.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      localStorage.setItem("isAdmin", JSON.stringify(false));
    },
    adminLogin() {
      localStorage.setItem("isAdmin", JSON.stringify(true));
      localStorage.setItem("loggedInUser", JSON.stringify("Admin"));
      this.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
    },
    loginError() {
      alert("sorry wrong password or email");
      localStorage.setItem("isAdmin", JSON.stringify(false));
    }

  },
})
