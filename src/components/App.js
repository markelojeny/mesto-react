import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup.js"

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ })

  function handleAvatarEditClick() {
    setIsEditAvatarPopupOpen(true);  
  }
  function handleProfileEditClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handlePlaceAddClick() {
    setIsAddPlacePopupOpen(true)
  }
  
  function handleCardClick(card) {
    setSelectedCard(card)
    setIsImagePopupOpen(true);
  }

  const closePopup = function() {
    setIsEditProfilePopupOpen(false);  
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImagePopupOpen(false)
  }

  return (
    <>
      <Header />
      <Main editAvatarClick={handleAvatarEditClick} editProfileClick={handleProfileEditClick} addPlaceClick={handlePlaceAddClick} onCardClick={handleCardClick}/>
      <Footer />

      <PopupWithForm name="edit" title="Редактировать профиль" text="Сохранить" onClose={closePopup} isOpen={isEditProfilePopupOpen} forms="form">
        <input className="form__input form__input_edit_name" minLength="2" maxLength="40" id="user-name" name="nickname" type="text" placeholder="Имя профиля" value="" autoComplete="off" required />
        <span className="form__error" id="user-name-error"></span>
        <input className="form__input form__input_edit_about" minLength="2" maxLength="200" id="user-about" name="about" type="text" placeholder="Описание профиля" value="" autoComplete="off" required />
        <span className="form__error" id="user-about-error"></span>
      </PopupWithForm>
        
      <PopupWithForm name="place" title="Новое место" text="Сохранить" onClose={closePopup} isOpen={isAddPlacePopupOpen} forms="form">
        <input className="form__input form__input_add_name" minLength="2" maxLength="30" id="place-name" name="placeName" type="text" placeholder="Название" value="" autoComplete="off" required />
        <span className="form__error" id="place-name-error"></span>
        <input className="form__input form__input_add_link" id="place-link" name="placeLink" type="url" alt="" placeholder="Ссылка на картинку" value="" autoComplete="off" required />
        <span className="form__error" id="place-link-error"></span>
      </PopupWithForm>

      <PopupWithForm name="avatar" title="Обновить аватар" text="Сохранить" onClose={closePopup} isOpen={isEditAvatarPopupOpen} forms="avatar">
        <input className="form__input form__input_change_avatar" id="avatar" name="avatar" type="url" alt="" placeholder="Ссылка на аватар" value="" autoComplete="off" required />
        <span className="form__error" id="avatar-error"></span>
      </PopupWithForm>

      <PopupWithForm name="agreement" title="Вы уверены?" text="Да" onClose={closePopup} forms="agreement">
        
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closePopup} isOpen={isImagePopupOpen}/>

      <template className="card-template">
        <article className="photo-card">
          <img className="photo-card__picture photo-card__button-picture" src="#" alt=" "/>
          <div className="photo-card__group">
            <h2 className="photo-card__title"></h2>
            <div className="like">
              <button className="like__button" type="button"></button>
              <h3 className="like__number">6</h3>
            </div>
          </div>
          <button className="photo-card__button-delete" type="button"></button>
        </article>
      </template>
    </>
  );
}

export default App;
