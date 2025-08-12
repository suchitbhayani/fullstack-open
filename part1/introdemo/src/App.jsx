const Hello = (props) => {  
  console.log(props)
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const App = () => {
  const name = 'Baron'
  const age = '20'
  return (
    <>
      <h1>Greetings</h1>

      <Hello name='Suchit' age='20'/>
      <Hello name={name} age={age}/>
    </>
  )
}

export default App