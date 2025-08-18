const Persons = ({ personsToShow, deleteName }) => {
    return (
        <div>
            {personsToShow.map(person => 
            <div key={person.name}>
                {person.name} {person.number}<button onClick={() => deleteName(person)}>delete</button>
            </div>
            )}
        </div>
    )
}

export default Persons