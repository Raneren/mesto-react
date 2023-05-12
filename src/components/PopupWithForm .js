function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen&&"popup_opened"}`}>
      <div className="popup__container">
        <form
          className={`form form_type_${props.name}`}
          name={`${props.name}_form`}
          method="post"
          onSubmit={props.onSubmit}
        >
          <h2 className="form__title">{props.title}</h2>
          {props.children}
          <button type="submit" className="button button_type_submit">
            Сохранить
          </button>
        </form>
        <button type="button" className="button button_type_close" onClick={props.onClose}></button>
      </div>
    </div>
  );
}
export default PopupWithForm;
