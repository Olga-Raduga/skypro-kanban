<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const logout = () => {
  localStorage.removeItem('isAuthenticated')
  router.replace('/login')
}
const stay = () => {
  router.back()
}
</script>
<template>
  <main>
    <h1>Выйти из аккаунта?</h1>
    <button type="button" @click="logout">
      Да, выйти
    </button>
    <button type="button" @click="stay">
      Нет, остаться
    </button>
  </main>
</template>