import React from "react";
import PopupWithForm from "./PopupWithForm ";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
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
              value={name || ""}
              onChange={handleChangeName}
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
              value={description || ""}
              onChange={handleChangeDescription}
              required
            />
            <span className="form__input-error about-error"></span>
          </fieldset>
        </>
      }
    />
  );
}

export default EditProfilePopup;
