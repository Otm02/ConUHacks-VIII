import React, { useState } from 'react';
import {
  Brush, Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

function Graph({ updateRevenue, stats }) {
  const data = [];

  for (let i = 0; i < stats[0]["Total Revenue"].length; i++) {
    data.push({
      "name": "Day " + (i + 1).toString(),
      "Compact": stats[2]["Total compact serviced"][i],
      "Medium": stats[3]["Total medium serviced"][i],
      "Fullsize": stats[4]["Total full-size serviced"][i],
      "C1 Truck": stats[5]["Total class 1 truck serviced"][i],
      "C2 Truck": stats[6]["Total class 2 truck serviced"][i],
    });
  }

  const [brushIndex, setBrushIndex] = useState([0, data.length - 1]);
  const [brushDomain, setBrushDomain] = useState([data[0].name, data[data.length - 1].name]);

  const handleBrushChange = (domain) => {
    if (domain && domain.length === 2) {
      const startIndex = data.findIndex(item => item.name === domain[0]);
      const endIndex = data.findIndex(item => item.name === domain[1]);
      setBrushIndex([startIndex, endIndex]);
      setBrushDomain([data[startIndex].name, data[endIndex].name]);

      const newRevenue = data.slice(startIndex, endIndex + 1).reduce((accumulator, current) => {
        return accumulator + ((current.Compact * 150) + (current.Medium * 150) + (current.Fullsize * 150) + (current["C1 Truck"] * 250) + (current["C2 Truck"] * 700));
      }, 0);
      updateRevenue(newRevenue);
    }
  };

  return (
    <ResponsiveContainer width="95%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Compact" stroke="#8884d8" />
        <Line type="monotone" dataKey="Medium" stroke="#82ca9d" />
        <Line type="monotone" dataKey="Fullsize" stroke="#ffc658" />
        <Line type="monotone" dataKey="C1 Truck" stroke="#8884f7" />
        <Line type="monotone" dataKey="C2 Truck" stroke="#82caac" />
        {data.length > 0 && (
          <Brush
            dataKey="name"
            height={30}
            startIndex={brushIndex[0]}
            endIndex={brushIndex[1]}
            onChange={handleBrushChange}
            domain={brushDomain}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Graph;
