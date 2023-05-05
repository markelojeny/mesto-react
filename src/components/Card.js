import React from 'react';

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }
  return (
    <article className="photo-card" key={props.card._id}>
      <img onClick={handleClick} className="photo-card__picture photo-card__button-picture" src={props.card.link} alt={props.card.name} />
      <div className="photo-card__group">
        <h2 className="photo-card__title">{props.card.name}</h2>
        <div className="like">
          <button className="like__button" type="button"></button>
          <h3 className="like__number">{props.card.likes.length}</h3>
        </div>
      </div>
      <button className="photo-card__button-delete" type="button"></button>
    </article>
  )
}

export default Card;