<script setup>
import { computed, inject, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { topicThemes } from '../data.js'
import { TASKS_KEY } from '../injectionKeys.js'

const taskStore = inject(TASKS_KEY)
if (!taskStore) {
  throw new Error('Не удалось получить данные задач')
}

const {
  deleteTask,
  getTaskById,
  updateTask,
} = taskStore

const route = useRoute()
const router = useRouter()

const cardId = computed(() => String(route.params.id ?? '')) // Достаем ID карточки из ссылки

const topics = Object.keys(topicThemes)
const statuses = [
  'Без статуса',
  'Нужно сделать',
  'В работе',
  'Тестирование',
  'Готово',
]

const task = ref(null)
const title = ref('')
const topic = ref('')
const status = ref('')
const description = ref('')
const dueDate = ref('')

const isLoading = ref(true)
const isSaving = ref(false)
const isDeleting = ref(false)
const isEditing = ref(false)
const errorMessage = ref('')

function getTopicStyle(value) {
  return topicThemes[value] ?? {}
}
function toDateInput(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
function toApiDate(value) {
  if (!value) {
    return task.value?.date || new Date().toISOString()
  }
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day, 12).toISOString()
}
const displayDate = computed(() => {
  if (!task.value?.date) return ''
  const date = new Date(task.value.date)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('ru-RU').format(date)
})
function fillForm(source) {
  title.value = source.title ?? ''
  topic.value = source.topic ?? topics[0]
  status.value = source.status ?? statuses[0]
  description.value = source.description ?? ''
  dueDate.value = toDateInput(source.date)
}
async function loadTask(id) {
  if (!id) {
    errorMessage.value = 'Не указан ID задачи.'
    isLoading.value = false
    return
  }
  isLoading.value = true
  errorMessage.value = ''
  try {
    task.value = await getTaskById(id)
    fillForm(task.value)
  } catch (error) {
    task.value = null
    errorMessage.value = error.message || 'Не удалось загрузить задачу.'
  } finally {
    isLoading.value = false
  }
}
watch(
  cardId,
  (id) => {
    if (id) void loadTask(id)
  },
  { immediate: true },
)
function startEditing() {
  if (!task.value) return
  fillForm(task.value)
  errorMessage.value = ''
  isEditing.value = true
}
function cancelEditing() {
  if (task.value) fillForm(task.value)
  errorMessage.value = ''
  isEditing.value = false
}
async function saveTask() {
  if (!title.value.trim()) {
    errorMessage.value = 'Введите название задачи.'
    return
  }
  isSaving.value = true
  errorMessage.value = ''
  try {
    await updateTask(cardId.value, {
      title: title.value.trim(),
      topic: topic.value,
      status: status.value,
      description: description.value.trim(),
      date: toApiDate(dueDate.value),
    })
    isEditing.value = false
    await loadTask(cardId.value)
  } catch (error) {
    errorMessage.value = error.message || 'Не удалось сохранить задачу.'
  } finally {
    isSaving.value = false
  }
}
async function removeTask() {
  if (!window.confirm('Удалить задачу?')) return
  isDeleting.value = true
  errorMessage.value = ''
  try {
    await deleteTask(cardId.value)
    router.replace({ name: 'home' })
  } catch (error) {
    errorMessage.value = error.message || 'Не удалось удалить задачу.'
  } finally {
    isDeleting.value = false
  }
}
function closeModal() {
  router.replace({ name: 'home' })
}
</script>

<template>
  <div class="pop-browse" id="popBrowse">
	<div class="pop-browse__container">
		<div class="pop-browse__block">
			<p v-if="isLoading" class="task-message" role="status">
              Загружаем задачу…
            </p>
			<p v-else-if="errorMessage && !task" class="task-error" role="alert">
              {{ errorMessage }}
            </p>

			<div v-else-if="task" class="pop-browse__content">
				<p v-if="errorMessage" class="task-error" role="alert">
                  {{ errorMessage }}
                </p>

				<div class="pop-browse__top-block">
					<h3 v-if="!isEditing"
						class="pop-browse__ttl">
						{{ task?.title }} (ID: {{ cardId }})
					</h3>

					<input
                        v-else
                        v-model.trim="title"
                        class="pop-browse__ttl task-edit-input"
                        aria-label="Название задачи"
                    />

					<div
					    v-if="!isEditing"
						class="categories__theme theme-top _active-category"
						:style="getTopicStyle(task.topic)"
					>
						<p>{{ task.topic }}</p>
					</div>

					<select
                        v-else
                        v-model="topic"
                        class="task-select"
                        aria-label="Категория задачи"
                    >
                        <option v-for="item in topics" :key="item" :value="item">
                            {{ item }}
                        </option>
                    </select>
				</div>

				<div class="pop-browse__status status">
					<p class="status__p subttl">Статус</p>

					<div class="status__themes">
					    <div v-if="!isEditing" class="status__theme _gray">
							<p>{{ task.status }}</p>
						</div>

						<select
                            v-else
                            v-model="status"
                            class="task-select"
                            aria-label="Статус задачи"
                        >
                            <option v-for="item in statuses" :key="item" :value="item">
                                {{ item }}
                            </option>
                        </select>
					</div>
				</div>

				<div class="pop-browse__wrap">
					<form class="pop-browse__form form-browse" @submit.prevent>
						<div class="form-browse__block">
							<label for="textArea01" class="subttl">
								Описание задачи
							</label>

							<textarea
							    id="textArea01"
                                v-model="description"
							    class="form-browse__area"
								:readonly="!isEditing"
								placeholder="Введите описание задачи..."
							></textarea>
						</div>
					</form>

					<div class="calendar">
						<p class="calendar__ttl subttl">Срок исполнения</p>

						    <p v-if="!isEditing" class="calendar__p">
								{{ displayDate || 'Срок не указан' }}
							</p>

							<input
                                v-else
                                v-model="dueDate"
                                class="task-date-input"
                                type="date"
                                aria-label="Срок исполнения"
                            />
					</div>
				</div>

				<div v-if="!isEditing" class="pop-browse__btn-browse ">
					<div class="btn-group">
						<button
						    type="button"
						    class="btn-browse__edit _btn-bor _hover03"
						    @click="startEditing"
						>
						    Редактировать задачу
						</button>

						<button
						    type="button"
							class="btn-browse__delete _btn-bor _hover03"
							:disabled="isDeleting"
							@click="removeTask"
						>
						    {{ isDeleting ? 'Удаляем…' : 'Удалить задачу' }}
					    </button>
					</div>

						<button
                            type="button"
                            class="btn-browse__close _btn-bg _hover01"
                            @click="closeModal"
                        >
                            Закрыть
                        </button>
				</div>

				<div v-else class="pop-browse__btn-edit">
					<div class="btn-group">
						<button
						    type="button"
						    class="btn-edit__edit _btn-bg _hover01"
							:disabled="isSaving"
							@click="saveTask"
						>
							{{ isSaving ? 'Сохраняем…' : 'Сохранить' }}
						</button>

						<button
						    type="button"
						    class="btn-edit__edit _btn-bor _hover03"
							@click="cancelEditing"
						>
							Отменить
						</button>

						<button
						    type="button"
						    class="btn-edit__close _btn-bg _hover01"
							@click="closeModal"
						>
						    Закрыть
						</button>
					</div>
				</div>

			</div>
		</div>
	</div>
  </div>
</template>

<style scoped>
.pop-browse {
position: fixed;
inset: 0;
z-index: 7;
display: block;
}

.pop-browse__container {
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
.pop-browse__block {
position: relative;
width: 100%;
max-width: 630px;
padding: 40px 30px 38px;
border: 0.7px solid #d4dbe5;
border-radius: 10px;
background-color: #ffffff;
}
.pop-browse__content {
display: block;
text-align: left;
}
.pop-browse__content .categories__theme {
  opacity: 1;
}
.pop-browse__content .theme-down {
  display: none;
  margin-bottom: 20px;
}
.pop-browse__content .theme-top {
  display: block;
}

.pop-browse__top-block {
margin-bottom: 18px;
display: flex;
align-items: center;
justify-content: space-between;
}
.pop-browse__ttl {
margin: 0;
color: #000000;
font-size: 20px;
font-weight: 600;
line-height: 24px;
}
.pop-browse__wrap {
display: flex;
align-items: flex-start;
justify-content: space-between;
}
.pop-browse__form {
width: 100%;
max-width: 370px;
margin-bottom: 20px;
}
.pop-browse__btn-browse, .pop-browse__btn-edit {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
}
.pop-browse__btn-browse button, .pop-browse__btn-edit button {
  height: 30px;
  margin-bottom: 10px;
  padding: 0 14px;
}
.pop-browse__btn-browse .btn-group button, .pop-browse__btn-edit .btn-group button {
  margin-right: 8px;
}
.form-browse__block {
display: flex;
flex-direction: column;
}
.form-browse__area {
width: 100%;
max-width: 370px;
height: 200px;
margin-top: 14px;
padding: 14px;
outline: none;
border: 0.7px solid rgba(148, 166, 190, 0.4);
border-radius: 8px;
background-color: #eaEEF6;
color: #000000;
font-family: inherit;
font-size: 14px;
line-height: 1;
letter-spacing: -0.14px;
resize: vertical;
}
.form-browse__area::placeholder {
font-weight: 400;
  font-size: 14px;
  line-height: 1px;
  color: #94A6BE;
  letter-spacing: -0.14px;
}
.form-browse__area::-moz-placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 1px;
  color: #94A6BE;
  letter-spacing: -0.14px;
}

/* Статус задачи */
.status {
margin-bottom: 11px;
}
.status__p {
margin-bottom: 14px;
}
.status__themes {
display: flex;
flex-wrap: wrap;
align-items: flex-start;
justify-content: flex-start;
gap: 7px;
}
.status__theme {
padding: 10px 14px;
border: 0.7px solid rgba(148, 166, 190, 0.4);
border-radius: 24px;
color: #94a6be;
font-size: 14px;
}
.status__theme._gray {
border-color: transparent;
background-color: #94a6be;
color: #ffffff;
}
.status__theme p {
margin: 0;
color: inherit;
font-size: 14px;
line-height: 1;
letter-spacing: -0.14px;
}
/* Кнопки */
.pop-browse__btn-browse,
.pop-browse__btn-edit {
display: flex;
flex-wrap: wrap;
align-items: flex-start;
justify-content: space-between;
gap: 10px;
}
.btn-group {
display: flex;
flex-wrap: wrap;
gap: 8px;
}
.pop-browse__btn-browse button,
.pop-browse__btn-edit button {
min-height: 30px;
padding: 0 14px;
font-size: 14px;
}
._btn-bor,
._btn-bg {
min-height: 30px;
padding: 0 14px;
border-radius: 4px;
font-size: 14px;
font-weight: 500;
}
._btn-bor {
border: 0.7px solid #565eef;
background-color: transparent;
color: #565eef;
}
._btn-bor a {
  color: #565EEF;
}
._btn-bg {
border: 0;
background-color: #565eef;
color: #ffffff;
}
._btn-bg a {
  color: #FFFFFF;
}
._btn-bor:hover {
background-color: #33399b;
color: #ffffff;
}
._btn-bg:hover {
background-color: #33399b;
}
._hide {
display: none;
}
/* Категория */
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
}
.calendar__cell._other-month {
opacity: 0;
}
.calendar__cell._cell-day:hover {
background-color: #eaEEF6;
}
.calendar__cell._active-day {
background-color: #94a6be;
color: #ffffff;
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
}
.calendar__p span {
color: #000000;
}
.subttl {
  color: #000;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
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

.task-select,
.task-date-input {
  min-height: 36px;
  padding: 6px 10px;
  border: 1px solid #d4dbe5;
  border-radius: 6px;
  background: #fff;
  font: inherit;
}
.task-edit-input {
  max-width: 100%;
  border: 1px solid #d4dbe5;
  border-radius: 6px;
  background: #fff;
  font: inherit;
}
.task-message,
.task-error {
  padding: 24px;
}
.task-error {
  color: #c0392b;
}
@media screen and (max-width: 660px) {
.pop-browse {
top: 70px;
}
.pop-browse__container {
padding: 0;
justify-content: flex-start;
}
.pop-browse__block {
min-height: 100%;
border-radius: 0;
}
.pop-browse__wrap {
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
.calendar__cells {
width: 344px;
height: auto;
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
.pop-browse__block {
padding: 20px 16px 32px;
}
.pop-browse__form {
max-width: 100%;
width: 100%;
display: block;
}
.pop-new-card__calendar {
width: 100%;
}
.form-browse__area {
height: 37px;
max-width: 100%;
}
.pop-browse__btn-browse,
.pop-browse__btn-edit {
display: block;
}
.btn-group {
width: 100%;
display: block;
}
.pop-browse__btn-browse button,
.pop-browse__btn-edit button {
width: 100%;
height: 40px;
margin-bottom: 10px;
}
}
</style>

