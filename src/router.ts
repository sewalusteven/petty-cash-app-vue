import { createMemoryHistory, createRouter } from 'vue-router'

import Statement from './pages/Statement.vue'
import TransactionForm from './pages/TransactionForm.vue'

const routes = [
  { 
    path: '/', 
    name: "home", 
    component: TransactionForm 
},
  { 
    path: '/statement', 
    name: "statement", 
    component: Statement},
]

export const router = createRouter({
  history: createMemoryHistory(import.meta.env.BASE_URL),
  routes,
})