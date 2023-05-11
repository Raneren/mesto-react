import React from "react";
import Card from "./Card";
import Api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main(props) {

  const [cards, setCards] = React.useState([]);

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    Api
      .getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар профиля"
          />
          <div
            className="profile__edit-icon"
            onClick={props.onEditAvatar}
          ></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            type="button"
            className="button button_type_edit"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="button button_type_add"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cards.map((item) => (
          <Card
            card={item}
            link={item.link}
            name={item.name}
            key={item._id}
            onCardClick={props.onCardClick}
          />
        ))}
      </section>
    </main>
  );
}
export default Main;
