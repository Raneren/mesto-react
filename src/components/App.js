import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm ";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setcurrentUser] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setcurrentUser(userData);
      })
      .catch((err) => console.log(err));
    api
      .getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => console.log(err));
  }, []);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((cards) =>
        cards.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard
        )
      );
    });
  }
  function handleCardDelete(card) {
    api.deleteCardOnServer(card._id).then(() => {
      setCards((cards) =>
        cards.filter((currentCard) => currentCard._id != card._id)
      );
    });
  }
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <PopupWithForm
          title="Редактировать профиль"
          name="profile"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          children={
            <>
              <fieldset className="form__field">
                <input
                  className="form__input form__input_type_name"
                  type="text"
                  placeholder="Имя"
                  name="name"
                  minLength="2"
                  maxLength="40"
                  required
                />
                <span className="form__input-error name-error"></span>
              </fieldset>
              <fieldset className="form__field">
                <input
                  className="form__input form__input_type_about"
                  type="text"
                  placeholder="О себе"
                  name="about"
                  minLength="2"
                  maxLength="200"
                  required
                />
                <span className="form__input-error about-error"></span>
              </fieldset>
            </>
          }
        />
        <PopupWithForm
          name="card"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          children={
            <>
              <fieldset className="form__field">
                <input
                  className="form__input form__input_type_place"
                  type="text"
                  placeholder="Название"
                  name="name"
                  minLength="2"
                  maxLength="30"
                  required
                />
                <span className="form__input-error name-error"></span>
              </fieldset>
              <fieldset className="form__field">
                <input
                  className="form__input form__input_type_link"
                  type="url"
                  placeholder="Ссылка на картинку"
                  name="link"
                  required
                />
                <span className="form__input-error link-error"></span>
              </fieldset>
            </>
          }
        />
        <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          children={
            <>
              <fieldset className="form__field">
                <input
                  className="form__input form__input_type_link"
                  type="url"
                  placeholder="Ссылка на картинку"
                  name="avatar"
                  required
                />
                <span className="form__input-error avatar-error"></span>
              </fieldset>
            </>
          }
        />
        <ImagePopup
          name={selectedCard.name}
          link={selectedCard.link}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
