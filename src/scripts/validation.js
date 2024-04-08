
// Ошибка
const showInputError = (
	formElement,
	inputElement,
	errorMessage,
	validationConfig
) => {

	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.add(validationConfig.inputErrorClass)

	errorElement.textContent = errorMessage
	errorElement.classList.add(validationConfig.displayError)
}
//Скрытие ошибки
const hideInputError = (formElement, inputElement, validationConfig) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.remove(validationConfig.inputErrorClass)
	errorElement.classList.remove(validationConfig.displayError)
	errorElement.textContent = ''
}
//Проверка
const checkInputValidity = (formElement, inputElement, validationConfig) => {
	if (inputElement.validity.patternMismatch) {
		inputElement.setCustomValidity(inputElement.dataset.errorMessage)
	} else {
		inputElement.setCustomValidity('')
	}
	if (!inputElement.validity.valid) {
		showInputError(
			formElement,
			inputElement,
			inputElement.validationMessage,
			validationConfig
		)
	} else {
		hideInputError(formElement, inputElement, validationConfig)
	}
}
//Проверка всех полей
const hasInvalidInput = inputList => {
	return inputList.some(inputElement => {
		return !inputElement.validity.valid
	})
}
const disableSubmitButton = (buttonElement, validationConfig) => {
	buttonElement.disabled = true
	buttonElement.classList.add(validationConfig.inactiveButtonClass)
}
//Функция блокировки/разбл. кнопки
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
	if (hasInvalidInput(inputList)) {
		disableSubmitButton(buttonElement, validationConfig)
	} else {
		buttonElement.disabled = false
		buttonElement.classList.remove(validationConfig.inactiveButtonClass)
	}
}

const setEventListeners = (formElement, validationConfig) => {
	const inputList = Array.from(
		formElement.querySelectorAll(validationConfig.inputSelector)
	)
	const buttonElement = formElement.querySelector(
		validationConfig.submitButtonSelector
	)
	toggleButtonState(inputList, buttonElement, validationConfig)

	inputList.forEach(inputElement => {
		inputElement.addEventListener('input', () => {
			checkInputValidity(formElement, inputElement, validationConfig)
			toggleButtonState(inputList, buttonElement, validationConfig)
		})
	})
}

//Включение проверки
const enableValidation = validationConfig => {
	const formList = Array.from(
		document.querySelectorAll(validationConfig.formSelector)
	)

	formList.forEach(formElement => {
		formElement.addEventListener('submit', evt => {
			evt.preventDefault()

			const buttonElement = formElement.querySelector(
				validationConfig.submitButtonSelector
			)
			buttonElement.textContent = 'Сохранение...'
		})
		setEventListeners(formElement, validationConfig)
	})
}

const clearValidation = (formElement, validationConfig) => {
	const inputList = Array.from(
		formElement.querySelectorAll(validationConfig.inputSelector)
	)
	const buttonElement = formElement.querySelector(
		validationConfig.submitButtonSelector
	)

	disableSubmitButton(buttonElement, validationConfig)
	buttonElement.textContent = 'Сохранить'

	inputList.forEach(inputElement =>
		hideInputError(formElement, inputElement, validationConfig)
	)
}

export { enableValidation, clearValidation }
