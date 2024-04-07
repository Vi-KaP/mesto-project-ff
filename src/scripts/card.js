import { deleteCardsApi, putLike, deleteLike } from './api'

// @todo: Функция создания карточки

const createCard = (
	cardData,
	userId,
	deleteCard,
	performActionLike,
	openModalImg
) => {
	const cardTemplate = document.querySelector('#card-template').content
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
	const resetButton = cardElement.querySelector('.card__delete-button')
	const cardContainerBtnLike = cardElement.querySelector(
		'.card__container-like'
	)
	const likeButton = cardContainerBtnLike.querySelector('.card__like-button')
	const likeBtnActive = 'card__like-button_is-active'
	const quantityLike = cardContainerBtnLike.querySelector(
		'.card__quantity-like'
	)

	const cardImg = cardElement.querySelector('.card__image')

	cardImg.src = cardData.link
	cardImg.alt = cardData.name

	cardElement.querySelector('.card__title').textContent = cardData.name

	cardImg.addEventListener('click', openModalImg)
	// console.log(likeButton.classList);
	likeButton.addEventListener('click', () => {
		performActionLike(likeButton, cardData, likeBtnActive)
	})

	if (userId === cardData.owner._id) {
		resetButton.addEventListener('click', () => {
			deleteCard(cardElement), deleteCardsApi(cardData._id)
		})
	} else {
		resetButton.remove()
	}

	const likeId = cardData.likes
	likeId.forEach(likeElement => {
		if (userId === likeElement._id) {
			likeButton.classList.add(likeBtnActive)
		}
	})
	createNumberLike(quantityLike, cardData.likes)

	return cardElement
}

// @todo: Функция удаления карточки

const deleteCard = cardElement => {
	cardElement.remove()
}

// Функция проставления лайков

const performActionLike = (like, cardId, btnActive) => {
	if (like.classList.contains(btnActive)) {
		deleteLike(cardId._id)
		like.classList.remove(btnActive)
	} else {
		putLike(cardId._id)
		like.classList.add(btnActive)
	}
}

const createNumberLike = (quantity, cardData) => {
	if (cardData.length >= 1) {
		quantity.classList.add(`card__quantity-like_active`)
		quantity.textContent = `${cardData.length}`
	} else {
		quantity.classList.remove(`card__quantity-like_active`)
	}
}

export { performActionLike, deleteCard, createCard }
