const LoansTable = ({memberActiveLoansList, deleteLoan}) => {

    const buttonStyle = {
        backgroundColor: "#cc0000",
        border: "none",
        color: "white",
        padding: "15px",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontSize: "16px",
        cursor: "pointer"
    };

  if(deleteLoan) {
    return (
      <div className="loan-table-container">
          <table>
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>TYTUŁ</th>
                      <th>AUTOR</th>
                      <th>DATA WYPOŻYCZENIA</th>
                      <th>DATA ZWROTU</th>
                      {
                        deleteLoan && <th>AKCJE</th>
                      }
                  </tr>
              </thead>
              <tbody>

                  {memberActiveLoansList.map(loan =>(
                      loan && <tr key={loan.id} >
                          <td>{loan.id}</td>
                          <td>{loan.book.title}</td>
                          <td>{loan.book.authors.map(author => {
                              return (author.firstName + ' ' + author.lastName) + ' '
                          })}</td>

                          <td>{loan.loanDate}</td>

                          <td>
                              {loan.returnedDate === null ? 'Niezwrócona' : loan.returnedDate }
                          </td>
                          {
                              deleteLoan && loan.returnedDate === null &&
                              <td>
                                  <button style={buttonStyle} onClick={() => deleteLoan(loan.id)}>Usuń wypożyczenie</button>
                              </td>
                          }
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    );
  } else {
    console.log("Generuje dane", memberActiveLoansList);
    return (
      <div className="loan-table-container">
          <table>
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>TYTUŁ</th>
                      <th>AUTOR</th>
                      <th>DATA WYPOŻYCZENIA</th>
                      <th>DATA ZWROTU</th>
                  </tr>
              </thead>
              <tbody>
                  {memberActiveLoansList.map(loan =>(
                          <tr key={loan.id} >
                          <td>{loan.book.id}</td>
                          <td>{loan.book.title}</td>
                          <td>{loan.book.authors.map(author => {
                              return (author.firstName + ' ' + author.lastName) + ' '
                          })}</td>

                          <td>{loan.loanDate}</td>

                          <td>
                              {loan.returnedDate === null ? 'Niezwrócona' : loan.returnedDate }
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    );
  }

}

export default LoansTable;
