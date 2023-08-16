import { createRouter, createWebHistory } from 'vue-router'
import SignUp from "../components/SignUp.vue"
import SignIn from "../components/SignIn.vue"
import HomePage from "../components/HomePage.vue"
import CreatePage from "../components/CreatePage.vue"
import PlayQuiz from "../components/PlayQuiz.vue"
import UserProfile from "../components/UserProfile.vue"
import NotFound from "../components/NotFound.vue"
import EditPage from "../components/EditPage.vue"
import ShowResult from "../components/ShowResult.vue"
import UsersList from "../components/UsersList.vue"
import UserCard from "../components/UserCard.vue"


const routes = [
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
  },
  {
    path: '/',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/create',
    name: 'create-quiz',
    component: CreatePage,
  },
  {
    path: '/play-quiz',
    component: PlayQuiz,
    children: [
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: UserProfile,
  },
  {
    path: '/edit',
    name: 'edit',
    component: EditPage,
  },
  {
    path: '/result',
    name: "result",
    component: ShowResult
  },
  {
    path: '/user-list',
    name: "user-list",
    component: UsersList
  },
  {
    path: '/user-card',
    name: "user-card",
    component: UserCard
  },
  { path: '/:pathMatch(.*)*', component: NotFound },

]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
