const Header = (props) => {
  const course = props.course
  return (
    <>
      <h1>{course.name}</h1>
    </>
  )
}

const Part = (props) => {
  const part = props.part
  return (
    <>
      <p>
        {part.name} {part.exercises}
      </p>
    </>
  )
}

const Content = (props) => {
  const parts = props.course.parts
  return (
    <>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </>
  )
}

const Total = (props) => {
  const parts = props.course.parts
  const sumParts = p => p[0].exercises + p[1].exercises + p[2].exercises
  return (
    <>
      <p>Number of exercises {sumParts(parts)}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App