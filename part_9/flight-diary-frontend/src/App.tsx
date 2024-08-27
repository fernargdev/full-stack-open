import axios from 'axios'
import React, { useState, useEffect } from 'react'

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
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getAllDiaryEntry().then((data) => {
      setEntries(data)
    })
  }, [])

  const addDiaryEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      const data = await createDiaryEntry(newDiaryEntry)

      setEntries(entries.concat(data))

      setNewDiaryEntry({
        date: '',
        visibility: Visibility.Good,
        weather: Weather.Sunny,
        comment: '',
      })

      setError(null)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data || 'An error occurred')
      } else {
        setError('Unknown Error')
      }
    }
  }

  return (
    <>
      <header>
        <h1>Flight Diary</h1>
      </header>

      <main>
        <br />
        <section>
          <h2>Add New Entry</h2>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <form onSubmit={addDiaryEntry}>
            <div>
              <label htmlFor="date">Date: </label>
              <br />

              <input
                type="date"
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
              <br />
              <label htmlFor="visibility">Visibility: </label>
              <br />

              {Object.values(Visibility).map((v) => {
                return (
                  <label key={v}>
                    <input
                      type="radio"
                      id={v}
                      name={v}
                      value={v}
                      checked={newDiaryEntry.visibility === v}
                      onChange={(event) =>
                        setNewDiaryEntry({
                          ...newDiaryEntry,
                          visibility: event.target.value as Visibility,
                        })
                      }
                    />
                    {v}
                  </label>
                )
              })}
            </div>

            <div>
              <br />
              <label htmlFor="weather">Weather: </label>
              <br />

              {Object.values(Weather).map((w) => {
                return (
                  <label key={w}>
                    <input
                      type="radio"
                      id={w}
                      name={w}
                      value={w}
                      checked={newDiaryEntry.weather === w}
                      onChange={(event) =>
                        setNewDiaryEntry({
                          ...newDiaryEntry,
                          weather: event.target.value as Weather,
                        })
                      }
                    />
                    {w}
                  </label>
                )
              })}
            </div>

            <div>
              <br />
              <label htmlFor="comment">Comment: </label>
              <br />

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

        <br />
        <section>
          <h2>Diary Entries</h2>

          {entries.map((e) => (
            <div key={e.id}>
              <h3>{e.date}</h3>
              <span>visibility: {e.visibility}</span>
              <br />
              <span>weather: {e.weather}</span>
              <p>{e.comment}</p>
            </div>
          ))}
        </section>
      </main>
    </>
  )
}

export default App
