import { createCard, deleteCard, putLike } from './card'
import { closeModal } from './modal'
import {
	containerList,
	popupNewCard,
	popupEdit,
	openModalImg,
} from '../index.js'

const cardForm = document.forms['new-place']
const nameCardInput = document.querySelector('.popup__input_type_card-name')
const linkCardInput = document.querySelector('.popup__input_type_url')
const editForm = document.forms['edit-profile']
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_description')
const profileName = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__description')

// Добавить карточку
const handleAddCardForm = evt => {
	evt.preventDefault()

	const valueNameCard = nameCardInput.value
	const valueLinkCard = linkCardInput.value

	const addCard = createCard(
		{
			name: valueNameCard,
			link: valueLinkCard,
		},
		deleteCard,
		putLike,
		openModalImg
	)

	containerList.prepend(addCard)

	cardForm.reset()
	closeModal(popupNewCard)
}

const addCardFormeSubmit = () => {
	cardForm.addEventListener('submit', handleAddCardForm)
}

// Обработчик «отправки» формы

const handleEditForm = evt => {
	evt.preventDefault()

	const valueName = nameInput.value
	const valueJob = jobInput.value

	profileName.textContent = valueName
	profileJob.textContent = valueJob

	closeModal(popupEdit)
}
const editFormSubmit = () => {
	editForm.addEventListener('submit', handleEditForm)
}

// Мод.окно ред.профиля отображение текста
const fillProfilePopupEdit = () => {
	nameInput.value = profileName.textContent
	jobInput.value = profileJob.textContent
}

export { addCardFormeSubmit, editFormSubmit, fillProfilePopupEdit }
