import React from "react";
import PopupWithForm from "./PopupWithForm ";

function AddPlacePopup(props) {
  const [placeName, setPlaceName] = React.useState("");
  const [placeLink, setPlaceLink] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: placeName,
      link: placeLink,
    });
  }
  function handleChangePlaceName(e) {
    setPlaceName(e.target.value);
  }

  function handleChangePlaceLink(e) {
    setPlaceLink(e.target.value);
  }
  React.useEffect(() => {
    setPlaceName("");
    setPlaceLink("");
  }, [props.isOpen]);
  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
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
              value={placeName || ""}
              onChange={handleChangePlaceName}
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
              value={placeLink || ""}
              onChange={handleChangePlaceLink}
              required
            />
            <span className="form__input-error link-error"></span>
          </fieldset>
        </>
      }
    />
  );
}

export default AddPlacePopup;
