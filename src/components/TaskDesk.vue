<script setup>
import TaskColumn from './TaskColumn.vue'

const columns = [
  { title: 'Без статуса', tasks: [
    { category: 'Web Design', categoryClass: '_orange' },
    { category: 'Research', categoryClass: '_green' },
    { category: 'Web Design', categoryClass: '_orange' },
    { category: 'Copywriting', categoryClass: '_purple' },
    { category: 'Web Design', categoryClass: '_orange' },
  ] },
  { title: 'Нужно сделать', tasks: [{ category: 'Research', categoryClass: '_green' }] },
  { title: 'В работе', tasks: [
    { category: 'Research', categoryClass: '_green' },
    { category: 'Copywriting', categoryClass: '_purple' },
    { category: 'Web Design', categoryClass: '_orange' },
  ] },
  { title: 'Тестирование', tasks: [{ category: 'Research', categoryClass: '_green' }] },
  { title: 'Готово', tasks: [{ category: 'Research', categoryClass: '_green' }] },
]
</script>

<template>
  <main class="main">
    <div class="container">
      <div class="main__block"><div class="main__content">
        <TaskColumn v-for="column in columns" :key="column.title" v-bind="column" />
      </div></div>
    </div>
  </main>
</template>
