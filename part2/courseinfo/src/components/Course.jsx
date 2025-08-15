const Header = (props) => <h1>{props.course}</h1>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
    </div>
)}

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
)

const Total = ({ total }) => <p><b>total of {total} exercises</b></p>

const Course = ({ course }) => {
  const { name, id, parts } = course

  const sumExercises = parts.reduce(
    (acc, part) => acc + part.exercises,
    0,
  );

  return (
    <>
      <Header course={name} />
      <Content parts={parts} />
      <Total total={sumExercises} />
    </>
  )
}

export default Course