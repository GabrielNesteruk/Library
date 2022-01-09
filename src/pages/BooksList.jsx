

import { useEffect, useState } from "react";
import BookTable from "../components/BooksTable";


const BooksList = ({title, categoryFilter, booksList, setBooksList, createNotification, searchByString}) => {

    const [category, setCategory] = useState('');

    useEffect(() => {
        let fetchString = "";
        if(searchByString)
            fetchString = 'http://localhost:8081/api/books/search?contain=' + title;
        else
            fetchString = 'http://localhost:8081/api/books/categories/' + categoryFilter;

        fetch(fetchString)
            .then(res =>{
                return res.json();
            })
            .then(data =>{
                if(data.length > 0)
                {
                    setBooksList(data);
                }
                else{
                    /*console.log("po ksiazce");
                    const newBooksList = booksList.filter(book => book.title === title);
                    setBooksList(newBooksList);*/
                    alert('nie ma ksiązki');
                }

            })

    },[]);




    return (

        <div className="bookslist-container">
            <div className="bookslist-header">
                <div className="searchbox-container">

                    <h1 className = "header-text">WYSZUKIWANIE ZAAWANSOWANE</h1>
                    <div className="search-panel">
                        <input type="text" placeholder = "Podaj dane"/>
                        <div className="select-container">
                            <select value = {category} onChange = {e => setCategory(e.target.value)}>
                                <option value = "author">Autor</option>
                                <option value = "title">Tytuł</option>
                                <option value = "category">Kategoria</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            {booksList && <BookTable booksList = {booksList} createNotification={createNotification}/>}
        </div>
     );
}

export default BooksList;
