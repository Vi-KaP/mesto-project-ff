const token = '3150b793-2139-4a81-bc54-adc352f9350d'
const address = 'https://nomoreparties.co/v1/wff-cohort-10'
const handleRequest = res => {
	if (res.ok) {
		return res.json()
	}
	throw new Error(`Ошибка: ${res.status}`)
}

const getData = () => {
	return fetch(`${address}/cards`, {
		headers: {
			authorization: token,
		},
	}).then(handleRequest)
}

const getUserData = () => {
	return fetch(`${address}/users/me`, {
		headers: {
			authorization: token,
			'Content-Type': 'application/json',
		},
	}).then(handleRequest)
}

const createNewCard = cardData => {
	return fetch(`${address}/cards`, {
		method: 'POST',
		headers: {
			authorization: token,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(cardData),
	}).then(handleRequest)
}

const editProfile = profileInfo => {
	return fetch(`${address}/users/me`, {
		method: 'PATCH',
		headers: {
			authorization: token,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(profileInfo),
	}).then(handleRequest)
}

const editAvatar = avatar => {
	return fetch(`${address}/users/me/avatar`, {
		method: 'PATCH',
		headers: {
			authorization: token,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			avatar: avatar,
		}),
	}).then(handleRequest)
}

const deleteCardsApi = cardDataId => {
	return fetch(`${address}/cards/${cardDataId}`, {
		method: 'DELETE',
		headers: {
			authorization: token,
		},
	})
}

const putLike = cardId => {
	return fetch(`${address}/cards/likes/${cardId}`, {
		method: 'PUT',
		headers: {
			authorization: token,
		},
	}).then(handleRequest)
}

const deleteLike = cardId => {
	return fetch(`${address}/cards/likes/${cardId}`, {
		method: 'DELETE',
		headers: {
			authorization: token,
		},
	}).then(handleRequest)
}

export {
	getData,
	createNewCard,
	editProfile,
	deleteCardsApi,
	getUserData,
	putLike,
	deleteLike,
	editAvatar,
}
