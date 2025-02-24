import { useDispatch, useSelector } from 'react-redux'
import { setTitleFilter, selectTitleFilter, resetFilteres } from '../../redux/slices/filterSlice'
import './Filter.css'
import { use } from 'react'

const Filter = () => {
  const dispatch = useDispatch()
  const titleFilter = useSelector(selectTitleFilter)

  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value))
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
        <button type="button" onClick={handleResetFilteres}>Reset Filteres</button>
      </div>
    </div>
  )
}

export default Filter
