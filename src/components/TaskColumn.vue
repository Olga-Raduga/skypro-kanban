<script setup>
import Task from './Task.vue'
defineProps({ title: String, tasks: { type: Array, default: () => [] } })
</script>

<template>
  <div class="main__column column">
    <div class="column__title"><p>{{ title }}</p></div>
    <div class="cards"><Task v-for="(task, index) in tasks" :key="`${title}-${index}`" v-bind="task" /></div>
  </div>
</template>
