import { useEffect, useState } from 'react'
import { DiaryEntry } from './types'
import { getAllDiaryEntry } from './diaryService'

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    getAllDiaryEntry().then((data) => {
      console.log(data)
      setEntries(data)
    })
  }, [])

  return (
    <>
      <header>
        <h1>Diary App</h1>
      </header>

      <main>
        <h2>Diary Entries</h2>

        <ul>
          {entries.map((entry) => (
            <li key={entry.id}>
              <b>{entry.date}</b> <br />
              <span>{`visibility: ${entry.visibility}`}</span> <br />
              <span>{`weather: ${entry.weather}`}</span> <br />
              <p>{entry.comment}</p>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default App
