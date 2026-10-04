<script setup>
import { ref } from 'vue'
import BaseHeader from '../components/BaseHeader.vue'
import TaskDesk from '../components/TaskDesk.vue'
import NewCardModal from '../components/NewCardModal.vue'

const taskDeskRef = ref(null)
function onTaskCreated() {
  taskDeskRef.value?.loadTasks()
}

</script>

<template>
    <div class="wrapper">
      <BaseHeader />
      <TaskDesk />

      <RouterView />
      <NewCardModal @task-created="onTaskCreated" />
      <TaskDesk ref="taskDeskRef" />
    </div>
</template>

<style scoped>
.wrapper {
max-width: 100%;
width: 100vw;
min-height: 100vh;
overflow: hidden;
background-color: #f1f1f1;  
}
</style>

