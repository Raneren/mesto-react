function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  } 
  return (
    <article className="element">
      <div
        className="element__photo"
        onClick={handleClick}
        style={{ backgroundImage: `url(${props.link})` }}
      ></div>
      <button type="button" className="button button_type_delete"></button>
      <div className="element__info">
        <h2 className="element__title">{props.name}</h2>
        <div className="element__likes-container">
          <button type="button" className="button button_type_like"></button>
          <p className="element__likes-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}
export default Card;
