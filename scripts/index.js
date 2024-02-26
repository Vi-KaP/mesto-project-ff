// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const containerList = document.querySelector('.places__list');

// @todo: Функция создания карточки

const createCard = (cardData, deleteCard) => {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	const resetButton = cardElement.querySelector('.card__delete-button');

	cardElement.querySelector('.card__image').src = cardData.link;
	cardElement.querySelector('.card__image').alt = cardData.name;
	cardElement.querySelector('.card__title').textContent = cardData.name;

	resetButton.addEventListener('click', () => deleteCard(cardElement));

	return cardElement;
}

// @todo: Функция удаления карточки

const deleteCard = (cardElement) => {
	cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
	const cardsElement = createCard(cardData, deleteCard);
	containerList.append(cardsElement);
})
