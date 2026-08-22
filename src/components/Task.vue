<script setup>
  import { computed } from 'vue'
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
 const topicClass = computed(() => {
  if (props.topic === 'Web Design') {
    return '_orange'
  }
  if (props.topic === 'Research') {
    return '_green'
  }
  if (props.topic === 'Copywriting') {
    return '_purple'
  }
  return '_orange'
 })
</script>

<template>
  <div class="cards__item">
    <div class="cards__card card">
      <div class="card__group">
        <div class="card__theme" :class="topicClass">
          <p :class="topicClass">{{ topic }}</p>
        </div>
        <a href="#popBrowse" target="_self">
          <div class="card__btn">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </a>
      </div>
      <div class="card__content">
        <a href="" target="_blank">
          <h3 class="card__title">{{ title }}</h3>
        </a>
        <div class="card__date">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
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
    </div>
  </div>
</template>
