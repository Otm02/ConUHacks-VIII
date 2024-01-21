import './App.css';
import {
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'



function App() {
  const promptBackEnd = async () => {
    try {
      const url = 'http://localhost:5100/all/';
  
      const response = await fetch(url, {
        method: 'GET'
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      } else {
        console.log('Error:', response.status + '\n' + "Response: " + response.json());
      }
    } catch (error) {
      console.log('Error:', response.status + '\n' + "Response: " + response.json());
    }
  };
  
  // Call the function to send data to Flask
  promptBackEnd();
  


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
