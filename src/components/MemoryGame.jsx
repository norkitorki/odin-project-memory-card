import '../style/MemoryGame.css';
import Scoreboard from './Scoreboard';
import Card from './Card';
import { useState, useRef } from 'react';

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function MemoryGame({ images }) {
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const selection = useRef({});

  const maxPossible = images.length;
  const shuffledImages = shuffleArray([].concat(images));
  const imagesToRender = shuffledImages.slice(0, 9);

  if (imagesToRender.every((img) => selection.current[img.id])) {
    const image = shuffledImages.find((img) => !selection.current[img.id]);
    if (image) {
      const randomIndex = Math.floor(Math.random() * imagesToRender.length);
      imagesToRender.splice(randomIndex, 1, image);
    }
  }

  const handleClick = (id) => {
    if (selection.current[id]) {
      selection.current = {};
      return setScore(0);
    }

    if (score + 1 >= maxPossible) {
      alert('Congratulations! You have won the game.');
      setScore(0);
      setMaxScore(0);
      return (selection.current = {});
    }

    selection.current[id] = 1;
    setScore(score + 1);
    if (score >= maxScore) setMaxScore(score + 1);
  };

  return (
    <>
      <Scoreboard score={score} maxScore={maxScore} maxPossible={maxPossible} />
      <div className="cardContainer">
        {imagesToRender.length < 1
          ? 'Cards are loading...'
          : imagesToRender.map((item) => (
              <Card
                key={item.id}
                image={item.image}
                text={item.text}
                onClick={() => handleClick(item.id)}
              />
            ))}
      </div>
    </>
  );
}
