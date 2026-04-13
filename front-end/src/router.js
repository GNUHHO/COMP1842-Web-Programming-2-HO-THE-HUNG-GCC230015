import { createRouter, createWebHistory } from 'vue-router'

import HomeView from './views/HomeView.vue' // Public homepage
import LoginView from './views/LoginView.vue'
import AdminDashboardView from './views/AdminDashboardView.vue' // Dashboard for Admin
import UserDashboardView from './views/UserDashboardView.vue' // Dashboard for User
import IssueDetailView from './views/IssueDetailView.vue'
import QuizView from './views/QuizView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView 
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/admin-dashboard',
      name: 'admin-dashboard',
      component: AdminDashboardView
    },
    {
      path: '/user-dashboard',
      name: 'user-dashboard',
      component: UserDashboardView
    },
    {
      path: '/issue/:id',
      name: 'issue-detail',
      component: IssueDetailView
    },
    { 
      path: '/quiz', 
      name: 'quiz', 
      component: QuizView 
    }
  ]
})

export default router