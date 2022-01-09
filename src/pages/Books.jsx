import BooksCategoriesBox from "../components/BooksCategoriesBox";
import Navbar from "../components/Navbar";

const Books = ({categoryFilter, searchByString}) => {
    return (
        <div className="books-container">
            <Navbar/>
            <div className="books-header"></div>
            <BooksCategoriesBox categoryFilter={categoryFilter} searchByString={searchByString}/>
        </div>
     );
}

export default Books;
