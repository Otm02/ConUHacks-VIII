import React from 'react'
import { useState } from 'react';
import { Brush, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart, ResponsiveContainer } from 'recharts'


function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const data = [];
for (let i = 1; i <= 61; i++) {

  data.push({
    "name": "Day " + i.toString(),
    "Compact": generateRandomNumber(1, 5),
    "Medium": generateRandomNumber(1, 5),
    "Fullsize": generateRandomNumber(1, 5),
    "C1 Truck": generateRandomNumber(1, 5),
    "C2 Truck": generateRandomNumber(1, 5),
  });
}


function Graph({ updateRevenue }) {
  const [brushIndex, setBrushIndex] = useState([0, 60])

  // Function to update revenue when brush is changed
  const handleBrushChange = (domain) => {
    console.log(domain);
    setBrushIndex([domain.startIndex, domain.endIndex]);
    updateRevenue(data.slice(domain.startIndex, domain.endIndex).reduce((accumulator, current) => {
      return accumulator + ((current.Compact * 150) + (current.Medium * 150) + (current.Fullsize * 150) + (current["C1 Truck"] * 250) + (current["C2 Truck"] * 700));
    }, 0))

  };

  return (
    <div>
      <p>Brush Index: {brushIndex[0]} - {brushIndex[1]}</p>
      <LineChart width={875} height={350} data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Line type="monotone" dataKey="Compact" stroke="#8884d8" />
        <Line type="monotone" dataKey="Medium" stroke="#82ca9d" />
        <Line type="monotone" dataKey="Fullsize" stroke="#C70039" />
        <Line type="monotone" dataKey="C1 Truck" stroke="#C700BE" />
        <Line type="monotone" dataKey="C2 Truck" stroke="#FFCB08" />
        <Brush dataKey="x" height={36} stroke="#000000" fill="transparent" onChange={handleBrushChange}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Line type="monotone" dataKey="Compact" stroke="#8884d8" />
            <Line type="monotone" dataKey="Medium" stroke="#82ca9d" />
            <Line type="monotone" dataKey="Fullsize" stroke="#C70039" />
            <Line type="monotone" dataKey="C1 Truck" stroke="#C700BE" />
            <Line type="monotone" dataKey="C2 Truck" stroke="#FFCB08" />
          </LineChart>
        </Brush>
      </LineChart>
    </div>
  )
}
export default Graph