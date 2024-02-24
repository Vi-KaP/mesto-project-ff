// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const container = document.querySelector('.places');
const containerList = container.querySelector('.places__list');

// @todo: Функция создания карточки
const createCard = (name, link, deleteCard) => {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	const resetButton = cardElement.querySelector('.card__delete-button');

	cardElement.querySelector('.card__image').src = link;
	cardElement.querySelector('.card__title').textContent = name;

	resetButton.addEventListener('click', deleteCard);

	return cardElement;
}

// @todo: Функция удаления карточки

const deleteCard = (event) => {
	const delCard = event.target.closest('.card');
	delCard.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
	cardElement = createCard(item.name, item.link, deleteCard);
	containerList.append(cardElement);
})
