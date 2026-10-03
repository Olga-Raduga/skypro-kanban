<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('isAuthenticated') // Стираем статус авторизации
  router.replace('/login') // Перенаправляем на страницу входа
}

const stay = () => {
  router.replace('/') // Просто возвращаем на главную страницу
}
</script>
<template>
  <div id="popExit" class="pop-exit" >
    <div class="pop-exit__container">
      <div class="pop-exit__block">
        <div class="pop-exit__ttl">
          <h2>Выйти из аккаунта?</h2>
        </div>     
          <div class="pop-exit__form-group">
            <button type="button" class="pop-exit__exit-yes" @click="logout">Да, выйти</button>
            <button type="button" class="pop-exit__exit-no" @click="stay">Нет, остаться</button>
          </div>       
      </div>
    </div>
  </div>
</template>
<style scoped>
.pop-exit {
position: fixed;
inset: 0;
z-index: 5;
display: none;
}
.pop-exit:target {
display: block;
}
.pop-exit__container {
width: 100%;
height: 100%;
padding: 0 16px;
display: flex;
align-items: center;
justify-content: center;
background: rgba(0, 0, 0, 0.4);
}
.pop-exit__block {
width: 100%;
max-width: 370px;
padding: 50px 60px;
border: 0.7px solid #d4dbe5;
border-radius: 10px;
background-color: #ffffff;
box-shadow: 0 4px 67px -12px rgba(0, 0, 0, 0.13);
}
.pop-exit__ttl h2 {
margin-bottom: 20px;
text-align: center;
color: #000000;
font-size: 20px;
font-weight: 700;
line-height: 30px;
letter-spacing: -0.4px;
}
.pop-exit__form-group {
display: flex;
align-items: center;
justify-content: space-between;
}
.pop-exit__exit-yes,
.pop-exit__exit-no {
width: 153px;
height: 30px;
display: flex;
align-items: center;
justify-content: center;
border-radius: 4px;
font-size: 14px;
font-weight: 500;
line-height: 21px;
}
.pop-exit__exit-yes {
margin-right: 10px;
background-color: #565eef;
color: #ffffff;
letter-spacing: -0.14px;
}
.pop-exit__exit-no {
border: 1px solid #565eef;
color: #565eef;
letter-spacing: -0.14px;
}
.pop-exit__exit-yes:hover {
background-color: #33399b;
}
.pop-exit__exit-no:hover {
background-color: #33399b;
color: #ffffff;
}
.pop-exit__exit-yes a {
  width: 100%;
  height: 100%;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pop-exit__exit-no a {
  width: 100%;
  height: 100%;
  color: #565EEF;
  display: flex;
  align-items: center;
  justify-content: center;
}
.subttl {
  color: #000;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
}

@media screen and (max-width: 375px) {
.pop-exit__block {
padding: 50px 20px;
}
.pop-exit__form-group {
display: block;
}
.pop-exit__exit-yes,
.pop-exit__exit-no {
width: 100%;
height: 40px;
}
.pop-exit__exit-yes {
margin-right: 0;
margin-bottom: 10px;
}
}
@media only screen and (max-width: 375px) {
  .pop-exit__block {
    padding: 50px 20px;
  }
  .pop-exit__exit-yes {
    width: 100%;
    height: 40px;
    margin-right: 0;
    margin-bottom: 10px;
  }
  .pop-exit__exit-no {
    width: 100%;
    height: 40px;
  }
  .pop-exit__form-group {
    display: block;
  }
}
</style>
