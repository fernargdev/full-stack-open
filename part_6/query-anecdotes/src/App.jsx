import './styles/index.css'
import './styles/App.css'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () =>
      axios.get('http://localhost:3001/anecdotes').then((res) => res.data),
    retry: 1,
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) return <div>Loading data...</div>

  if (result.isError)
    return <div>anecdote service not available due to problems in server</div>

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
