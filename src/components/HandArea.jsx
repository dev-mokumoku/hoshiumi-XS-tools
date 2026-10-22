import Card from "./Card";

function HandArea({ hand, playCard, onLongPressCard }) {
  return (
    <div className="card-row">
      {hand.map((card, index) => (
        <Card
          key={index}
          src={card.image_url}
          name={card.name}
          type={card.type} 
          size="normal"
          onClick={() => playCard(index)}
          onLongPress={() => onLongPressCard(index)}
        />
      ))}
    </div>
  );
}

export default HandArea;