<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const title = ref('')
const addTask = () => {
  if (!title.value.trim()) {
    return
  }
  router.push('/')
}
</script>
<template>
  <main>
    <h1>Добавление задачи</h1>
    <form @submit.prevent="addTask">
      <input
        v-model="title"
        placeholder="Название задачи"
      />
      <button type="submit">
        Добавить задачу
      </button>
    </form>
    <RouterLink to="/">
      Отменить
    </RouterLink>
  </main>
</template>