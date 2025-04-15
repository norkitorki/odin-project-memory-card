import './style/App.css';
import MemoryGame from './components/MemoryGame';
import { countryFlags } from './components/Countries';

export default function App() {
  return (
    <>
      <h1>EU Members Memory Card</h1>
      <MemoryGame images={countryFlags} />
    </>
  );
}
