import './style/App.css';
import MemoryGame from './components/MemoryGame';
import useFlags from './hooks/useFlags';

export default function App() {
  const countryFlags = useFlags();

  return (
    <>
      <header>
        <h1>EU Members Memory Card</h1>
        <p>
          Can you remember every member state of the European Union? Click on
          every country exactly <b>once</b> to win the game!
        </p>
      </header>
      <MemoryGame images={countryFlags} />
    </>
  );
}
