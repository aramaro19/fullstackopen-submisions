const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
    ],
  }

  return <Course course={course}/>
}

const Course = ({course}) => {
  return <div>
    <Header name={course.name}/>
    <Content parts={course.parts}/>
    <Total parts={course.parts}/>
  </div> 
}

const Header = ({name}) => <h1>{name}</h1>

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

export default App