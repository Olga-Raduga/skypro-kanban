<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

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
  <main class="auth-page">
    <section class="auth-card">
    <h1 class="auth-title">Регистрация</h1>
    <form class="auth-form" @submit.prevent="register">
      <label class="auth-field">
        <span>Email</span>
        <input
          v-model="email"
          class="auth-input"
          type="email"
          placeholder="Введите email"
          autocomplete="email"
          required
        />
      </label>
      <label class="auth-field">
        <span>Пароль</span>
        <input
          v-model="password"
          class="auth-input"
          type="password"
          placeholder="Введите пароль"
          autocomplete="new-password"
          required
        />
      </label>

      <p v-if="error" class="auth-error" role="alert">
        {{ error }}
      </p>
      <button class="auth-submit" type="submit">
        Зарегистрироваться
      </button>
    </form>

    <RouterLink class="auth-link" to="/login">
      Уже есть аккаунт? Войти
    </RouterLink>
    </section>
  </main>
</template>