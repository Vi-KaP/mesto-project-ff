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

//Обработчик открытия картинок
const modalImg = document.querySelector('.popup_type_image')
const imgPopup = modalImg.querySelector('.popup__image')
const popupCaption = modalImg.querySelector('.popup__caption')

const openModalImg = evt => {
	const img = evt.target
	imgPopup.src = img.src
	imgPopup.alt = popupCaption.textContent = img.alt
	openModal(modalImg)
}

// @todo: Вывести карточки на страницу
initialCards.forEach(cardData => {
	const cards = createCard(cardData, deleteCard, putLike, openModalImg)
	containerList.append(cards)
})

//вызов мод.окон(ред.проф)
btnEditOpen.addEventListener(
	'click',
	() => openModal(popupEdit),
	fillProfilePopupEdit()
)

//вызов мод. окон(добавление карточки)
btnOpenNewCard.addEventListener('click', () => openModal(popupNewCard))

//Обработчики мод.окон
editFormSubmit()
addCardFormeSubmit()

export { containerList, popupNewCard, popupEdit, openModalImg }
