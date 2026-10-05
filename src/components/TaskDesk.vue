<script setup>
 import { onMounted, ref } from 'vue'
 import TaskColumn from './TaskColumn.vue'
 import {
  tasks,
  loadTasks as requestTasks,
} from '../services/tasks.js'

const columnTitles = [
  'Без статуса',
  'Нужно сделать',
  'В работе',
  'Тестирование',
  'Готово',
]
  
  const isLoading = ref(true)
  const loadError = ref('')

  async function loadTasks() {
  isLoading.value = true
  loadError.value = ''

  try {
    await requestTasks()
  } catch (error) {
    loadError.value = error.message || 'Не удалось загрузить задачи.'
  } finally {
    isLoading.value = false
  }
}
  onMounted(loadTasks)

  defineExpose({ loadTasks })
</script>

<template>
  <main class="main">
    <div class="container">
      <div class="main__block">
        <!-- Сценарий 1: данные ещё загружаются -->
        <div v-if="isLoading" class="loader" aria-live="polite">
          <span class="loader__spinner" aria-hidden="true"></span>
          <span class="loader__text">Данные загружаются</span>
        </div>
        <!-- Сценарий 2: API вернул ошибку -->
        <div
        v-else-if="loadError"
        class="empty-state"
        role="alert"
        >
          <p>{{ loadError }}</p>
          <button type="button" @click="loadTasks">
            Повторить
          </button>
        </div>
        <!-- Сценарий 3: загрузка закончилась, но задач нет -->
        <div v-else-if="tasks.length === 0" class="empty-state">
         Задач нет
        </div>
        <!-- Сценарий 4: загрузка закончилась и задачи есть -->
        <div v-else class="main__content">
        <TaskColumn v-for="title in columnTitles"
         :key="title"
         :title="title"
         :tasks="tasks.filter((task) => task.status === title)"
        />
       </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.main {
width: 100%;
min-height: calc(100vh - 70px);
background-color: #eaEEF6;
}
.main__block {
width: 100%;
padding: 25px 0 49px;
}
.main__content {
display: flex;
width: 100%;
}
.loader {
min-height: 400px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 16px;
color: #94a6be;
font-size: 18px;
font-weight: 500;
}
.loader__spinner {
width: 36px;
height: 36px;
border: 4px solid rgba(86, 94, 239, 0.2);
border-top-color: #565eef;
border-radius: 50%;
animation: loader-rotate 0.8s linear infinite;
}
.loader__text {
animation: loader-pulse 1.3s ease-in-out infinite;
}
.empty-state {
min-height: 400px;
display: flex;
align-items: center;
justify-content: center;
color: #94a6be;
font-size: 20px;
font-weight: 500;
}
.column__title p {
  color: #94A6BE;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
}
@keyframes loader-rotate {
to {
transform: rotate(360deg);
}
}
@keyframes loader-pulse {
0%,
100% {
opacity: 0.45;
}
50% {
opacity: 1;
}
}
@media screen and (max-width: 1200px) {
.main__content {
display: block;
}
.main__block {
padding: 40px 0 64px;
width: 100%;
margin: 0 auto;
}

}
</style>

