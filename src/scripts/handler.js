import { createCard, deleteCallback, performActionLike } from './card'
import { closeModal } from './modal'
import {
	containerList,
	popupNewCard,
	popupEdit,
	popupAvatar,
	openModalImg,
} from '../index.js'
import { createNewCard, editProfile, editAvatar } from './api.js'

const nameCardInput = document.querySelector('.popup__input_type_card-name')
const linkCardInput = document.querySelector('.popup__input_type_url')
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_description')
const profileName = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__description')
const avatarInput = document.querySelector('.popup__input_type_url_avatar')
const avatarImage = document.querySelector('.profile__image-avatar')

const displayProfile = profileInfo => {
	profileName.textContent = profileInfo.name
	profileJob.textContent = profileInfo.about
}

const showAvatar = avatar => {
	avatarImage.src = avatar.avatar
}

const handleAvatarForm = evt => {
	evt.preventDefault()
	const valueAvatarInput = avatarInput.value
	editAvatar(valueAvatarInput)
		.then(avatar => {
			avatarImage.src = avatar.avatar
		})
		.catch(res => {
			throw new Error(`Ошибка: ${res.status}`)
		})
	closeModal(popupAvatar)
}

// Добавить карточку
const handleAddCardForm = evt => {
	evt.preventDefault()

	const valueNameCard = nameCardInput.value
	const valueLinkCard = linkCardInput.value

	createNewCard({
		name: valueNameCard,
		link: valueLinkCard,
	})
		.then(cardData => {
			containerList.prepend(
				createCard(
					cardData,
					cardData.owner._id,
					deleteCallback,
					performActionLike,
					openModalImg
				)
			)
		})

		.catch(res => {
			throw new Error(`Ошибка: ${res.status}`)
		})
  
	closeModal(popupNewCard)
}

// Обработчик «отправки» формы

const handleEditForm = evt => {
	evt.preventDefault()

	const valueName = nameInput.value
	const valueJob = jobInput.value

	editProfile({
		name: valueName,
		about: valueJob,
	})
		.then(profileInfo => {
			displayProfile(profileInfo)
		})
		.catch(res => {
			throw new Error(`Ошибка: ${res.status}`)
		})

	closeModal(popupEdit)
}

// // Мод.окно ред.профиля отображение текста
const fillProfilePopupEdit = () => {
	nameInput.value = profileName.textContent
	jobInput.value = profileJob.textContent
}

export {
	handleEditForm,
	handleAddCardForm,
	handleAvatarForm,
	fillProfilePopupEdit,
	displayProfile,
	showAvatar,
}
