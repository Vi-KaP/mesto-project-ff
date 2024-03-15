import './pages/index.css'
import { initialCards } from './scripts/cards.js'
import { openModal, closeModal } from './scripts/modal.js'
import { createCard, deleteCard, putLike } from './scripts/card.js'
import {
	addCardFormeSubmit,
	editFormSubmit,
	profilePopupEdit,
} from './scripts/handler.js'

// @todo: DOM узлы
const containerList = document.querySelector('.places__list')

// Константы для модальных окон
//Мод.окно ред.профиля
const popupEdit = document.querySelector('.popup_type_edit')
const btnEditOpen = document.querySelector('.profile__edit-button')

//Мод.окно добавления новой карточки
const popupNewCard = document.querySelector('.popup_type_new-card')
const btnOpenNewCard = document.querySelector('.profile__add-button')

// @todo: Вывести карточки на страницу
initialCards.forEach(cardData => {
	const cards = createCard(cardData, deleteCard, putLike)
	containerList.append(cards)
})
// Мод.окно ред.профиля отображение текста
profilePopupEdit()

//вызов мод.окон(ред.проф)
openModal(popupEdit, btnEditOpen)
closeModal(popupEdit)

//вызов мод. окон(добавление карточки)
openModal(popupNewCard, btnOpenNewCard)
closeModal(popupNewCard)

//Обработчики мод.окон
editFormSubmit()
addCardFormeSubmit()

export { containerList, popupNewCard, popupEdit }
