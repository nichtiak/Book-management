import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  title: '',
  author: '',
  onlyFavorite: false
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      return {...state, title: action.payload}
    },
    setAuthorFilter: (state, action) => {
      return {...state, author: action.payload}
    },
    setOnlyFavoriteFilter: (state, action) => {
      state.onlyFavorite = !state.onlyFavorite // изменяем state благодаря библиотеке immer
      // return {...state, onlyFavorite: action.payload} // создаваем новый объект, чтобы не изменять старый
    },
    resetFilteres: () => {
      return initialState;
    }
  }
})

export const { setTitleFilter, resetFilteres, setAuthorFilter, setOnlyFavoriteFilter } = filterSlice.actions
export const selectTitleFilter = (state) => state.filter.title
export const selectAuthorFilter = (state) => state.filter.author
export const selectOnlyFavoriteFilter = (state) => state.filter.onlyFavorite
export default filterSlice.reducer