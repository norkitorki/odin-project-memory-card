import '../style/Card.css';

export default function Card({ image, text, onClick }) {
  return (
    <button className="card" title={text} onClick={onClick}>
      <img className="cardImage" src={image.src} alt={image.alt} />
      {text}
    </button>
  );
}
