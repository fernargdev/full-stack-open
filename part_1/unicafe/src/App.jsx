import { useState } from 'react'
import Statistics from './components/Statistics'

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
        <section>
          <button onClick={() => setGood(good + 1)}>good</button>
          <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
          <button onClick={() => setBad(bad + 1)}>bad</button>
        </section>

        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          all={all}
          average={average}
          positive={positive}
        />
      </main>
    </>
  )
}

export default App
