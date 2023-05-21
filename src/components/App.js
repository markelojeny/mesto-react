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
  const [isLoading, setIsLoading] = React.useState(false)

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
    setIsLoading(true);
    api.editUser(info)
    .then((data) => {
      setCurrentUser(data);
      closePopup();
    })
    .catch(error => console.error(error))
    .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(info) {
    setIsLoading(true);
    api.changeAvatar(info)
    .then((res) => {
      setCurrentUser(res);
      //console.log(res);
      closePopup();
    })
    .catch(error => console.error(error))
    .finally(() => setIsLoading(false));
  }
  function handleAddPlaceSubmit(info) {
    setIsLoading(true);
    api.addCard(info)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      //console.log(newCard);
      closePopup();
    })
    .catch(error => console.error(error))
    .finally(() => setIsLoading(false));
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
      onUpdateUser={handleUpdateUser}
      isLoading={isLoading} /> 

      <AddPlacePopup isOpen={isAddPlacePopupOpen} 
      onClose={closePopup} 
      onUpdateCard={handleAddPlaceSubmit}
      isLoading={isLoading} /> 

      <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} 
      isOpen={isEditAvatarPopupOpen} 
      onClose={closePopup}
      isLoading={isLoading} />

      <PopupWithForm name="agreement" title="Вы уверены?" text="Да" onClose={closePopup} forms="agreement">
        
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closePopup} isOpen={isImagePopupOpen}/>

      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
