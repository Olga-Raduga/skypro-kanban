<script setup>
import BaseHeader from '../components/BaseHeader.vue'
import TaskDesk from '../components/TaskDesk.vue'
</script>

<template>
    <div class="wrapper">
      <BaseHeader />
      <TaskDesk />

      <RouterView />
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

