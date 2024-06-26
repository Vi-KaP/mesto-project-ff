const ArkhyzImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', import.meta.url);
const ChelyabinskImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg', import.meta.url);
const IvanovoImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg', import.meta.url);
const KamchatkaImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', import.meta.url);
const KholmogorskyImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg', import.meta.url);
const BaikalImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg', import.meta.url);


const initialCards = [
	{
		name: 'Архыз',
		link: ArkhyzImage,
	},
	{
		name: 'Челябинская область',
		link: ChelyabinskImage,
	},
	{
		name: 'Иваново',
		link: IvanovoImage,
	},
	{
		name: 'Камчатка',
		link: KamchatkaImage,
	},
	{
		name: 'Холмогорский район',
		link: KholmogorskyImage,
	},
	{
		name: 'Байкал',
		link: BaikalImage,
	},
]


export { initialCards}