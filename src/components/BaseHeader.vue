<script setup>
import { ref } from 'vue'
const isUserMenuOpen = ref(false)
</script>
<template>
  <header class="header">
    <div class="container">
      <div class="header__block">
        <div class="header__logo">
          <a href="#">
            <img src="/assets/logo.png" alt="Логотип Skypro" 
            />
          </a>
        </div>
        <div class="header__logo _dark">
          <a href="#">
            <img src="/assets/logo_dark.png" alt="Логотип Skypro" 
            />
          </a>
        </div>
        <nav class="header__nav">
          <a href="#popNewCard" class="header__btn-main-new">
           Создать новую задачу 
          </a>
          <button
           type="button" class="header__user"
              :aria-expanded="isUserMenuOpen"
              aria-controls="user-set-target"
              @click="isUserMenuOpen = !isUserMenuOpen">Ivan Ivanov
          </button>
            
          <div
            v-if="isUserMenuOpen"
            id="user-set-target" class="header__pop-user-set">

              <p class="pop-user-set__name">Ivan Ivanov</p>
              <p class="pop-user-set__mail">ivan.ivanov@gmail.com</p>
            <div class="pop-user-set__theme">
              <p>Темная тема</p>
              <input type="checkbox" name="theme" 
              />
            </div>
            
              <a href="#popExit" class="pop-user-set__exit">Выйти</a>           
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
width: 100%;
background-color: #ffffff;
}
.header__block {
position: relative;
height: 70px;
padding: 0 10px;
display: flex;
align-items: center;
justify-content: space-between;
}
.header__logo img {
display: block;
width: 85px;
}
.header__nav {
position: relative;
display: flex;
align-items: center;
}
.header__btn-main-new {
width: 178px;
height: 30px;
margin-right: 20px;
display: flex;
align-items: center;
justify-content: center;
border-radius: 4px;
background-color: #565eef;
color: #ffffff;
font-size: 14px;
font-weight: 500;
line-height: 1;
}
.header__btn-main-new:hover {
background-color: #33399b;
}
.header__user {
height: 20px;
display: flex;
align-items: center;
border: 0;
background: transparent;
color: #565eef;
font-size: 14px;
line-height: 20px;
}
.header__user::after {
content: '';
width: 6px;
height: 6px;
margin: -6px 0 0 5px;
border-left: 1.9px solid #565eef;
border-bottom: 1.9px solid #565eef;
border-radius: 1px;
transform: rotate(-45deg);
}
.header__user:hover {
color: #33399b;
}
.header__pop-user-set {
position: absolute;
top: 45px;
right: 0;
z-index: 2;
width: 213px;
min-height: 205px;
padding: 34px;
border: 0.7px solid rgba(148, 166, 190, 0.4);
border-radius: 10px;
background-color: #ffffff;
box-shadow: 0 10px 39px rgba(26, 56, 101, 0.21);
text-align: center;
}
.pop-user-set__name {
margin-bottom: 4px;
color: #000000;
font-size: 14px;
font-weight: 500;
}
.pop-user-set__mail {
margin-bottom: 24px;
color: #94a6be;
font-size: 14px;
}
.pop-user-set__theme {
margin-bottom: 24px;
display: flex;
align-items: center;
justify-content: space-between;
color: #000000;
font-size: 14px;
}
.pop-user-set__theme input {
width: 24px;
height: 13px;
appearance: none;
border-radius: 100px;
background-color: #eaEEF6;
}
.pop-user-set__exit {
display: inline-flex;
align-items: center;
justify-content: center;
width: 72px;
height: 30px;
border: 1px solid #565eef;
border-radius: 4px;
color: #565eef;
font-size: 14px;
}
.pop-user-set__exit:hover {
background-color: #33399b;
color: #ffffff;
}
@media screen and (max-width: 495px) {
.header__btn-main-new {
position: fixed;
left: 16px;
bottom: 30px;
z-index: 3;
width: calc(100vw - 32px);
height: 40px;
}
}
</style>
