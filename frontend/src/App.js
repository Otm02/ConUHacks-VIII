import './App.css';
import {
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Stat>
        <StatLabel>Revenue of the Day</StatLabel>
        <StatNumber>£0.00</StatNumber>
        </Stat>
      </header>
    </div>
  );
}

export default App;
