import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaSpinner } from 'react-icons/fa'
// import axios from 'axios'
// import { addBook } from '../../redux/books/actionCreators'
import { addBook, fetchBook, selectIsLoadingViaAPI } from '../../redux/slices/booksSlice'
import { setError } from '../../redux/slices/errorSlice'
import booksData from '../../data/books.json'
import createBookWithID from '../../utils/createBookWithID'
import './BookForm.css'

const BookForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  // const [isLoading, setIsLoading] = useState(false)
  const IsLoadingViaAPI = useSelector(selectIsLoadingViaAPI) // подписка на изменение isLoading через useSelector в Redux
  const dispatch = useDispatch()

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length)
    const randomBook = booksData[randomIndex]
    const randomBookWithID = createBookWithID(randomBook, 'random')
    dispatch(addBook(randomBookWithID))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (title && author) {
      const book = createBookWithID({ title, author }, 'manual')
      dispatch(addBook(book)) // функция добавления книги с помощью диспатча (фнкция из redux)
      setTitle('')
      setAuthor('')
    } else {
      dispatch(setError('You must fill title and author'))
    }
  }

  // const thunkFunction = async (dispatch, getState) => {
  //   try {
  //     const res = await axios.get('http://localhost:4000/random-book')
  //     if (res?.data?.title && res?.data?.author) {
  //       dispatch(addBook(createBookWithID(res.data, 'API')))
  //     }
  //   } catch (error) {
  //     console.log("fetch error", error)
  //   }
  // }

  const handleAddRandomBookViaAPI = () => {
    dispatch(fetchBook('http://localhost:4000/random-book-delayed')) 
  }

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
        <button type="button" onClick={handleAddRandomBook}>
          Add Random
        </button>
        <button type="button" onClick = {handleAddRandomBookViaAPI} disabled={IsLoadingViaAPI}>
          { IsLoadingViaAPI ? (
            <>
              <span>Loading Book...</span>
              <FaSpinner className="spinner" />
            </>
          ) : 'Add random via API'}
          </button>
      </form>
    </div>
  )
}

export default BookForm
