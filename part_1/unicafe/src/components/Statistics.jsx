import StatisticLine from './StatisticLine'

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = all ? ((good - bad) / all).toFixed(3) : 0
  const positive = all ? ((good / all) * 100).toFixed(3) : 0

  return (
    <section>
      <h2>statistics</h2>
      {all ? (
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive} />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </section>
  )
}

export default Statistics
