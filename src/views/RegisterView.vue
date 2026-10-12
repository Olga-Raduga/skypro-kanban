<script setup>
import { computed, inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import { AUTH_KEY } from '../injectionKeys.js'

const auth = inject(AUTH_KEY)
if (!auth) {
  throw new Error('Не удалось получить данные авторизации')
}


const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')

const hasSubmitted = ref(false)
const isSubmitting = ref(false)
const errorMessage = ref('')

const isNameValid = computed(() => name.value.trim().length >= 4)
const isEmailValid = computed(() =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())
)
const isPasswordValid = computed(() => password.value.length > 4)
const isFormValid = computed(
  () => isNameValid.value && isEmailValid.value && isPasswordValid.value
)
function clearRegisterError() {
  hasSubmitted.value = false
  errorMessage.value = ''
}
async function handleRegister() {
  hasSubmitted.value = true
  errorMessage.value = ''
  if (!isFormValid.value) {
    return
  }
  isSubmitting.value = true
  try {
    await auth.register({
      login: email.value.trim().toLowerCase(),
      name: name.value.trim(),
      password: password.value,
    })
    router.replace({
      name: 'login',
      query: { registered: '1' },
    })
  } catch (error) {
    errorMessage.value =
      error.message || 'Не удалось зарегистрироваться'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="auth-page">
    <section class="auth-card">
      <RouterLink to="/" class="auth-logo"
        aria-label="На главную"
      >
        <img src="/assets/logo.png" alt="Skypro" />
      </RouterLink>
      <h1>Регистрация</h1>

      <form class="auth-form" novalidate @submit.prevent="handleRegister">
        <input
          v-model="name"
          type="text"
          autocomplete="name"
          placeholder="Имя и фамилия"
          :class="{ 'auth-input_invalid': hasSubmitted && !isNameValid }"
            required
            @input="clearRegisterError"
        />
        <p v-if="hasSubmitted && !isNameValid" class="auth-error">
          Имя должно содержать не менее 4 символов
        </p>

        <input
          v-model="email"
          type="email"
          autocomplete="email"
          placeholder="Введите email"
          :class="{ 'auth-input_invalid': hasSubmitted && !isEmailValid }"
            required
            @input="clearRegisterError"
        />
        <p v-if="hasSubmitted && !isEmailValid" class="auth-error">
          Введите корректный email (например, user@example.com)
        </p>

        <input
          v-model="password"
          type="password"
          autocomplete="new-password"
          placeholder="Пароль"
          :class="{ 'auth-input_invalid': hasSubmitted && !isPasswordValid }"
            required
            @input="clearRegisterError"
        />
        <p v-if="hasSubmitted && !isPasswordValid" class="auth-error">
          Пароль должен содержать не менее 4 символов
        </p>

        <p v-if="hasSubmitted && !isFormValid" class="auth-error">
          Введенные вами данные не корректны. Чтобы завершить регистрацию,
          введите данные корректно и повторите попытку.
        </p>
        <p v-if="errorMessage" class="auth-error" role="alert">
          {{ errorMessage }}
        </p>
        <button type="submit" :disabled="isSubmitting || (hasSubmitted && !isFormValid)">
          {{ isSubmitting ? 'Регистрируем…' : 'Зарегистрироваться' }}
        </button>
      </form>

    <RouterLink to="/login" class="auth-link">
      Уже есть аккаунт? Войти
    </RouterLink>
    </section>
  </main>
</template>
