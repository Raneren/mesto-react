import React from "react";
import PopupWithForm from "./PopupWithForm ";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [currentUser, , props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <fieldset className="form__field">
            <input
              className="form__input form__input_type_link"
              type="url"
              placeholder="Ссылка на картинку"
              name="avatar"
              ref={avatarRef}
              required
            />
            <span className="form__input-error avatar-error"></span>
          </fieldset>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
