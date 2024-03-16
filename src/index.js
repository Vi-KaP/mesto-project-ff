import './pages/index.css'
import { initialCards } from './scripts/cards.js'
import { openModal } from './scripts/modal.js'
import { createCard, deleteCard, putLike } from './scripts/card.js'
import {
	addCardFormeSubmit,
	editFormSubmit,
	fillProfilePopupEdit,
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
	const cards = createCard(cardData, deleteCard, putLike, openModal)
	containerList.append(cards)
})
// Мод.окно ред.профиля отображение текста
fillProfilePopupEdit()

//вызов мод.окон(ред.проф)
btnEditOpen.addEventListener('click', () => openModal(popupEdit))

//вызов мод. окон(добавление карточки)
btnOpenNewCard.addEventListener('click', () => openModal(popupNewCard))

//Обработчики мод.окон
editFormSubmit()
addCardFormeSubmit()

export { containerList, popupNewCard, popupEdit }
