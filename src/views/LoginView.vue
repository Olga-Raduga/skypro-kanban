<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')

const login = () => {
  if (!email.value.trim() || !password.value.trim()) {
    error.value = 'Заполните все поля'
    return
  }

  localStorage.setItem('isAuthenticated', 'true')
  router.push('/')
}
</script>

<template>
  <main>
    <h1>Вход</h1>
    <form @submit.prevent="login">
      <input
        v-model="email"
        type="email"
        placeholder="Введите email"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Введите пароль"
      />
      <p v-if="error">{{ error }}</p>
      <button type="submit">
        Войти
      </button>
    </form>
    <RouterLink to="/register">
      Зарегистрироваться
    </RouterLink>
  </main>
</template>