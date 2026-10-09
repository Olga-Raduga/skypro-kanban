<script setup>
import { provide } from 'vue'
import { RouterView } from 'vue-router'
import { AUTH_KEY, TASKS_KEY } from '../injectionKeys.js'
import {
  clearSession,
  currentUser,
  isAuthenticated,
  setSession,
} from '../services/session.js'
import { loginUser, registerUser } from '../services/api.js'
import {
  createTask,
  deleteTask,
  getTaskById,
  isTasksLoading,
  loadTasks,
  tasks,
  tasksError,
  updateTask,
} from '../services/tasks.js'
async function login(credentials) {
  const data = await loginUser(credentials)
  setSession(data.user)
  return data.user
}
function register(credentials) {
  return registerUser(credentials)
}
function logout() {
  clearSession()
  tasks.value = []
  tasksError.value = ''
}
provide(AUTH_KEY, {
  currentUser,
  isAuthenticated,
  login,
  register,
  logout,
})
provide(TASKS_KEY, {
  tasks,
  isTasksLoading,
  tasksError,
  loadTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
})
</script>
<template>
  <RouterView />
</template>
