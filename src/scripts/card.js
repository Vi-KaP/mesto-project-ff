import { deleteCardsApi, putLike, deleteLike } from './api'

// @todo: Функция создания карточки

const createCard = (
	cardData,
	userId,
	deleteCallback,
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
	likeButton.addEventListener('click', () => {
	
		performActionLike(likeButton, cardData, likeBtnActive, quantityLike)
	})

	if (userId === cardData.owner._id) {
		resetButton.addEventListener('click', () => {
			deleteCallback(cardData._id, cardElement)
		})
	} else {
		resetButton.remove()
	}

	if (cardData.likes.some(likeElement => likeElement._id === userId)) {
		likeButton.classList.add(likeBtnActive)
	}

	createNumberLike(quantityLike, cardData.likes)

	return cardElement
}

// @todo: Функция удаления карточки

const deleteCard = cardElement => {
	cardElement.remove()
}

const deleteCallback = (cardId, cardElement) => {
	deleteCardsApi(cardId)
		.then(() => deleteCard(cardElement))
		.catch(res => {
			throw new Error(`Ошибка: ${res.status}`)
		})
}

// Функция проставления лайков

const performActionLike = (like, cardData, btnActive, quantityLike) => {
	
	const likeMethod = like.classList.contains(btnActive) ? deleteLike : putLike

	likeMethod(cardData._id)
		.then(res => {
			quantityLike.textContent = res.likes.length
			like.classList.toggle(btnActive)
		})
		.catch(res => {
			throw new Error(`Ошибка: ${res.status}`)
		})
}

const createNumberLike = (quantity, cardData) => {
	if (cardData.length >= 1) {
		quantity.classList.add(`card__quantity-like_active`)
		quantity.textContent = cardData.length
	} else {
		quantity.classList.remove(`card__quantity-like_active`)
	}
}

export { performActionLike, deleteCallback, createCard }
