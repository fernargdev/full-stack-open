const Part = (props) => {
  const name = props.part.name
  const exercises = props.part.exercises

  return (
    <div>
      <p>
        {name} {exercises}
      </p>
    </div>
  )
}

export default Part
