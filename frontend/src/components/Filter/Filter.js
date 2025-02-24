import { useDispatch, useSelector } from 'react-redux'
import { 
  setTitleFilter, 
  setAuthorFilter,
  setOnlyFavoriteFilter, 
  selectAuthorFilter, 
  selectTitleFilter, 
  selectOnlyFavoriteFilter, 
  resetFilteres } from '../../redux/slices/filterSlice'
import './Filter.css'
import { use } from 'react'

const Filter = () => {
  const dispatch = useDispatch()
  const titleFilter = useSelector(selectTitleFilter)
  const authorFilter = useSelector(selectAuthorFilter)
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter)

  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value))
  }

  const handleAuthorFilterChange = (e) => {
    dispatch(setAuthorFilter(e.target.value))
  }

  const handleOnlyFavoriteFilterChange = () => {
    dispatch(setOnlyFavoriteFilter())
  }

  const handleResetFilteres = () => {
    dispatch(resetFilteres())
  }


  return (
    <div className="app-block filter">
      <div className='filter-row'>
        <div className="filter-group">
          <input
            type="text"
            placeholder="Filter by title"
            value={titleFilter}
            onChange={handleTitleFilterChange}
          />
        </div>
        <div className="filter-group">
          <input
            type="text"
            placeholder="Filter by author"
            value={authorFilter}
            onChange={handleAuthorFilterChange}
          />
        </div>
        <div className='filter-group'>
          <label>
            <input
              type="checkbox"
              checked={onlyFavoriteFilter}
              onChange={handleOnlyFavoriteFilterChange}
            />
            Only Favorite
          </label>
        </div>
        <button type="button" onClick={handleResetFilteres}>Reset Filteres</button>
      </div>
    </div>
  )
}

export default Filter
