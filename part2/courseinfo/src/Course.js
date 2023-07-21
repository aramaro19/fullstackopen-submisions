import React from "react";

const Course = ({course}) => {
    return <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div> 
  }
  
  const Header = ({name}) => <h2>{name}</h2>
  
  const Content = ({parts}) => {
    console.log('parts are', parts)
    return parts.map( part => <Part key={part.id} part={part}/> )
  }
  
  const Part = ({part}) => {
    console.log('part:',part)
    return <p>{part.name} {part.exercises}</p>
  }
  
  const Total = ({parts}) => {
    const exercises = parts.map((part) => part.exercises)
    const total = exercises.reduce((a, b) => a + b)
    return <h4>total of {total} exercises</h4>
    
  }

  export default Course