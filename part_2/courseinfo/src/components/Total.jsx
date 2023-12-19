const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <footer>
      <strong>total of {total} exercise</strong>
    </footer>
  )
}

export default Total
