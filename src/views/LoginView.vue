<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const hasSubmitted = ref(false)

const registeredEmail = localStorage.getItem('registeredEmail') || ''
const registeredPassword = localStorage.getItem('registeredPassword') || ''
const isEmailValid = computed(() =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())
)
const emailMatches = computed(
  () => email.value.trim().toLowerCase() === registeredEmail.toLowerCase()
)
const passwordMatches = computed(
  () => password.value === registeredPassword
)
const credentialsValid = computed(
  () =>
    isEmailValid.value &&
    password.value.trim().length > 0 &&
    emailMatches.value &&
    passwordMatches.value
)
const login = () => {
  hasSubmitted.value = true
  if (!credentialsValid.value) return

  localStorage.setItem('isAuthenticated', 'true')
  router.push('/')
}
const clearLoginError = () => {
  hasSubmitted.value = false
}
</script>

<template>
  <main class="auth-page">
    <section class="auth-card">
      <RouterLink to="/" class="auth-logo">
        <img src="/assets/logo.png" alt="Skypro" />
      </RouterLink>

      <h1>Вход</h1>

      <form class="auth-form" novalidate @submit.prevent="login">
        <input
          v-model="email"
          type="email"
          placeholder="Введите email"
          @input="clearLoginError"
          :class="{
            'auth-input_invalid':
              hasSubmitted && (!isEmailValid || !emailMatches),
          }"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Введите пароль"
          @input="clearLoginError"
          :class="{
            'auth-input_invalid':
              hasSubmitted && (!password.trim() || !passwordMatches),
          }"
        />

        <p v-if="hasSubmitted && !credentialsValid" class="auth-error">
          Введенные вами данные не распознаны. Проверьте свой логин и пароль
          и повторите попытку входа.
        </p>

        <button type="submit" :disabled="hasSubmitted && !credentialsValid">
          Войти
        </button>
      </form>

      <RouterLink to="/register" class="auth-link">
        Зарегистрироваться
      </RouterLink>
    </section>
  </main>
</template>