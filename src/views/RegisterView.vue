<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const hasSubmitted = ref(false)

const isNameValid = computed(() => name.value.trim().length >= 2)
const isEmailValid = computed(() =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())
)
const isPasswordValid = computed(() => password.value.trim().length > 0)
const isFormValid = computed(
  () => isNameValid.value && isEmailValid.value && isPasswordValid.value
)
const register = () => {
  hasSubmitted.value = true
  if (!isFormValid.value) return

  localStorage.setItem('registeredName', name.value.trim())
  localStorage.setItem('registeredEmail', email.value.trim())
  localStorage.setItem('registeredPassword', password.value)

  router.push('/login')
}
</script>

<template>
  <main class="auth-page">
    <section class="auth-card">
      <RouterLink to="/" class="auth-logo">
        <img src="/assets/logo.png" alt="Skypro" />
      </RouterLink>
      <h1>Регистрация</h1>

      <form class="auth-form" novalidate @submit.prevent="register">
        <input
          v-model="name"
          type="text"
          placeholder="Имя и фамилия"
          :class="{ 'auth-input_invalid': hasSubmitted && !isNameValid }"
        />

        <input
          v-model="email"
          type="email"
          placeholder="Введите email"
          :class="{ 'auth-input_invalid': hasSubmitted && !isEmailValid }"
        />

        <input
          v-model="password"
          type="password"
          placeholder="Пароль"
          :class="{ 'auth-input_invalid': hasSubmitted && !isPasswordValid }"
        />
  
        <p v-if="hasSubmitted && !isFormValid" class="auth-error">
          Введенные вами данные не корректны. Чтобы завершить регистрацию,
          введите данные корректно и повторите попытку.
        </p>
        <button type="submit" :disabled="hasSubmitted && !isFormValid">
          Зарегистрироваться
        </button>
      </form>

    <RouterLink to="/login" class="auth-link">
      Уже есть аккаунт? Войти
    </RouterLink>
    </section>
  </main>
</template>