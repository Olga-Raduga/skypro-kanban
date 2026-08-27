<script setup>
  import Task from './Task.vue'
  
   defineProps({ title: String, tasks: { type: Array, default: () => [] } })
</script>

<template>
  <div class="cards">
    <Task
      v-for="task in tasks"
      :key="task.id"
      v-bind="task"
    />
  </div>
</template>
