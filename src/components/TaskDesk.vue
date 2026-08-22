<script setup>
 import { onMounted, ref } from 'vue'
 import TaskColumn from './TaskColumn.vue'
 import { tasks } from '../data.js'

const columnTitles = [
  'Без статуса',
  'Нужно сделать',
  'В работе',
  'Тестирование',
  'Готово',
]
  const isLoading = ref(true)
  onMounted(() => {
    setTimeout(() => {
      isLoading.value = false
      }, 1500)
  })
</script>

<template>
  <main class="main">
    <div class="container">
      <div class="main__block">
        <div v-if="isLoading" class="loading">
          Данные загружаются
        </div>
       <div class="main__content">
        <TaskColumn v-for="title in columnTitles"
         :key="title"
         :title="title"
         :tasks="tasks.filter((task) => task.status === title)" />
       </div>
      </div>
    </div>
  </main>
</template>
