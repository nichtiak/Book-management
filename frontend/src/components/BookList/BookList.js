import { useSelector, useDispatch } from 'react-redux'
// import { deleteBook, toggleFavorite } from '../../redux/books/actionCreators'
import { deleteBook, toggleFavorite, selectBooks } from '../../redux/slices/booksSlice'
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs'
import { selectTitleFilter, selectAuthorFilter, selectOnlyFavoriteFilter } from '../../redux/slices/filterSlice'
import './BookList.css'

const BookList = () => {
  // const books = useSelector((state) => state.books)
  const books = useSelector(selectBooks)
  const titleFilter = useSelector(selectTitleFilter)
  const authorFilter = useSelector(selectAuthorFilter)
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter)
  const dispatch = useDispatch()

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id))
  }

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id))
  }

  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title.toLowerCase().includes(titleFilter.toLowerCase())
    const matchesAuthor = book.author.toLowerCase().includes(authorFilter.toLowerCase())
    const matchesBoth = matchesTitle && matchesAuthor
    const matchesFavorite = onlyFavoriteFilter ? book.isFavorite : true
    return matchesBoth && matchesFavorite
  })

  const highlightMatch = (text, filter) => {
    if (!filter) return text;

    const regex = new RegExp(`(${filter})`, 'gi')
    
    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className="highlight">
            {substring}
          </span>
        )
      }
      return substring
    })
  }

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <ul>
          {filteredBooks.map((book, index) => (
            <li key={book.id}>
              <div className="book-info">
                {++index}. {highlightMatch(book.title, titleFilter)}{''} by{' '} 
                <strong>
                  {highlightMatch(book.author, authorFilter)}
                </strong>{' '}
                ({book.source})
              </div>
              <div className="book-actions">
                <span onClick={() => handleToggleFavorite(book.id)}>
                  {book.isFavorite ? (
                    <BsBookmarkStarFill className="star-icon" />
                  ) : (
                    <BsBookmarkStar className="star-icon" />
                  )}
                </span>
                <button onClick={() => handleDeleteBook(book.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BookList
