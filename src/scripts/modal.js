// popups
const openModal = (popup, btnOpen) => {
	const popups = popup
	const button = btnOpen

	//Функция открытия мод.окон
	const open = () => {
		popups.classList.toggle('popup_is-opened')
	}

	button.addEventListener('click', open)
}

const openModalImg = ({ openButton, popupImg }) => {
	const modalImg = popupImg
	const imgPopup = modalImg.querySelector('.popup__image')
	const popupCaption = modalImg.querySelector('.popup__caption')

	const openImg = evt => {
		const img = evt.target
		;(imgPopup.src = img.src),
			(imgPopup.alt = img.alt),
			(popupCaption.textContent = imgPopup.alt)
		modalImg.classList.toggle('popup_is-opened')
	}

	openButton.addEventListener('click', openImg)
}

const closeModal = (popup) => {

	popup.addEventListener('click', evt => {
		if (evt.target === popup || evt.target.closest('.popup__close')) {
			popup.classList.remove('popup_is-opened')
		}
	})

	window.addEventListener('keydown', evt => {
		if (evt.key === 'Escape') {
			popup.classList.remove('popup_is-opened')
		}
	})

	popup.classList.remove('popup_is-opened')
}

export { openModal, openModalImg, closeModal }
