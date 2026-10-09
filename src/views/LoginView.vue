<script setup>
import { computed, inject, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AUTH_KEY } from '../injectionKeys.js'

const auth = inject(AUTH_KEY)
if (!auth) {
  throw new Error('Не удалось получить данные авторизации')
}

const router = useRouter()
const route = useRoute()
// Реактивные переменные (состояния полей ввода)
const login = ref('')
const password = ref('')
// Переменные для отслеживания ошибок и процесса отправки
const errorMessage = ref('')
const isSubmitting = ref(false)
const hasSubmitted = ref(false)
// Вычисляемые правила валидации (проверяют длину строк локально)
const isLoginValid = computed(
() => login.value.trim().length >= 4
)
const isPasswordValid = computed(
() => password.value.length >= 4
)
// Общая проверка формы: верны ли оба поля и нет ли сейчас ошибки от сервера
const isFormValid = computed(
  () => isLoginValid.value && isPasswordValid.value && !errorMessage.value
)
// Сообщение об успешной регистрации из адресной строки (если перешли с экрана регистрации)
const registeredMessage = computed(() =>
route.query.registered
? 'Регистрация прошла успешно. Теперь войдите в аккаунт.'
: ''
)
// Функция очистки ошибок: запускается каждый раз, когда пользователь что-то печатает в полях
function clearLoginError() {
  hasSubmitted.value = false
  errorMessage.value = ''
}
// Главная функция отправки формы на сервер
async function handlelogin() {
  hasSubmitted.value = true
  errorMessage.value = ''
// Если локальная валидация (длина строк) не пройдена, прерываем отправку запроса к API
  if (!isLoginValid.value || !isPasswordValid.value) {
  return
  }
  isSubmitting.value = true
  try {
    await auth.login({
    login: login.value.trim(),
    password: password.value
    })

// Проверяем, куда перенаправить пользователя после успешного входа
    const redirect = route.query.redirect
    router.replace(
      typeof redirect === 'string'
      ? redirect
      : '/'
    )

  } catch (error) {
    errorMessage.value = error.message || 'Не удалось войти'
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

      <h1>Вход</h1>
      <!-- Сообщение об успешной регистрации -->
      <p v-if="registeredMessage" class="auth-success">
       {{ registeredMessage }}
      </p>

      <form class="auth-form" novalidate @submit.prevent="handlelogin">
        <!-- Поле ввода Логина -->
        <!-- Класс auth-input_invalid добавится, если форма была отправлена, а логин короткий или если сервер вернул ошибку -->
        <input
          v-model="login"
          type="text"
          autocomplete="username"
          placeholder="Введите логин или email"
          @input="clearLoginError"
          :class="{
            'auth-input_invalid':
              hasSubmitted && (!isLoginValid || errorMessage)
          }"
          required
        />
          <p v-if="hasSubmitted && !isLoginValid" class="auth-error">
             Введите логин длиной не менее 4 символов.
          </p>
          <!-- Поле ввода Пароля -->
           <!-- Класс auth-input_invalid добавится при пустом/коротком пароле или при ошибке авторизации сервера -->
        <input
          v-model="password"
          type="password"
          autocomplete="current-password"
          placeholder="Введите пароль"
          @input="clearLoginError"
          :class="{
            'auth-input_invalid':
              hasSubmitted && (!isPasswordValid || errorMessage)
          }"
          required
        />
          <p v-if="hasSubmitted && !isPasswordValid" class="auth-error">
            Введите пароль длиной не менее 4 символов.
          </p>
<!-- Общая ошибка неверных данных (отображается при ошибке с сервера) -->
        <p v-if="errorMessage" class="auth-error" role="alert">
          Введенные вами данные не распознаны. Проверьте свой логин и пароль
          и повторите попытку входа.
        </p>
<!-- Кнопка блокируется (становится серой) либо во время загрузки (isSubmitting), либо если после отправки форма не валидна (!isFormValid) -->
        <button type="submit" :disabled="isSubmitting || (hasSubmitted && !isFormValid)">
          {{ isSubmitting ? 'Входим…' : 'Войти' }}
        </button>

      </form>

      <RouterLink to="/register" class="auth-link">
        Зарегистрироваться
      </RouterLink>
    </section>
  </main>
</template>
