import { useState } from 'react'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = all ? ((good - bad) / all).toFixed(3) : 0
  const positive = all ? ((good / all) * 100).toFixed(3) : 0

  return (
    <>
      <header>
        <h2>give feedback</h2>
      </header>
      <main>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </main>
      <footer>
        <h2>statistics</h2>
        <p>good: {good}</p>
        <p>neutral: {neutral}</p>
        <p>bad: {bad}</p>
        <p>all: {all}</p>
        <p>average: {average}</p>
        <p>positive: {positive} %</p>
      </footer>
    </>
  )
}

export default App
