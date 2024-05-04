/* eslint-disable react/prop-types */

import Anecdote from './Anecdote'

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} />
        ))}
    </div>
  )
}

export default AnecdoteList
