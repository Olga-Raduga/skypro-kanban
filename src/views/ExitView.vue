<script setup>
import { useRouter } from 'vue-router'
import { clearSession } from '../services/session.js'
const router = useRouter()
const logout = () => {
  clearSession()
  router.replace('/login')
}
const stay = () => {
  router.replace('/')
}
</script>
<template>
  <main class="pop-exit-page">
    <section class="pop-exit-card">
      <h1>Выйти из аккаунта?</h1>

      <div class="pop-exit-actions">
        <button type="button" @click="logout">
          Да, выйти
        </button>
        <button type="button" @click="stay">
          Нет, остаться
        </button>
      </div>
    </section> 
  </main>
</template>

<style scoped>
.pop-exit-page {
  position: fixed;
  inset: 0;
  z-index: 1000;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(0, 0, 0, 0.4);
}
.pop-exit-card {
  width: 100%;
  max-width: 370px;
  padding: 50px 60px;
  border: 1px solid #d4dbe5;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 67px -12px rgba(0, 0, 0, 0.13);
}
.pop-exit-card h1 {
  margin-bottom: 20px;
  text-align: center;
  font-size: 20px;
}
.pop-exit-actions {
  display: flex;
  gap: 10px;
}
.pop-exit-actions button {
  width: 100%;
  height: 30px;
  border: 1px solid #565eef;
  border-radius: 4px;
  background: transparent;
  color: #565eef;
  cursor: pointer;
}
.pop-exit-actions button:first-child {
  background-color: #565eef;
  color: #ffffff;
}
</style>