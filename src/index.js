import './pages/index.css'
import { openModal } from './scripts/modal.js'
import {
	createCard,
	deleteCallback,
	performActionLike,
} from './scripts/card.js'
import {
	handleAddCardForm,
	handleEditForm,
	fillProfilePopupEdit,
	displayProfile,
	handleAvatarForm,
	showAvatar,
} from './scripts/handler.js'
import { enableValidation, clearValidation } from './scripts/validation.js'
import { getData, getUserData } from './scripts/api.js'
// @todo: DOM узлы
const containerList = document.querySelector('.places__list')

// Константы для модальных окон
//Мод.окно ред.профиля
const popupEdit = document.querySelector('.popup_type_edit')
const btnEditOpen = document.querySelector('.profile__edit-button')

//Мод.окно добавления новой карточки
const popupNewCard = document.querySelector('.popup_type_new-card')
const btnOpenNewCard = document.querySelector('.profile__add-button')

//Обработчик событий
const editForm = document.forms['edit-profile']
const cardForm = document.forms['new-place']
const avatarForm = document.forms['avatar']

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

const btnAvatar = document.querySelector('.profile__image')
const popupAvatar = document.querySelector('.popup_type_avatar')

const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	displayError: 'popup__input-error_active',
}

btnAvatar.addEventListener('click', () => {
	avatarForm.reset(),
		clearValidation(avatarForm, validationConfig),
		openModal(popupAvatar)
})

//вызов мод.окон(ред.проф)
btnEditOpen.addEventListener('click', () => {
	clearValidation(editForm, validationConfig)
	openModal(popupEdit)
	fillProfilePopupEdit()
})

//вызов мод. окон(добавление карточки)
btnOpenNewCard.addEventListener('click', () => {
	cardForm.reset(),
		clearValidation(cardForm, validationConfig),
		openModal(popupNewCard)
})

//Включение проверки
enableValidation(validationConfig)

const displayCard = (cards, userId) => {
	cards.forEach(cardData => {
		const cards = createCard(
			cardData,
			userId,
			deleteCallback,
			performActionLike,
			openModalImg
		)
		containerList.append(cards)
	})
}

Promise.all([getData(), getUserData()])
	.then(([cards, user]) => {
		const userId = user._id
		displayCard(cards, userId)
		displayProfile(user)
		showAvatar(user)
	})
	.catch(res => {
		throw new Error(`Ошибка: ${res.status}`)
	})

//Обработчики мод.окон
cardForm.addEventListener('submit', handleAddCardForm)
editForm.addEventListener('submit', handleEditForm)
avatarForm.addEventListener('submit', handleAvatarForm)

export {
	containerList,
	popupNewCard,
	popupEdit,
	openModalImg,
	btnAvatar,
	popupAvatar,
}
