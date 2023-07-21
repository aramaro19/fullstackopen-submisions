const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ]

  return <div>
    <h1>Web Development Curriculum</h1>
    {courses.map((course) => <Course course={course}/>)}
  </div>
}

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

export default App