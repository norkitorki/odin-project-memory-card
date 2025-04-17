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
      <main>
        <MemoryGame images={countryFlags} />
      </main>
      <footer>
        Country flags were provided by{' '}
        <a href="https://flagpedia.net/" target="_blank">
          Flagpedia.net
        </a>
      </footer>
    </>
  );
}
