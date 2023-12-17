const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <section>
      <h2>statistics</h2>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {all}</p>
      <p>average: {average}</p>
      <p>positive: {positive} %</p>
    </section>
  )
}

export default Statistics
