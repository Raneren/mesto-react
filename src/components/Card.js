import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((user) => user._id === currentUser._id);

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  return (
    <article className="element">
      <div
        className="element__photo"
        onClick={handleClick}
        style={{ backgroundImage: `url(${props.link})` }}
      ></div>
      {isOwn && (
        <button
          type="button"
          onClick={handleDeleteClick}
          className="button button_type_delete"
        ></button>
      )}
      <div className="element__info">
        <h2 className="element__title">{props.name}</h2>
        <div className="element__likes-container">
          <button
            type="button"
            onClick={handleLikeClick}
            className={`button button_type_like ${
              isLiked && "button_type_like_active"
            }`}
          ></button>
          <p className="element__likes-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}
export default Card;
