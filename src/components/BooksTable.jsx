import { Link, useLocation } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';

const BookTable = ({booksList, createNotification}) => {
    let location = useLocation();

    var userData = JSON.parse(localStorage.getItem("userData"));

    const showLoanConfirm = (bookId) => {

      let bookTitle = booksList.filter((b) => b.id === bookId)[0].title;

      confirmAlert({
        title: 'Rezerwacja',
        message: 'Czy na pewno chcesz wypożyczyć: ' + bookTitle + '?.',
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

      let bookTitle = booksList.filter((b) => b.id === bookId)[0].title;

      fetch('http://localhost:8081/api/loans/members/'+ userData.id +'/books/' + bookId, {
          method: 'POST',
          headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + localStorage.getItem('token')
          }
      }).then(res => {
        console.log(res.json())
        if(res.status == 400) {
          createNotification('error', "Próba wypożyczenia: " + bookTitle + " nieudana.");
        } else {
          createNotification('success', "Zarezerwowano: " + bookTitle);
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
                        { location.pathname == "/listaksiążek" &&
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
                                book.authors.map(author => {
                                return (author.firstName + ' ' + author.lastName + ',  ')})
                                }
                            </td>

                            <td >
                              {     book.categories.map(category => {
                                    return (category.categoryName) + ', ';
                                    })}
                            </td>
                            <td>
                            { location.pathname == "/listaksiążek" &&
                              // <div className = "td-loan-btn" >
                                  <button  className = "loan-btn" key = {book.id} onClick = {() => {showLoanConfirm(book.id)}}
                                    style = {{display: localStorage.getItem("userRole") === "User" ? "flex" : "none", padding: "10px", fontSize: "16px", backgroundColor: "#57923b", color: "white"}}
                                  >
                                    Wypożycz
                                  </button>
                              // </div>
                            }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BookTable;
