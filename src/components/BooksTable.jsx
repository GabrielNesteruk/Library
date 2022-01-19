import { Link, useLocation } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';

const BookTable = ({booksList, createNotification}) => {
    let location = useLocation();

    var userData = JSON.parse(localStorage.getItem("userData"));

    const showLoanConfirm = (bookId) => {
      let book = booksList.find(element => element.id == bookId);
      confirmAlert({
        title: 'Rezerwacja',
        message: 'Czy na pewno chcesz wypożyczyć: ' + book.title + '?.',
        buttons: [
          {
            label: 'Tak',
            onClick: () => loan(bookId)
          },
          {
            label: 'Nie',
          }
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
      });
    }

    function loan(bookId) {
      let book = booksList.find(element => element.id == bookId);
      fetch('http://localhost:8081/api/loans/members/'+ userData.id +'/books/' + bookId, {
          method: 'POST',
          headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + localStorage.getItem('token')
          }
      }).then(res => {
        console.log(res.json())
        if(res.status === 400) {
          createNotification('error', "Próba wypożyczenia: " + book.title + " nieudana.");
        } else {
          createNotification('success', "Zarezerwowano: " + book.title);
        }
      })
    }

    return (
        <div className="booktable-container">
            <h1 className = 'text-header'>Lista Książek</h1>

            <table className = "books">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ISBN</th>
                        <th>TYTUŁ</th>
                        <th>AUTOR</th>
                        <th>KATEGORIA</th>
                        { location.pathname === "/listaksiążek" &&
                            <th>AKCJE</th>
                        }

                    </tr>
                </thead>
                <tbody>
                    {booksList.map (book => (

                        <tr style = {{margin: "20px 0"}} key = {book.id} >
                            <td>{book.id}</td>
                            <td>{book.isbn}</td>
                            <td>{book.title}</td>
                            <td>
                              {
                                book.authors.map((author, index) => {
                                  return (index !== book.authors.length - 1 ? author.firstName + ' ' + author.lastName + ',  ' : author.firstName + ' ' + author.lastName)
                                })
                              }
                            </td>

                            <td >
                            {
                                book.categories.map((category, index) => {
                                  return (index !== book.categories.length - 1 ? category.categoryName + ',  ' : category.categoryName)
                                })
                            }
                            </td>

                            { location.pathname === "/listaksiążek" &&
                              <td>
                                  <button  className = "loan-btn" key = {book.id} onClick = {() => {showLoanConfirm(book.id)}}
                                    style = {{display: localStorage.getItem("userRole") === "User" ? "flex" : "none"}}
                                  >
                                    Wypożycz
                                  </button>
                              </td>
                            }

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BookTable;
