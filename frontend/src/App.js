import './App.css';
import {
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import Graph from './components/graph'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>AutoScheduler</h1>
        <h2></h2>
        <Graph></Graph>
        <Stat>
        <StatLabel>Revenue of the Day</StatLabel>
        <StatNumber>£0.00</StatNumber>
        </Stat>
      </header>
    </div>
  );
}

export default App;
