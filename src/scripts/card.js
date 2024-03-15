import { openModalImg, closeModal } from './modal.js'

// @todo: Функция создания карточки

const createCard = (cardData, deleteCard, putLike) => {
	const cardTemplate = document.querySelector('#card-template').content
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
	const resetButton = cardElement.querySelector('.card__delete-button')
	const likeButton = cardElement.querySelector('.card__like-button')

	const cardImg = cardElement.querySelector('.card__image')

	cardImg.src = cardData.link
	cardImg.alt = cardData.name
	cardElement.querySelector('.card__title').textContent = cardData.name

	const popupImg = document.querySelector('.popup_type_image')

	openModalImg({
		popupImg: popupImg,
		openButton: cardImg,
	})

	closeModal(popupImg)

	putLike(likeButton)

	resetButton.addEventListener('click', () => deleteCard(cardElement))

	return cardElement
}

// @todo: Функция удаления карточки

const deleteCard = cardElement => {
	cardElement.remove()
}

// Функция проставления лайков

const putLike = likes => {
	likes.addEventListener('click', evt => {
		evt.target.classList.toggle('card__like-button_is-active')
	})
}

export { putLike, deleteCard, createCard }
