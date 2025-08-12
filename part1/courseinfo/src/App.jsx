const Header = (obj) => {
  return (
    <>
      <h1>{obj.course.name}</h1>
    </>
  )
}

const Part = (obj) => {
  console.log(obj)
  return (
    <>
      <p>
        {obj.part.name} {obj.part.exercises}
      </p>
    </>
  )
}

const Content = (obj) => {
  return (
    <>
      <Part part={obj.course.parts[0]} />
      <Part part={obj.course.parts[1]} />
      <Part part={obj.course.parts[2]} />
    </>
  )
}

const Total = (obj) => {
  const sumParts = p => p[0].exercises + p[1].exercises + p[2].exercises
  return (
    <>
      <p>Number of exercises {sumParts(obj.course.parts)}</p>
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