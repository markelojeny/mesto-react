import React from 'react';
import api from "../utils/api.js"
import Card from "./Card.js"

//export default 
function Main(props) {

  const [userName, setUserName] = React.useState('');
  const [userDescription , setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      .catch(error => console.error(error));
    
    api.getInitialCards()
      .then(data => {
        setCards(data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <main className="content">

        <section className="profile">
          <div className="profile__card">
            <div className="profile__avatar-change">
              <img className="profile__avatar" src={userAvatar} alt="Аватар"/>
                <button className="profile__avatar-button" type="button" onClick={props.editAvatarClick}></button>
            </div>
            <div className="profile__info">
              <div className="profile__edit">
                <h1 className="profile__nickname">{userName}</h1>
                  <button className="profile__button-edit" type="button" aria-label="Редактировать" onClick={props.editProfileClick}></button>
              </div>
              <p className="profile__about">{userDescription}</p>
            </div>
          </div>
          <button className="profile__button-add" type="button" onClick={props.addPlaceClick}></button>
        </section>

        <section className="photo-cards">
          {cards.map((data, i) => {
            return <Card card={data} key={i._id} onCardClick={props.onCardClick} />
            }
          )}
        </section>

    </main>

  );
}
  
export default Main;