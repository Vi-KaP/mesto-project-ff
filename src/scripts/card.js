import { openModal } from './modal.js'

// @todo: Функция создания карточки

const createCard = (cardData, deleteCard, putLike, openModal) => {
	const cardTemplate = document.querySelector('#card-template').content
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
	const resetButton = cardElement.querySelector('.card__delete-button')
	const likeButton = cardElement.querySelector('.card__like-button')

	const cardImg = cardElement.querySelector('.card__image')

	cardImg.src = cardData.link
	cardImg.alt = cardData.name
	cardElement.querySelector('.card__title').textContent = cardData.name

	const modalImg = document.querySelector('.popup_type_image')
	const imgPopup = modalImg.querySelector('.popup__image')
	const popupCaption = modalImg.querySelector('.popup__caption')

	const openModalImg = evt => {
		const img = evt.target
		imgPopup.src = img.src
		imgPopup.alt = popupCaption.textContent = img.alt
		openModal(modalImg)
	}

	cardImg.addEventListener('click', openModalImg)

	likeButton.addEventListener('click', () => putLike(likeButton))

	resetButton.addEventListener('click', () => deleteCard(cardElement))

	return cardElement
}

// @todo: Функция удаления карточки

const deleteCard = cardElement => {
	cardElement.remove()
}

// Функция проставления лайков

const putLike = like => {
	like.classList.toggle('card__like-button_is-active')
}

export { putLike, deleteCard, createCard }
