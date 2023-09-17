export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]
  
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-container',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'popup__input-container_invalid',
  errorClass: 'popup__span_error-message',
};

export const photosContainer = document.querySelector('.photos');
export const photoElement = document.querySelector('.photos__element');
/*для первого попапа*/
export const content = document.querySelector('.content');
export const popupEditProfile = document.querySelector('.popup_type_change');
export const buttonClosePopupProfile = document.querySelector('.popup__exit_type_change');
export const buttonClosePopupAdd = document.querySelector('.popup__exit_type_add');
export const profile = content.querySelector('.profile');
export const buttonEdit = document.querySelector('.profile__edit');
export const profileName = profile.querySelector('.profile__name');
export const profileJob = profile.querySelector('.profile__info');
export const nameInput = document.querySelector('.popup__input-container_type_name');
export const jobInput = document.querySelector('.popup__input-container_type_info');
export const buttonSaveUserData = popupEditProfile.querySelector('.popup__save-btn_type_change');

/*для добавления карточки*/
export const popupAdd = document.querySelector('.popup_type_add-cards');
export const buttonAddCard = document.querySelector('.profile__button');
export const placeName = popupAdd.querySelector('.popup__input-container_type_name-place');
export const placeLink = popupAdd.querySelector('.popup__input-container_type_link');
export const buttonSaveCard = popupAdd.querySelector('.popup__save-btn_type_add');

/*popup с картинкой*/
export const popupImg = document.querySelector('.popup_type_image');
export const buttonClosePopupImg = document.querySelector('.popup__exit_type_image');
export const image = popupImg.querySelector('.popup__image');
export const caption =  popupImg.querySelector('.popup__caption');

/*попап удаления карточки*/
export const popupDeleteCard = document.querySelector('.popup_type_delete-card');
export const avatarBtn = document.querySelector('.profile__change-btn');
export const deleteBtn = photosContainer.querySelector('.photos__delete');
export const confirmButton = popupDeleteCard.querySelector('.popup__save-btn_type_delete-card');
//попап для смены аватара
export const popupAvatarChange = document.querySelector('.popup_type_avatar');
export const inputAvatar = popupAvatarChange.querySelector('.popup__input-container_type_avatar');
export const saveAvatarBtn = popupAvatarChange.querySelector('.popup__save-btn_type_avatar');
//forms
export const formAddCard = document.querySelector('.popup__form_type_add-card');
export const formEditProfile = document.querySelector('.popup__form_type_profile');
export const formProfileAvatar = document.querySelector('.popup__form_type_avatar');