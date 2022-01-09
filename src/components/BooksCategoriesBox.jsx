import { useState } from "react/cjs/react.development";
import { Redirect } from 'react-router-dom';

const BooksCategoriesBox = ({categoryFilter, searchByString}) => {

    const defaultCategories = [
        {
            name: "Horror"
        },
        {
            name: "Fantastyka"
        },
        {
            name: "Romans"
        },
        {
            name: "Przygoda"
        },
    ]

    const [categories, setCategories] = useState(defaultCategories);
    const [redirect, setRedirect] = useState(false);

    const categoryClick = (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        categoryFilter(categories[id].name);
        searchByString(false);
        setRedirect(true);
    }


    if(redirect) {
        return <Redirect to='/listaksiążek' />
    }
    return ( 
        <div className="books-bottom-container">
                <div className="text">
                    <h1>Kategorie Książek</h1>
                    <h3>Wybieraj według własnego upodobania</h3>
                </div>

                <div className="categories-row">
                    {
                        categories.map((c, i) => {
                            return (
                                <div className="categories-element" data-id={i} onClick={categoryClick}>
                                    <div className="img"></div>
                                    <div className = "category">
                                        <h1>{c.name}</h1>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
        </div>
     );
}
 
export default BooksCategoriesBox;