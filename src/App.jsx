import './style/App.css';
import MemoryGame from './components/MemoryGame';
import useFlags from './hooks/useFlags';

export default function App() {
  const countryFlags = useFlags();

  return (
    <>
      <h1>EU Members Memory Card</h1>
      <MemoryGame images={countryFlags} />
    </>
  );
}
