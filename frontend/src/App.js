import { useState } from 'react';
import { Flex, Box, Stat, StatLabel, StatNumber, Heading } from '@chakra-ui/react';
import Graph from './components/graph';

function App() {
  const [revenue, setRevenue] = useState(0);

  const updateRevenue = (newValue) => {
    setRevenue(newValue);
  };
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
        <Graph updateRevenue={updateRevenue} />
        <Flex direction="row" justify="center" align="center" mt="4">
          <Stat>
            <StatLabel>Total Revenue</StatLabel>
            <StatNumber>${revenue}.00</StatNumber>
          </Stat>
          <Stat ml={3}>
            <StatLabel>Revenue Loss</StatLabel>
            <StatNumber>$0.00</StatNumber>
          </Stat>
        </Flex>
      </Flex>
    </div>
  );
}

export default App;
