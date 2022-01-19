import { useEffect, useState } from "react";
import BookTable from "../components/BooksTable";
import "../Styles/AdvancedSearch.css"

const BooksList = ({title, categoryFilter, booksList, setBooksList, createNotification, searchByString}) => {

    const [categoryList, setCategoryList] = useState([
        {
            value: "Autor"
        },
        {
            value: "Tytuł"
        },
        {
            value: "Kategoria"
        }
    ]);

    const [category, setCategory] = useState(categoryList[0].value);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if(searchByString)
            fetchAllBooks();
        else
            fetchBooksByCategory(categoryFilter);
    },[]);

    const fetchAllBooks = () => {
        fetch('http://localhost:8081/api/books/search?contain='+title)
            .then(res =>{
                return res.json();
            })
            .then(data =>{
                if(data.length > 0)
                {
                    setBooksList(data);
                }
                else{
                    alert('nie ma ksiązki');
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    const fetchBooksByCategory = (category) => {
        fetch('http://localhost:8081/api/books/categories/' + category)
        .then(res =>{
            return res.json();
        })
        .then(data => {
            setInputValue('');
            setBooksList(data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    const fetchBooksByTitle = (title) => {
        fetch('http://localhost:8081/api/books/search?contain=' + title)
        .then(res =>{
            return res.json();
        })
        .then(data => {
            setInputValue('');
            setBooksList(data);
        })
    }

    const fetchBooksByAuthor = (author) => {
        fetch('http://localhost:8081/api/books/authors/' + author)
        .then(res =>{
            return res.json();
        })
        .then(data => {
            setInputValue('');
            setBooksList(data);
        })
    }

    const fetchBooks = (e) => {
        e.preventDefault();
        console.log("input", inputValue);
        console.log("kategoria", category);

        if(inputValue === '') {
            fetchAllBooks();
            return;
        }

        switch(category) {
            case 'Autor':
                {
                    fetchBooksByAuthor(inputValue);
                    break;
                }
            case 'Tytuł':
                {
                    fetchBooksByTitle(inputValue);
                    break;
                }
            case 'Kategoria':
                {
                    fetchBooksByCategory(inputValue);
                    break;
                }
            default:
                break;
        }
    }

    return (
        <div className="bookslist-container">
            <div className="bookslist-header">
                <div className="searchbox-container">

                    <h1 className = "header-text">WYSZUKIWANIE ZAAWANSOWANE</h1>
                    <div className="search-panel">
                        <input type="text" placeholder = "Podaj dane" value={inputValue} onChange={e => setInputValue(e.target.value)}/>
                        <div className="select-container">
                            <select value = {category} onChange = {e => setCategory(e.target.value)}>
                                {
                                    categoryList.map(c => {
                                        return (
                                            <option value={c.value}>{c.value}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <button onClick={fetchBooks}>Wyszukaj</button>
                </div>
            </div>
            {booksList && <BookTable booksList = {booksList} createNotification={createNotification}/>}
        </div>
    );
}

export default BooksList;
