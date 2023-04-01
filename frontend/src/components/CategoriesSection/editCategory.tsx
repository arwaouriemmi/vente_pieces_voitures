import { useLocation } from 'react-router-dom';
import CategoryForm  from './categoryForm';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CategoryProps } from './categoryProps';


export default function EditCategory() {
    let { state } = useLocation();
    const [category, setCategory] = useState<CategoryProps>()

    const getCategory = async (id : number) => {
        try {
            let response = 
            await axios.get("http://localhost:3001/admin/categories/" + id)
            setCategory(response.data)
        }
        catch(err){
           console.log(err)     
        }
    };

    useEffect(() => {
        getCategory(state.id)
    }, [])
    
    return (
        <div className='custom-container'>
            <h1>Modifier une catégorie</h1>
            <p>
                id : {state.id}
            </p>
            <CategoryForm {...category} />
        </div>
    )
}