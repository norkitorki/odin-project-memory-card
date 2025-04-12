import '../style/MemoryGame.css';
import Countries from './Countries';
import Scoreboard from './Scoreboard';
import Card from './Card';
import { useState, useRef } from 'react';

const [countries, flagUrl] = Countries();

export default function MemoryGame() {
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const selection = useRef({});

  const handleClick = (code) => {
    if (selection.current[code]) {
      selection.current = {};
      return setScore(0);
    }

    selection.current[code] = 1;
    setScore(score + 1);
    if (score >= maxScore) setMaxScore(score + 1);
  };

  countries.sort(() => Math.random() - 0.5);

  return (
    <>
      <Scoreboard score={score} maxScore={maxScore} maxPossible={27} />
      <div className="cardContainer">
        {countries.length < 1
          ? 'Loading...'
          : countries.map((country) => (
              <Card
                key={`${country.code}`}
                imageSrc={flagUrl(country.code)}
                imageAlt={country.name}
                text={country.name}
                onClick={() => handleClick(country.code)}
              />
            ))}
      </div>
    </>
  );
}
