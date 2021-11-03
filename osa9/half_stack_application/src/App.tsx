import React from 'react';
import Content from './components/Content';
import Header from './components/Header';
import Total from './components/Total';

export interface Part {
  name: string;
  exerciseCount: number;
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: Part[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name ={courseName} />
      <Content courseParts ={courseParts}/>
      <Total courseParts ={courseParts}/>
    </div>
  );
};

export default App;