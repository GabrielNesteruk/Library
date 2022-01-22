import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "../Styles/BookForm.css";

const BookAdd = () => {
  const [submit, setSubmit] = useState(false);
  const [authorToBook, setAuthor] = useState({
    authorId: "-1",
    bookId: "-1",
  });
  const [booksList, setBooksList] = useState(null);
  const [authorsList, setAuthorsList] = useState(null);

  useEffect(() => {
    loadBooksList();
    loadAuthorsList();
  }, []);

  const loadBooksList = () => {
    fetch("http://localhost:8081/api/books/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((books) => {
        console.log(books);
        setBooksList(books);
      });
  };

  const loadAuthorsList = () => {
    fetch("http://localhost:8081/api/authors/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((authors) => {
        console.log(authors);
        setAuthorsList(authors);
      });
  };

  function validateForm() {
    //dlugosc tytulu ksiazki
    if (authorToBook.authorId == "-1" || authorToBook.bookId == "-1") {
      console.log("AuthorToBook validation failed", authorToBook);
      return false;
    }

    return true;
  }

  function onChange(e) {
    console.log("change", e.target.id, e.target.value);
    var name = e.target.id;
    setAuthor({
      ...authorToBook,
      [name]: e.target.value,
    });
  }

  function postAuthorToBook(authorToBook) {
    return axios
      .post(
        "http://localhost:8081/api/books/" +
          authorToBook.bookId +
          "/authors/" +
          authorToBook.authorId
      )
      .then((response) => {
        console.log("response", response.data);
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  function submitForm(event) {
    event.preventDefault();

    //jeśli walidacja formularza udana - dodanie ksiazki i przekierowanie do listy
    if (validateForm()) {
      console.log("AuthorToBook submit", authorToBook);
      postAuthorToBook(authorToBook);
      alert("Autor został przypisany do książki.");
    }
  }

  return (
    <div>
      <div className="booksform-container">
        <div className="booksform-header">
          <h1 className="header-text">DODAJ AUTORA DO KSIĄŻKI</h1>
        </div>

        {booksList && authorsList && (
          <form onSubmit={submitForm}>
            <div className="booksform-input">
              <label className="booksform-label">KSIĄŻKA</label>
              <br />
              <select
                style={{ padding: "8px" }}
                id="bookId"
                onChange={(e) => onChange(e)}
              >
                <option value="-1">Wybierz książkę</option>
                {booksList.map((book) => {
                  return (
                    <option value={book.id} key={book.id}>
                      {book.title}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="booksform-input">
              <label className="booksform-label">AUTOR</label>
              <br />
              <select
                style={{ padding: "8px" }}
                id="authorId"
                onChange={(e) => onChange(e)}
              >
                <option value="-1">Wybierz autora</option>
                {authorsList.map((author) => {
                  return (
                    <option value={author.id} key={author.id}>
                      {author.firstName} {author.lastName}
                    </option>
                  );
                })}
              </select>
            </div>

            <input className="booksform-button" type="submit" value="Dodaj" />
          </form>
        )}
      </div>
    </div>
  );
};

export default BookAdd;
