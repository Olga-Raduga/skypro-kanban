<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
const isUserMenuOpen = ref(false)
const router = useRouter()
</script>
<template>
  <header class="header">
    <div class="container">
      <div class="header__block">
        <div class="header__logo">
          <RouterLink to="/">
            <img src="/assets/logo.png" alt="Логотип Skypro" />
          </RouterLink>
        </div>
        <div class="header__logo _dark">
          <RouterLink to="/">
            <img src="/assets/logo_dark.png" alt="Логотип Skypro"
          </RouterLink>
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
            v-if="isUserMenuOpen"
            id="user-set-target" class="header__pop-user-set">

              <p class="pop-user-set__name">Ivan Ivanov</p>
              <p class="pop-user-set__mail">ivan.ivanov@gmail.com</p>
            <div class="pop-user-set__theme">
              <p>Темная тема</p>
              <input type="checkbox" name="theme" 
              />
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

<style scoped>
._dark {
display: none;
}
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

._hover01:hover {
  background-color: #33399b;
}

._hover02:hover, .header__user:hover {
  color: #33399b;
}
._hover02:hover::after, .header__user:hover::after {
  border-left-color: #33399b;
  border-bottom-color: #33399b;
}

._hover03:hover {
  background-color: #33399b;
  color: #FFFFFF;
}
._hover03:hover a {
  color: #FFFFFF;
}

.pop-user-set__name {
margin-bottom: 4px;
color: #000000;
font-size: 14px;
font-weight: 500;
line-height: 21px;
letter-spacing: -0.14px;
}
.pop-user-set__mail {
margin-bottom: 24px;
color: #94a6be;
font-size: 14px;
line-height: 21px;
letter-spacing: -0.14px;
}
.pop-user-set__theme {
margin-bottom: 24px;
display: flex;
align-items: center;
justify-content: space-between;
color: #000000;
font-size: 14px;
}
.pop-user-set__theme p {
  color: #000;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.14px;
}
.pop-user-set__theme input {
width: 24px;
height: 13px;
appearance: none;
border-radius: 100px;
background-color: #eaEEF6;
}

.pop-user-set__theme input[type=checkbox] {
  position: relative;
  width: 24px;
  height: 13px;
  border-radius: 100px;
  background: #EAEEF6;
  outline: none;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}
.pop-user-set__theme input[type=checkbox]::before {
  content: "";
  position: absolute;
  top: 1px;
  left: 1px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background-color: #94A6BE;
  transition: 0.5s;
}
.pop-user-set__theme input:checked[type=checkbox]::before {
  left: 12px;
}
.pop-user-set button {
  width: 72px;
  height: 30px;
  background: transparent;
  color: #565EEF;
  border-radius: 4px;
  border: 1px solid #565EEF;
}
.pop-user-set button a {
  color: #565EEF;
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
top: auto;
z-index: 3;
width: calc(100vw - 32px);
height: 40px;
border-radius: 4px;
margin-right: 0;
}
}
</style>
