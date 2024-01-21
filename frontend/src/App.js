import { useState, useEffect } from 'react';
import { Flex, Box, Stat, StatLabel, StatNumber, Heading } from '@chakra-ui/react';
import Graph from './components/graph';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5100/all')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((fetchedData) => {
        console.log(fetchedData);
        setData(fetchedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error.message);
        setLoading(false);
      });
  }, []);

  const updateRevenue = (newValue) => {
    setRevenue(newValue);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Flex
        direction="column"
        align="center"
        justify="center"
        className="App-header"
      >
        <Heading as="h1" size="xl" textAlign="center" my="4">
          AutoScheduler
        </Heading>
        {/* Ensure the data is passed to the Graph component */}
        <Graph updateRevenue={updateRevenue} stats={data} />
        <Flex direction="row" justify="center" align="center" mt="4">
          <Stat>
            <StatLabel>Total Revenue</StatLabel>
            <StatNumber>$641,250</StatNumber> {/* Updated for better formatting */}
          </Stat>
          <Stat ml={3}>
            <StatLabel>Total Loss</StatLabel>
            <StatNumber>$2,117,350</StatNumber>
          </Stat>
        </Flex>
      </Flex>
    </div>
  );
}

export default App;
