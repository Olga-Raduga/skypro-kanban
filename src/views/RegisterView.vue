<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const register = () => {
  if (!email.value.trim() || !password.value.trim()) {
    error.value = 'Заполните все поля'
    return
  }
  localStorage.setItem('registeredEmail', email.value)
  router.push('/login')
}
</script>
<template>
  <main>
    <h1>Регистрация</h1>
    <form @submit.prevent="register">
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
        Зарегистрироваться
      </button>
    </form>
    <RouterLink to="/login">
      Уже есть аккаунт
    </RouterLink>
  </main>
</template>