<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const cardId = computed(() => route.params.id)
</script>
<template>
  <main>
    <h1>Просмотр задачи</h1>
    <p>
      ID задачи: {{ cardId }}
    </p>
    <button>
      Редактировать задачу
    </button>
    <RouterLink to="/">
      Вернуться на доску
    </RouterLink>
  </main>
  </template>