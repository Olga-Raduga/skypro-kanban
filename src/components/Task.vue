<script setup>
  import { computed } from 'vue'
  import { topicThemes } from '../data.js'
  const props = defineProps({
   id: {
    type: Number,
    required: true,
   },
   topic: {
    type: String,
    required: true,
   },
   title: {
    type: String,
    required: true,
   },
   date: {
    type: String,
    required: true,
   },
   status: {
    type: String,
    required: true,
   },
 })
 const topicStyle = computed(() => {
return (
topicThemes[props.topic] ||
topicThemes['Web Design']
)
})
</script>

<template>
  <div class="cards__item">
    <article class="cards__card card">
      <div class="card__group">
        <div class="card__theme" 
          :style="topicStyle">
          <p>{{ topic }}</p>
        </div>
        <a href="#popBrowse" class="card__btn"
        aria-label="Открыть задачу"
        >
        <span></span>
        <span></span>
        <span></span>
        </a>
      </div>
      <div class="card__content">
        <a href="#popBrowse">
          <h3 class="card__title">{{ title }}</h3>
        </a>
        <div class="card__date">
          <svg xmlns="http://www.w3.org/2000/svg" 
            width="13" 
            height="13" 
            viewBox="0 0 13 13" 
            fill="none" 
            aria-hidden="true"
          >
            <path d="M10.5625 2.03125H2.4375C1.7644 2.03125 1.21875 2.5769 1.21875 3.25V10.5625C1.21875 11.2356 1.7644 11.7812 10.5625 11.7812H10.5625C11.2356 11.7812 11.7812 11.2356 11.7812 10.5625V3.25C11.7812 2.5769 11.2356 2.03125 10.5625 2.03125Z" 
              stroke="#94A6BE" 
              stroke-width="0.8" 
              stroke-linejoin="round" 
            />
            <path d="M11.7812 4.0625H1.21875M3.25 1.21875V2.03125M9.75 1.21875V2.03125" 
              stroke="#94A6BE" 
              stroke-width="0.8" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
            />
          </svg>
          <p>{{ date }}</p>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
.cards__item {
padding: 5px;
animation: card-appearance 0.5s ease-out;
}
.cards__card {
width: 220px;
height: 130px;
padding: 15px 13px 19px;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: stretch;
background-color: #ffffff;
border-radius: 10px;
}
.card__group {
width: 100%;
height: 20px;
margin-bottom: 12px;
display: flex;
align-items: center;
justify-content: space-between;
}
.card__theme {
width: auto;
min-height: 20px;
padding: 5px 14px;
border-radius: 18px;
}
.card__theme p {
margin: 0;
color: inherit;
font-size: 10px;
font-weight: 600;
line-height: 10px;
}
.card__btn {
width: 24px;
height: 24px;
padding: 2px;
display: flex;
align-items: center;
justify-content: space-around;
}
.card__btn span {
width: 4px;
height: 4px;
border-radius: 50%;
background-color: #94a6be;
}
.card__content {
height: 64px;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: space-between;
}
.card__title {
margin: 0 0 10px;
color: #000000;
font-size: 14px;
font-weight: 500;
line-height: 18px;
}
.card__date {
display: flex;
align-items: center;
justify-content: flex-start;
}
.card__date svg {
width: 13px;
}
.card__date p {
margin: 0 0 0 6px;
color: #94a6be;
font-size: 10px;
line-height: 13px;
letter-spacing: 0.2px;
}
@keyframes card-appearance {
from {
opacity: 0;
transform: translateY(-6px);
}
to {
opacity: 1;
transform: translateY(0);
}
}
</style>
