import { useState } from 'react'
import Statistics from './components/Statistics'
import Button from './components/Button'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <header>
        <h2>give feedback</h2>
      </header>
      <main>
        <section>
          <Button setValue={setGood} value={good} text="good" />
          <Button setValue={setNeutral} value={neutral} text="neutral" />
          <Button setValue={setBad} value={bad} text="bad" />
        </section>

        <Statistics good={good} neutral={neutral} bad={bad} />
      </main>
    </>
  )
}

export default App
