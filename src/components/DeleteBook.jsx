import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "../Styles/BookForm.css";

const DeleteBook = () => {
  const [bookList, setBooksList] = useState(null);
  const [book, setBook] = useState({
    bookId: "-1",
  });

  useEffect(() => {
    loadBooksList();
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
        setBooksList(books);
      });
  };

  function onChange(e) {
    console.log("change", e.target.id, e.target.value);
    var name = e.target.id;
    setBook({
      [name]: e.target.value,
    });
  }

  function submitForm(event) {
    event.preventDefault();

    if (book.bookId === "-1") return;

    alert("Książka usunięta.");

    return axios
      .delete("http://localhost:8081/api/books/" + book.bookId)
      .then((response) => {
        loadBooksList();
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  return (
    <div>
      <div className="booksform-container">
        <div className="booksform-header">
          <h1 className="header-text">USUŃ KSIĄŻKĘ</h1>
        </div>

        {bookList && (
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
                {bookList.map((book) => {
                  return (
                    <option value={book.id} key={book.id}>
                      {book.title}
                    </option>
                  );
                })}
              </select>
            </div>

            <input className="booksform-button" type="submit" value="Usuń" />
          </form>
        )}
      </div>
    </div>
  );
};

export default DeleteBook;
