const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'Premature optimization is the root of all evil.',
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE':
      return [...state, action.content]

    case 'VOTE': {
      const id = action.id
      const anecdoteToChange = state.find((a) => a.id === id)

      if (!anecdoteToChange) return state

      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }

      return state.map((anecdote) =>
        anecdote.id === id ? changedAnecdote : anecdote
      )
    }

    default:
      return state
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'CREATE',
    content: {
      content: content,
      id: getId(),
      votes: 0,
    },
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    id: id,
  }
}

export default reducer
