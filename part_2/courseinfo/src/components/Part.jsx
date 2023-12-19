const Part = ({ part }) => {
  const name = part.name
  const exercises = part.exercises
  return (
    <div>
      <p>
        {name} {exercises}
      </p>
    </div>
  )
}

export default Part
