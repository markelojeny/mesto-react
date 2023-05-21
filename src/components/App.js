import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from "./ImagePopup.js";
import CurrentUserContext from "../context/CurrentUserContext.js";
import api from "../utils/api.js"

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([dataCurrentUser, dataCards]) => {
        setCurrentUser(dataCurrentUser)
        setCards(dataCards);
      })
      .catch(error => console.error(error));
  }, []);

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

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
        setCards((state) => state.map(
          (c) => c._id === card._id ? newCard : c
          ));
    })
    .catch(error => console.error(error));
} 

  function handleDeleteClick(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter(
        (c) => c._id !== card._id));
    })
    .catch(error => console.error(error));
  }

  function handleUpdateUser(info) {
    api.editUser(info)
    .then((data) => {
      setCurrentUser(data);
      closePopup();
    })
    .catch(error => console.error(error));
  }

  function handleUpdateAvatar(info) {
    api.changeAvatar(info)
    .then((res) => {
      setCurrentUser(res);
      //console.log(res);
      closePopup();
    })
    .catch(error => console.error(error));
  }
  function handleAddPlaceSubmit(info) {
    api.addCard(info)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      //console.log(newCard);
      closePopup();
    })
    .catch(error => console.error(error));
  }

  return (
    <>
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main editAvatarClick={handleAvatarEditClick} 
      editProfileClick={handleProfileEditClick} 
      addPlaceClick={handlePlaceAddClick} 
      onCardClick={handleCardClick} 
      onCardLike={handleCardLike} 
      onCardDelete={handleDeleteClick}
      cards={cards}/>
      <Footer />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} 
      onClose={closePopup} 
      onUpdateUser={handleUpdateUser}/> 

      <AddPlacePopup isOpen={isAddPlacePopupOpen} 
      onClose={closePopup} 
      onUpdateCard={handleAddPlaceSubmit}/> 

      <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} 
      isOpen={isEditAvatarPopupOpen} onClose={closePopup} />

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
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
