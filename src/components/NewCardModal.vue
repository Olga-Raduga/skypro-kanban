<script setup>
import { computed, inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import { topicThemes } from '../data.js'
import { TASKS_KEY } from '../injectionKeys.js'

const taskStore = inject(TASKS_KEY)
if (!taskStore) {
  throw new Error('Не удалось получить данные задач')
}
const { createTask: saveTask, loadTasks } = taskStore
const router = useRouter()

async function closeModal() {
  await router.replace({ name: 'home' })
}

const topics = Object.keys(topicThemes)
const selectedTopic = ref(topics[0] ?? 'Web Design')

const title = ref('')
const description = ref('')
const isSaving = ref(false)
const errorMessage = ref('')

const getTopicStyle = (topic) =>
 topicThemes[topic] ?? {}


function toInputDate(value) {
  const year = value.getFullYear()
  const month = String(value.getMonth() + 1).padStart(2, '0')
  const day = String(value.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
// Формат, который уже показывается на карточке: дд.мм.гг
function toTaskDate(value) {
  const [year, month, day] = value.split('-')
  return `${day}.${month}.${year.slice(-2)}`
}

function toApiDate(value) {
  if (!value) {
    return new Date().toISOString()
  }
  const [year, month, day] = value.split('-').map(Number)
  // Полдень помогает избежать сдвига даты из-за часового пояса
  return new Date(year, month - 1, day, 12).toISOString()
}

const date = ref(toInputDate(new Date()))
const visibleMonth = ref(
  new Date(new Date().getFullYear(), new Date().getMonth(), 1, 12)
)
const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
const calendarMonth = computed(() => {
  const month = new Intl.DateTimeFormat('ru-RU', {
    month: 'long',
    year: 'numeric',
  }).format(visibleMonth.value)
  return month.charAt(0).toLocaleUpperCase('ru-RU') + month.slice(1)
})
const calendarDays = computed(() => {
  const year = visibleMonth.value.getFullYear()
  const month = visibleMonth.value.getMonth()
  const firstDay = new Date(year, month, 1, 12)
  const mondayOffset = (firstDay.getDay() + 6) % 7
  const firstCalendarDay = new Date(year, month, 1 - mondayOffset, 12)
  const today = toInputDate(new Date())
  return Array.from({ length: 42 }, (_, index) => {
    const calendarDate = new Date(
      firstCalendarDay.getFullYear(),
      firstCalendarDay.getMonth(),
      firstCalendarDay.getDate() + index,
      12
    )
    const value = toInputDate(calendarDate)
    return {
      value,
      date: calendarDate,
      day: calendarDate.getDate(),
      inCurrentMonth:
        calendarDate.getMonth() === month &&
        calendarDate.getFullYear() === year,
      isWeekend: calendarDate.getDay() === 0 || calendarDate.getDay() === 6,
      isToday: value === today,
      isSelected: value === date.value,
    }
  })
})
function changeCalendarMonth(amount) {
  visibleMonth.value = new Date(
    visibleMonth.value.getFullYear(),
    visibleMonth.value.getMonth() + amount,
    1,
    12
  )
}
function selectCalendarDate(day) {
  date.value = day.value
  visibleMonth.value = new Date(
    day.date.getFullYear(),
    day.date.getMonth(),
    1,
    12
  )
}

async function refreshTasksAfterCreate() {
  try {
    await loadTasks()
  } catch {
    // Ошибка загрузки списка записана в общий tasksError.
  }
}
async function createTask() {
  if (!title.value.trim()) {
    errorMessage.value = 'Введите название задачи.'
    return
  }
  isSaving.value = true
  errorMessage.value = ''
  try {
    await saveTask({
      title: title.value.trim(),
      description: description.value.trim(),
      topic: selectedTopic.value,
      status: 'Без статуса',
      date: toApiDate(date.value),
    })
    title.value = ''
    description.value = ''
    
  await refreshTasksAfterCreate()
    await closeModal()
  } catch (error) {
    errorMessage.value =
      error.message || 'Не удалось создать задачу.'
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
	<div class="pop-new-card" id="popNewCard">
		<div class="pop-new-card__container">
			<div class="pop-new-card__block">
				<div class="pop-new-card__content">
					<h3 class="pop-new-card__ttl">Создание задачи</h3>
						<RouterLink
                            to="/"
                            class="pop-new-card__close"
                            aria-label="Закрыть"
							@click.prevent="closeModal"
                        >
                            ×
                        </RouterLink>
					<div class="pop-new-card__wrap">
						<form class="pop-new-card__form form-new" id="formNewCard" action="#">
							<div class="form-new__block">
								<label for="formTitle" class="subttl">Название задачи</label>

									<input
										v-model.trim="title"
										class="form-new__input"
										type="text"
										name="name"
										id="formTitle"
										placeholder="Введите название задачи..."
										autofocus
									/>
							</div>
							<div class="form-new__block">
								<label for="textArea" class="subttl">Описание задачи</label>
									<textarea
										v-model.trim="description"
										class="form-new__area"
										name="text"
										id="textArea"
										placeholder="Введите описание задачи..."
									>
								    </textarea>
							</div>
						</form>
							<div class="pop-new-card__calendar calendar">
								<p class="calendar__ttl subttl">Даты</p>
									<div class="calendar__block">
										<div class="calendar__nav">
										    <div class="calendar__month">{{ calendarMonth }}</div>
											<div class="nav__actions">
												<button
                                                    type="button"
                                                    class="nav__action"
                                                    aria-label="Предыдущий месяц"
                                                    @click="changeCalendarMonth(-1)"
                                                >
                                                    ‹
                                                </button>
                                                <button
                                                    type="button"
                                                    class="nav__action"
                                                    aria-label="Следующий месяц"
                                                    @click="changeCalendarMonth(1)"
                                                >
                                                ›
                                                </button>
											</div>
										</div>
										<div class="calendar__content">
											<div class="calendar__days-names">
												<div
                                                    v-for="(day, index) in weekDays"
                                                    :key="day"
                                                    class="calendar__day-name"
                                                    :class="{ '-weekend-': index > 4 }"
                                                >
                                                    {{ day }}
                                                </div>
											</div>
											<div class="calendar__cells">												
												<button
                                                    v-for="day in calendarDays"
                                                    :key="day.value"
                                                    type="button"
                                                    class="calendar__cell _cell-day"
                                                    :class="{
                                                        '_other-month': !day.inCurrentMonth,
                                                        _weekend: day.isWeekend,
                                                        _current: day.isToday,
                                                        '_active-day': day.isSelected,
                                                    }"
                                                    :aria-pressed="day.isSelected"
                                                    @click="selectCalendarDate(day)"
                                                >
                                                    {{ day.day }}
                                                </button>
											</div>
										</div>										
										<div class="calendar__period">
										    <p class="calendar__p date-end">Выберите срок исполнения <span class="date-control">{{ toTaskDate(date) }}</span>.</p>
										</div>
									</div>
							</div>
					</div>
							<div class="pop-new-card__categories categories">
							  <p class="categories__p subttl">Категория</p>
								<div class="categories__themes">
								  <div
								    v-for="topic in topics"
                                    :key="topic"
                                    class="categories__theme"
								    :class="{ '_active-category': selectedTopic === topic }"
                                    :style="getTopicStyle(topic)"
                                    role="button"
                                    tabindex="0"
                                    @click="selectedTopic = topic"
                                    @keydown.enter="selectedTopic = topic"
                                    @keydown.space.prevent="selectedTopic = topic"
								  >
								    <p>{{ topic }}</p>
								  </div>
								</div>
							</div>
						</div>
						    <p v-if="errorMessage" class="auth-error" role="alert">
                              {{ errorMessage }}
                            </p>
							<button
							  type="button"
							  class="form-new__create _hover01"
							  id="btnCreate"
							  :disabled="isSaving"
                              @click="createTask"
                            >
                              {{ isSaving ? 'Создаём…' : 'Создать задачу' }}
                            </button>
					</div>
				</div>
			</div>

</template>

<style scoped>
.pop-new-card {
position: fixed;
inset: 0;
z-index: 6;
display: block;
}

.pop-new-card__container {
width: 100%;
height: 100%;
min-height: 100vh;
padding: 0 16px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background: rgba(0, 0, 0, 0.4);
}
.pop-new-card__block {
position: relative;
width: 100%;
max-width: 630px;
padding: 40px 30px 48px;
border: 0.7px solid #d4dbe5;
border-radius: 10px;
background-color: #ffffff;
}
.pop-new-card__content {
display: block;
text-align: left;
}
.pop-new-card__ttl {
margin-bottom: 20px;
color: #000000;
font-size: 20px;
font-weight: 600;
line-height: 24px;
}
.pop-new-card__close {
position: absolute;
top: 20px;
right: 30px;
color: #94a6be;
font-size: 18px;
}
.pop-new-card__close:hover {
color: #000000;
}
.pop-new-card__wrap {
display: flex;
align-items: flex-start;
justify-content: space-between;
}
.pop-new-card__form {
width: 100%;
max-width: 370px;
margin-bottom: 20px;
}
.form-new__block {
display: flex;
flex-direction: column;
}
.subttl {
color: #000000;
font-size: 14px;
font-weight: 600;
line-height: 1;
}
.form-new__input,
.form-new__area {
width: 100%;
outline: none;
border: 0.7px solid rgba(148, 166, 190, 0.4);
border-radius: 8px;
background: transparent;
font-family: inherit;
font-size: 14px;
line-height: 1;
letter-spacing: -0.14px;
}
.form-new__input {
height: 44px;
margin: 20px 0;
padding: 14px;
}
.form-new__area {
height: 200px;
max-width: 370px;
margin-top: 14px;
padding: 14px;
resize: vertical;
}
.form-new__input::placeholder,
.form-new__area::placeholder {
color: #94a6be;
font-size: 14px;
font-weight: 400;
letter-spacing: -0.14px;
}

.form-new__input::-moz-placeholder, .form-new__area::-moz-placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 1px;
  color: #94A6BE;
  letter-spacing: -0.14px;
}

.form-new__create {
float: right;
width: 132px;
height: 30px;
border: 0;
border-radius: 4px;
background-color: #565eef;
color: #ffffff;
font-size: 14px;
font-weight: 500;
}
.form-new__create:hover {
background-color: #33399b;
}
/* Календарь */
.calendar {
width: 182px;
margin-bottom: 20px;
}
.calendar__ttl {
margin-bottom: 14px;
padding: 0 7px;
}
.calendar__block {
display: block;
}
.calendar__nav {
width: 100%;
margin-top: 14px;
padding: 0 7px;
display: flex;
align-items: center;
justify-content: space-between;
}
.calendar__month {
color: #94a6be;
font-size: 14px;
font-weight: 600;
line-height: 25px;
}
.nav__actions {
display: flex;
align-items: center;
justify-content: space-between;
}
.nav__action {
width: 18px;
height: 25px;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
padding: 0;
  border: 0;
  background: transparent;
  color: #94a6be;
  font: inherit;
  font-size: 20px;
  line-height: 1;
}
.nav__action svg {
fill: #94a6be;
}
.calendar__content {
margin-bottom: 12px;
}
.calendar__days-names {
margin: 7px 0;
padding: 0 7px;
display: flex;
align-items: center;
justify-content: space-between;
}
.calendar__day-name {
color: #94a6be;
font-size: 10px;
font-weight: 500;
line-height: normal;
letter-spacing: -0.2px;
}
.calendar__cells {
width: 182px;
height: 126px;
display: flex;
flex-wrap: wrap;
}
.calendar__cell {
width: 22px;
height: 22px;
margin: 2px;
display: flex;
align-items: center;
justify-content: center;
border-radius: 50%;
color: #94a6be;
cursor: pointer;
font-size: 10px;
line-height: 1;
letter-spacing: -0.2px;
border: 0;
  background: transparent;
  font-family: inherit;
}
.calendar__cell._other-month {
opacity: 0.35;
}
.calendar__cell._cell-day:hover {
background-color: #eaEEF6;
}
.calendar__cell._current {
font-weight: 700;
}
.calendar__period {
padding: 0 7px;
}
.calendar__p {
color: #94a6be;
font-size: 10px;
line-height: 1;
}
.calendar__p span {
color: #000000;
}
.calendar__cell._active-day {
  background-color: #94A6BE;
  color: #FFFFFF;
}

/* Категории */
.categories {
margin-bottom: 20px;
}
.categories__p {
margin-bottom: 14px;
}
.categories__themes {
display: flex;
flex-wrap: wrap;
align-items: flex-start;
gap: 7px;
}
.categories__theme {
width: auto;
min-height: 30px;
padding: 8px 20px;
border-radius: 24px;
opacity: 0.4;
font-size: 14px;
font-weight: 600;
}
.categories__theme._active-category {
opacity: 1;
}
.categories__theme p {
margin: 0;
color: inherit;
font-size: 14px;
font-weight: 600;
line-height: 14px;
white-space: nowrap;
}
._active-category {
  opacity: 1 !important;
}
@media screen and (max-width: 660px) {
.pop-new-card {
top: 70px;
}
.pop-new-card__container {
padding: 0;
justify-content: flex-start;
}
.pop-new-card__block {
min-height: 100%;
border-radius: 0;
}
.pop-new-card__wrap {
display: block;
}
.calendar {
width: 100%;
max-width: 340px;
}
.calendar__ttl,
.calendar__nav,
.calendar__period {
padding: 0;
}
.calendar .date-create {
    display: none;
    margin-bottom: 7px;
}
.calendar__p {
    font-size: 14px;
}
.calendar__day-name {
    font-size: 14px;
}
.calendar__cells {
width: 344px;
height: auto;
display: flex;
flex-wrap: wrap;
justify-content: space-around;
}
.calendar__cell {
width: 42px;
height: 42px;
font-size: 14px;
}
}
@media screen and (max-width: 495px) {
.pop-new-card__container {
padding: 0;
justify-content: flex-start;
}
.pop-new-card__block {
padding: 20px 16px 32px;
}
.pop-new-card__form {
max-width: 100%;
width: 100%;
display: block;
}
.pop-new-card__calendar {
width: 100%;
}
.form-new__area {
height: 34px;
max-width: 100%;
}
.form-new__create {
float: none;
width: 100%;
height: 40px;
}
.pop-new-card__close {
right: 16px;
}
}
</style>

