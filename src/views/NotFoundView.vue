<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <main class="auth-page">
    <section class="auth-card not-found-card">
      <RouterLink to="/" class="auth-logo" aria-label="На главную">
        <img src="/assets/logo.png" alt="Skypro" />
      </RouterLink>
      <div class="not-found-content">
        <h1 class="not-found-title">404</h1>
        <h2>Страница не найдена</h2>
        <p class="not-found-text">
          Возможно, она была удалена или вы ввели неверный адрес в строке браузера.
        </p>
      </div>
      <RouterLink to="/" class="form-new__create _hover01 not-found-btn">
        Вернуться на главную
      </RouterLink>
    </section>
  </main>
</template>

<style scoped>
/* Центрируем содержимое текстового блока */
.not-found-content {
  text-align: center;
  margin-bottom: 32px;
}

/* Огромная красивая цифра 404 фирменного синего цвета */
.not-found-title {
  font-size: 72px;
  font-weight: 700;
  line-height: 1;
  color: #565eef;
  margin-bottom: 12px;
}

.not-found-card h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #000000;
}

.not-found-text {
  font-size: 14px;
  color: #94a6be;
  line-height: 1.4;
  max-width: 280px;
  margin: 0 auto;
}

/* Стилизуем ссылку под стандартную синюю кнопку */
.not-found-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 44px;
  text-decoration: none;
  font-weight: 500;
}
</style>
