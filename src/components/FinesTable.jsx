import axios from 'axios';

const FinesTable = ({memberActiveFinesList, setMemberFines, userFines}) => {

    const payFine = (e, id, amount) => {
        e.preventDefault();
        
        let currentDate = new Date();

        const payment = {
            paymentAmount: parseInt(amount),
            paymentDate: currentDate.toISOString().split('T')[0]
        };

        postPayment(id, payment);
    }

    function postPayment(id, payment){
        return axios.post('http://localhost:8081/api/fines/' + id + "/payments", payment)
          .then((response) => {
            alert("Opłacono należność.");
            setMemberFines([...memberActiveFinesList]);
            return response;
          })
          .catch((error) => {
              return error;
          });
    }

    const buttonStyle = {
        backgroundColor: "#57923b",
        border: "none",
        color: "white",
        padding: "15px",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontSize: "16px",
        cursor: "pointer"
    };

    return (
        <div className="loan-table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID KARY</th>
                        <th>ID WYPOŻYCZENIA</th>
                        <th>DATA NAŁOŻENIA</th>
                        <th>KWOTA</th>
                        {userFines ? <th>AKCJE</th> : ''}
                    </tr>
                </thead>
                <tbody>
                    {console.log("in fines table", memberActiveFinesList)}
                    {memberActiveFinesList.map(fine =>(
                        fine && <tr key={fine.id} >

                            <td>{fine.id}</td>
                            <td>{fine.loan.id}</td>
                            <td>{fine.fineDate}</td>
                            <td>{fine.fineAmount}</td>
                            {userFines && fine.finePayments.length === 0 ? <td><button onClick={(e) => payFine(e, fine.id, fine.fineAmount)} style={buttonStyle}>Opłać</button></td> : ''}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FinesTable;
