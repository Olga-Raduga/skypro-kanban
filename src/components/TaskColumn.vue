<script setup>
  import Task from './Task.vue'
  
  defineProps({ title: {
      type: String,
      required: true,
   }, 
    tasks: { 
      type: Array, default: () => [],
    },
  })
</script>

<template>
<section class="main__column">
  <div class="column__title">
    <h2>{{ title }}</h2>
  </div>

  <div class="cards">
    <Task
      v-for="task in tasks"
      :key="task.id"
      v-bind="task"
    />
  </div>
</section>
</template>

<style scoped>
.main__column {
width: 20%;
margin: 0 auto;
display: block;
}
.column__title {
padding: 0 10px;
margin: 15px 0;
}
.column__title h2 {
color: #94a6be;
font-size: 14px;
font-weight: 600;
line-height: 1;
text-transform: uppercase;
}
.cards {
width: 100%;
display: block;
position: relative;
}
@media screen and (max-width: 1200px) {
.main__column {
width: 100%;
margin: 0 auto;
}
.cards {
display: flex;
overflow-x: auto;
overflow-y: hidden;
}
}
</style>

