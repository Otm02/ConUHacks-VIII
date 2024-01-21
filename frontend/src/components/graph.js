import React from 'react'
import { useState } from 'react';
import { Brush, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart, ResponsiveContainer } from 'recharts'

const data = [
    {
      "name": "",
      "Compact": 4000,
      "Medium": 2400,
      "amt": 2400
    },
    {
      "name": "01-02",
      "Compact": 3000,
      "Medium": 1398,
      "amt": 2210
    },
    {
      "name": "Page C",
      "Compact": 2000,
      "Medium": 9800,
      "amt": 2290
    },
    {
      "name": "Page D",
      "Compact": 2780,
      "Medium": 3908,
      "amt": 2000
    },
    {
      "name": "Page E",
      "Compact": 1890,
      "Medium": 4800,
      "amt": 2181
    },
    {
      "name": "Page F",
      "Compact": 2390,
      "Medium": 3800,
      "amt": 2500
    },
    {
      "name": "Page G",
      "Compact": 3490,
      "Medium": 4300,
      "amt": 2100
    }
  ]
  
function Graph() {
    return (
        <LineChart width={750} height={250} data={data}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
     <Tooltip />
     <Legend verticalAlign="top" height={36}/>
    <Line type="monotone" dataKey="Compact" stroke="#8884d8" />
    <Line type="monotone" dataKey="Medium" stroke="#82ca9d" />
    <Brush dataKey="x" height={36} stroke="#8884d8" fill="transparent" >
    <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" hide />
    <YAxis hide />
    <Line type="monotone" dataKey="Compact" stroke="#8884d8" />
    <Line type="monotone" dataKey="Medium" stroke="#82ca9d" />
        </LineChart>
    </Brush>
    </LineChart>
    )
}
export default Graph