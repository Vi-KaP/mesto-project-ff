
const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
}

// Ошибка
const showInputError = (formElement, inputElement, errorMessage) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.add(validationConfig.inputErrorClass)

	errorElement.textContent = errorMessage
	errorElement.classList.add('popup__input-error_active')
}
//Скрытие ошибки
const hideInputError = (formElement, inputElement) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.remove(validationConfig.inputErrorClass)
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
		buttonElement.classList.add(validationConfig.inactiveButtonClass)
	} else {
		buttonElement.classList.remove(validationConfig.inactiveButtonClass)
	}
}

const setEventListeners = formElement => {
	const inputList = Array.from(
		formElement.querySelectorAll(validationConfig.inputSelector)
	)
	const buttonElement = formElement.querySelector(
		validationConfig.submitButtonSelector
	)
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
	const formList = Array.from(
		document.querySelectorAll(validationConfig.formSelector)
	)

	formList.forEach(formElement => {
		formElement.addEventListener('submit', evt => {
			evt.preventDefault()

			// buttonElement.textContent = 'Сохранение...'
		})
		setEventListeners(formElement)
	})
}

const clearValidation = validationConfig => {
	// buttonElement.textContent = 'Сохранить'

	const inputListError = Array.from(
		document.querySelectorAll('.popup__input-error')
	)
	// toggleButtonState(inputList, buttonElement)

	inputListError.forEach(errorElement => {
		errorElement.innerText = ''
	})
	// inputList.forEach(inputError =>
	// 	inputError.classList.remove(validationConfig.inputErrorClass)
	// )
}

export { enableValidation, clearValidation }
