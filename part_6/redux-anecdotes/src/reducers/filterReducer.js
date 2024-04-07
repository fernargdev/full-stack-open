import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterChange(state, action) {
      state = action.payload
      return state
    },
  },
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer
