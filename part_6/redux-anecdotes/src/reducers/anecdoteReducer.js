import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote: (state, action) => {
      state.push(action.payload)
    },

    voteAnecdote: (state, action) => {
      const id = action.payload
      const anecdoteToChange = state.find((a) => a.id === id)

      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }

      return state.map((anecdote) =>
        anecdote.id === id ? changedAnecdote : anecdote
      )
    },

    appendAnecdote: (state, action) => {
      state.push(action.payload)
    },

    setAnecdotes: (state, action) => {
      return action.payload
    },
  },
})

export const { createAnecdote, voteAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions

export default anecdoteSlice.reducer
