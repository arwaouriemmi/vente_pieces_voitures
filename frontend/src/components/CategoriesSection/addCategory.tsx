import { useLocation } from 'react-router-dom';
import CategoryForm from './categoryForm';

export default function AddCategory() {
    let { state } = useLocation();
    return (
        <div className='custom-container'>
            <h1>Ajouter une catégorie</h1>
            <CategoryForm {...state}/>
        </div>
    )
}