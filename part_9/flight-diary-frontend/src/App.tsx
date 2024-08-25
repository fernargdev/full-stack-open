import { useState, useEffect } from 'react'

import { Weather, Visibility, DiaryEntry, NewDiaryEntry } from './types'
import { getAllDiaryEntry, createDiaryEntry } from './diaryService'

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [newDiaryEntry, setNewDiaryEntry] = useState<NewDiaryEntry>({
    date: '',
    visibility: Visibility.Good,
    weather: Weather.Sunny,
    comment: '',
  })

  useEffect(() => {
    getAllDiaryEntry().then((data) => {
      console.log(data)
      setEntries(data)
    })
  }, [])

  const addDiaryEntry = (event: React.SyntheticEvent) => {
    event.preventDefault()

    console.log(newDiaryEntry)

    try {
      createDiaryEntry(newDiaryEntry).then((data) => {
        setEntries(entries.concat(data))
      })

      setNewDiaryEntry({
        date: '',
        visibility: Visibility.Good,
        weather: Weather.Sunny,
        comment: '',
      })
    } catch (error: unknown) {
      console.error(error)

      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'

      console.log(errorMessage)
    }
  }

  return (
    <>
      <header>
        <h1>Diary App</h1>
      </header>

      <main>
        <section>
          <h2>Add New Entry</h2>
          <form onSubmit={addDiaryEntry}>
            <div>
              <label htmlFor="date">Date: </label>
              <input
                type="text"
                id="date"
                required
                value={newDiaryEntry.date}
                onChange={(event) =>
                  setNewDiaryEntry({
                    ...newDiaryEntry,
                    date: event.target.value,
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="visibility">Visibility: </label>
              <input
                type="text"
                id="visibility"
                required
                value={newDiaryEntry.visibility}
                onChange={(event) =>
                  setNewDiaryEntry({
                    ...newDiaryEntry,
                    visibility: event.target.value as Visibility,
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="weather">Weather: </label>
              <input
                type="text"
                id="weather"
                required
                value={newDiaryEntry.weather}
                onChange={(event) =>
                  setNewDiaryEntry({
                    ...newDiaryEntry,
                    weather: event.target.value as Weather,
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="comment">Comment: </label>
              <input
                type="text"
                id="comment"
                required
                value={newDiaryEntry.comment}
                onChange={(event) =>
                  setNewDiaryEntry({
                    ...newDiaryEntry,
                    comment: event.target.value,
                  })
                }
              />
            </div>

            <br />
            <button type="submit">Add</button>
          </form>
        </section>

        <section>
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
        </section>
      </main>
    </>
  )
}

export default App
