
import { useState } from "react";

const BooksDropdown = () => {

    //Ustawia czy dropdown jest widoczny czy nie 
    const [isDropdownVisible, setIsDropdownVisible] = useState(false)

    //Lista filtrów wyszukiwania 
    const [filterList, setFilterList] = useState([
        {
            name: "Isbn",
            value: "isbn"
        },
        {
            name: "Tytuł",
            value: "title"
        }
    ])
    return ( 
            <div className="c"></div>
     );
}
 
export default BooksDropdown;