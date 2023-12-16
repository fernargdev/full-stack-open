const Total = (props) => {
  const exercise1 = props.course.parts[0].exercises
  const exercise2 = props.course.parts[1].exercises
  const exercise3 = props.course.parts[2].exercises

  return (
    <footer>
      <p>Number of exercises {exercise1 + exercise2 + exercise3}</p>
    </footer>
  )
}

export default Total
