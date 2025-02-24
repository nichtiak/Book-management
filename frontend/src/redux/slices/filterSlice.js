import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  title: ''
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      return {...state, title: action.payload}
    },
    resetFilteres: (state) => {
      return initialState;
    }
  }
})

export const { setTitleFilter, resetFilteres } = filterSlice.actions
export const selectTitleFilter= (state) => state.filter.title
export default filterSlice.reducer