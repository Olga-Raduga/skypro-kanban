<script setup>
import { topicThemes } from '../data.js'
const topics = Object.keys(topicThemes)
const getTopicStyle = (topic) => {
return topicThemes[topic]
}
</script>

<template>
			<div class="pop-new-card" id="popNewCard">
				<div class="pop-new-card__container">
					<div class="pop-new-card__block">
						<div class="pop-new-card__content">
							<h3 class="pop-new-card__ttl">Создание задачи</h3>
							<a href="#" class="pop-new-card__close">&#10006;</a>
							<div class="pop-new-card__wrap">
								<form class="pop-new-card__form form-new" id="formNewCard" action="#">
									<div class="form-new__block">
										<label for="formTitle" class="subttl">Название задачи</label>
										<input class="form-new__input" type="text" name="name" id="formTitle" placeholder="Введите название задачи..." autofocus>
									</div>
									<div class="form-new__block">
										<label for="textArea" class="subttl">Описание задачи</label>
										<textarea class="form-new__area" name="text" id="textArea"  placeholder="Введите описание задачи..."></textarea>
									</div>
								</form>
								<div class="pop-new-card__calendar calendar">
									<p class="calendar__ttl subttl">Даты</p>									
									<div class="calendar__block">
										<div class="calendar__nav">
											<div class="calendar__month">Сентябрь 2023</div>
											<div class="nav__actions">
												<div class="nav__action" data-action="prev">
													<svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
														<path d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z" />
													</svg>
												</div>
												<div class="nav__action" data-action="next">
													<svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
														<path d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z" />
													</svg>
												</div>
											</div>
										</div>
										<div class="calendar__content">
											<div class="calendar__days-names">
												<div class="calendar__day-name">пн</div>
												<div class="calendar__day-name">вт</div>
												<div class="calendar__day-name">ср</div>
												<div class="calendar__day-name">чт</div>
												<div class="calendar__day-name">пт</div>
												<div class="calendar__day-name -weekend-">сб</div>
												<div class="calendar__day-name -weekend-">вс</div>
											</div>
											<div class="calendar__cells">
												<div class="calendar__cell _other-month">28</div>
												<div class="calendar__cell _other-month">29</div>
												<div class="calendar__cell _other-month">30</div>
												<div class="calendar__cell _cell-day">31</div>
												<div class="calendar__cell _cell-day">1</div>
												<div class="calendar__cell _cell-day _weekend">2</div>
												<div class="calendar__cell _cell-day _weekend">3</div>
												<div class="calendar__cell _cell-day">4</div>
												<div class="calendar__cell _cell-day">5</div>
												<div class="calendar__cell _cell-day ">6</div>
												<div class="calendar__cell _cell-day">7</div>
												<div class="calendar__cell _cell-day _current">8</div>
												<div class="calendar__cell _cell-day _weekend">9</div>
												<div class="calendar__cell _cell-day _weekend">10</div>
												<div class="calendar__cell _cell-day">11</div>
												<div class="calendar__cell _cell-day">12</div>
												<div class="calendar__cell _cell-day">13</div>
												<div class="calendar__cell _cell-day">14</div>
												<div class="calendar__cell _cell-day">15</div>
												<div class="calendar__cell _cell-day _weekend">16</div>
												<div class="calendar__cell _cell-day _weekend">17</div>
												<div class="calendar__cell _cell-day">18</div>
												<div class="calendar__cell _cell-day">19</div>
												<div class="calendar__cell _cell-day">20</div>
												<div class="calendar__cell _cell-day">21</div>
												<div class="calendar__cell _cell-day">22</div>
												<div class="calendar__cell _cell-day _weekend">23</div>
												<div class="calendar__cell _cell-day _weekend">24</div>
												<div class="calendar__cell _cell-day">25</div>
												<div class="calendar__cell _cell-day">26</div>
												<div class="calendar__cell _cell-day">27</div>
												<div class="calendar__cell _cell-day">28</div>
												<div class="calendar__cell _cell-day">29</div>
												<div class="calendar__cell _cell-day _weekend">30</div>
												<div class="calendar__cell _other-month _weekend">1</div>
											</div>
										</div>
										
										<input type="hidden" id="datepick_value" value="08.09.2023">
										<div class="calendar__period">
											<p class="calendar__p date-end">Выберите срок исполнения <span class="date-control"></span>.</p>
										</div>
									</div>
								</div>
							</div>
							<div class="pop-new-card__categories categories">
								<p class="categories__p subttl">Категория</p>
								<div class="categories__themes">
									<div
									v-for="(topic, index) in topics"
                                    :key="topic"
									class="categories__theme"
									:class="{ '_active-category': index === 0 }"
                                    :style="getTopicStyle(topic)"
                                    >
										<p>{{ topic }}</p>
									</div>
								</div>
							</div>
							<button class="form-new__create _hover01" id="btnCreate">Создать задачу</button>
						</div>
					</div>
				</div>
			</div>
</template>

<style scoped>
.pop-new-card {
position: fixed;
inset: 0;
z-index: 6;
display: none;
}
.pop-new-card:target {
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
}
.calendar__cell._other-month {
opacity: 0;
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
}
.calendar__p span {
color: #000000;
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
.pop-new-card__block {
padding: 20px 16px 32px;
}
.pop-new-card__form {
max-width: 100%;
}
.form-new__area {
height: 100px;
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

