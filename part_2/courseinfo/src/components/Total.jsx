const Total = ({ parts }) => {
  let total = 0

  parts.forEach((part) => {
    total = total + part.exercises
  })

  return (
    <footer>
      <strong>total of {total} exercise</strong>
    </footer>
  )
}

export default Total
