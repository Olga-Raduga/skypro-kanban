<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const isUserMenuOpen = ref(false)
const router = useRouter()
</script>
<template>
  <header class="header">
    <div class="container">
      <div class="header__block">
        <div class="header__logo _show _light">
          <a href="" target="_self"><img src="/assets/logo.png" alt="logo" /></a>
        </div>
        <div class="header__logo _dark">
          <a href="" target="_self"><img src="/assets/logo_dark.png" alt="logo" /></a>
        </div>
        <nav class="header__nav">
          <button type="button" class="header__btn-main-new _hover01"
            id="btnMainNew"
            @click="router.push('/add-task')">Создать новую задачу
          </button>
          <button
           type="button" class="header__user _hover02"
              :aria-expanded="isUserMenuOpen"
              aria-controls="user-set-target"
              @click="isUserMenuOpen = !isUserMenuOpen">Ivan Ivanov
          </button>
            
          <div
              v-if="isUserMenuOpen" class="header__pop-user-set pop-user-set" id="user-set-target">

              <p class="pop-user-set__name">Ivan Ivanov</p>
              <p class="pop-user-set__mail">ivan.ivanov@gmail.com</p>
            <div class="pop-user-set__theme">
              <p>Темная тема</p>
              <input type="checkbox" class="checkbox" name="checkbox" />
            </div>
            <button type="button" class="_hover03"
            @click="router.push('/exit')">
            Выйти
            </button>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>