<template>
  <div id="popExit" class="pop-exit" >
    <div class="pop-exit__container">
      <div class="pop-exit__block">
        <div class="pop-exit__ttl">
          <h2>Выйти из аккаунта?</h2>
        </div>     
          <div class="pop-exit__form-group">
            <a href="#" class="pop-exit__exit-yes">Да, выйти</a>
            <a href="#" class="pop-exit__exit-no">Нет, остаться</a>
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
}
.pop-exit__exit-yes {
margin-right: 10px;
background-color: #565eef;
color: #ffffff;
}
.pop-exit__exit-no {
border: 1px solid #565eef;
color: #565eef;
}
.pop-exit__exit-yes:hover {
background-color: #33399b;
}
.pop-exit__exit-no:hover {
background-color: #33399b;
color: #ffffff;
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
</style>
