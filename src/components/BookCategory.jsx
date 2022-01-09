import { useEffect } from "react";
import { useState } from "react/cjs/react.development";

const BookCategory = ({categoryId, setCategory}) => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            const categoriesFromServer = await fetchCategories();
            setCategories(categoriesFromServer);
          };
          getCategories();
    }, []);

    useEffect(() => {
        if(categoryId === -1 && categories.length > 0)
            setCategory(categories[0].id);
    }, [categories])

    const fetchCategories = async () => {
        const res = await fetch("http://localhost:8081/api/categories");
        const data = await res.json();
        return data;
    }

    const updateCategory = (e) => {
        setCategory(e.target.value);
    }

    return (
        <>
        <select style={{padding: "8px", fontSize: "16px"}} onChange={updateCategory}>
            {categories.map(c => {
                return (
                    <option value={c.id} key={c.id}>
                        {c.categoryName}
                    </option>
                )
            })}
        </select>
        </>
    );
}

export default BookCategory;
