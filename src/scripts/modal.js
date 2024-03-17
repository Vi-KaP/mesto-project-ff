const openModal = popup => {
	popup.classList.add('popup_is-opened')
	popup.addEventListener('click', closePopupByClick)

	document.addEventListener('keydown', closePopupByEsc)
}

const closeModal = popup => {
	popup.classList.remove('popup_is-opened')
	popup.removeEventListener('click', closePopupByClick)
	document.removeEventListener('keydown', closePopupByEsc)
}

const closePopupByClick = evt => {
	if (
		evt.target === evt.currentTarget ||
		evt.target.classList.contains('popup__close')
	) {
		closeModal(document.querySelector('.popup_is-opened'))
	}
}

const closePopupByEsc = evt => {
	if (evt.key === 'Escape') {
		closeModal(document.querySelector('.popup_is-opened'))
	}
}

export { openModal, closeModal }
