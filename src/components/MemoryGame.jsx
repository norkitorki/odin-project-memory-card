import '../style/MemoryGame.css';
import Scoreboard from './Scoreboard';
import Card from './Card';
import { useState, useRef } from 'react';

export default function MemoryGame({ images }) {
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const selection = useRef({});

  const shuffledImages = images.toSorted(() => Math.random() - 0.5);

  const handleClick = (id) => {
    if (selection.current[id]) {
      selection.current = {};
      return setScore(0);
    }

    selection.current[id] = 1;
    setScore(score + 1);
    if (score >= maxScore) setMaxScore(score + 1);
  };

  return (
    <>
      <Scoreboard score={score} maxScore={maxScore} maxPossible={27} />
      <div className="cardContainer">
        {shuffledImages.length < 1
          ? 'Images are loading...'
          : shuffledImages.map((img) => (
              <Card
                key={img.id}
                imageSrc={img.image}
                imageAlt={img.text}
                text={img.text}
                onClick={() => handleClick(img.id)}
              />
            ))}
      </div>
    </>
  );
}
