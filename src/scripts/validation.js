//Валидация формы
const buttonElement = document.querySelector('.popup__button')
const inputList = Array.from(document.querySelectorAll('.popup__input'))
// Ошибка
const showInputError = (formElement, inputElement, errorMessage) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.add('popup__input_type_error')

	errorElement.textContent = errorMessage
	errorElement.classList.add('popup__input-error_active')
}
//Скрытие ошибки
const hideInputError = (formElement, inputElement) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.remove('popup__input_type_error')
	errorElement.classList.remove('popup__input-error_active')
	errorElement.textContent = ''
}
//Проверка
const checkInputValidity = (formElement, inputElement) => {
	if (inputElement.validity.patternMismatch) {
		inputElement.setCustomValidity(inputElement.dataset.errorMessage)
	} else {
		inputElement.setCustomValidity('')
	}
	if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage)
	} else {
		hideInputError(formElement, inputElement)
	}
}
//Проверка всех полей
const hasInvalidInput = inputList => {
	return inputList.some(inputElement => {
		return !inputElement.validity.valid
	})
}
//Функция блокировки/разбл. кнопки
const toggleButtonState = (inputList, buttonElement) => {
	if (hasInvalidInput(inputList)) {
		buttonElement.classList.add('popup__button_disabled')
	} else {
		buttonElement.classList.remove('popup__button_disabled')
	}
}

const setEventListeners = formElement => {
	const inputList = Array.from(formElement.querySelectorAll('.popup__input'))

	// const buttonElement = formElement.querySelector('.popup__button')

	toggleButtonState(inputList, buttonElement)

	inputList.forEach(inputElement => {
		inputElement.addEventListener('input', () => {
			checkInputValidity(formElement, inputElement)
			toggleButtonState(inputList, buttonElement)
		})
	})
}

//Включение проверки
const enableValidation = () => {
	const formList = Array.from(document.querySelectorAll('.popup__form'))

	formList.forEach(formElement => {
		formElement.addEventListener('submit', evt => {
			evt.preventDefault()
			buttonElement.textContent = 'Сохранение...'
		})
		setEventListeners(formElement)
	})
}

const clearValidation = () => {
	buttonElement.textContent = 'Сохранить'
	
	const inputListError = Array.from(
		document.querySelectorAll('.popup__input-error')
	)
	

	toggleButtonState(inputList, buttonElement)
	

	inputListError.forEach(errorElement => {
		errorElement.innerText = ''
	})
	inputList.forEach(inputError =>
		inputError.classList.remove('popup__input_type_error')
	)
}

export { enableValidation, clearValidation }
