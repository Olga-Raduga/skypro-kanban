<script setup>
import BaseHeader from '../components/BaseHeader.vue'
import ExitModal from '../components/ExitModal.vue'
import NewCardModal from '../components/NewCardModal.vue'
import TaskDesk from '../components/TaskDesk.vue'
import TaskModal from '../components/TaskModal.vue'
</script>

<template>
  <div>
    <div class="wrapper">
      <ExitModal />
      <NewCardModal />
      <TaskModal />
      <BaseHeader />
      <TaskDesk />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
width: 100%;
min-height: 100vh;
overflow: hidden;
background-color: #f1f1f1;
}
</style>

