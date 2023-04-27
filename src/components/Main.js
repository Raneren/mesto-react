import React from "react";
import api from "../utils/Api";
import Card from "./Card";
function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
      })
      .catch((err) => console.log(err));
    api
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
            src={userAvatar}
            alt="Аватар профиля"
          />
          <div
            className="profile__edit-icon"
            onClick={props.onEditAvatar}
          ></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button
            type="button"
            className="button button_type_edit"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__about">{userDescription}</p>
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
