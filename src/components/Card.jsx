import '../style/Card.css';

export default function Card({ imageSrc, imageAlt, text, onClick }) {
  return (
    <div className="card">
      <a href="#" onClick={onClick}>
        <img className="cardImage" src={imageSrc} alt={imageAlt}></img>
      </a>
      <span className="cardText">{text}</span>
    </div>
  );
}
