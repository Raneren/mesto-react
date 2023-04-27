function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_photo-viewing  ${
        props.isOpen && "popup_opened"
      }`}
    >
      <div
        className="popup__photo"
        style={{ backgroundImage: `url(${props.link})` }}
      >
        <button
          type="button"
          className="button button_type_close"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__photo-title">{props.name}</h2>
      </div>
    </div>
  );
}
export default ImagePopup;
