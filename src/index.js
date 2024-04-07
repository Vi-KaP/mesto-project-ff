import './pages/index.css'
import { openModal } from './scripts/modal.js'
import { createCard, deleteCard, performActionLike } from './scripts/card.js'
import {
	handleAddCardForm,
	handleEditForm,
	fillProfilePopupEdit,
	displayProfile,
	handleAvatarForm,
	showAvatar,
} from './scripts/handler.js'
import { enableValidation, clearValidation } from './scripts/validation.js'
import { getData, displayProfileInfo, getUserData } from './scripts/api.js'
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

btnAvatar.addEventListener('click', () => {
	avatarForm.reset(), clearValidation(), openModal(popupAvatar)
})

//вызов мод.окон(ред.проф)
btnEditOpen.addEventListener('click', () => {
	clearValidation()
	openModal(popupEdit)
	fillProfilePopupEdit()
})

//Включение проверки
enableValidation()

//вызов мод. окон(добавление карточки)
btnOpenNewCard.addEventListener('click', () => {
	clearValidation(), 
	cardForm.reset(), 
	openModal(popupNewCard)
})

const displayCard = (cards, userId) => {
	cards.forEach(cardData => {
		const cards = createCard(
			cardData,
			userId,
			deleteCard,
			performActionLike,
			openModalImg
		)
		containerList.append(cards)
	})
}

Promise.all([getData(), getUserData()]).then(([cards, user]) => {
	const userId = user._id
	displayCard(cards, userId)
}).catch(res => {
	throw new Error(`Ошибка: ${res.status}`)
})

displayProfileInfo()
	.then(profileInfo => {
		displayProfile(profileInfo)
		showAvatar(profileInfo)
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
