import '../style/Card.css';

export default function Card({ imageSrc, imageAlt, text, onClick }) {
  return (
    <button className="card" onClick={onClick}>
      <img className="cardImage" src={imageSrc} alt={imageAlt}></img>
      <span className="cardText">{text}</span>
    </button>
  );
}
