import {
    Route,
  } from "react-router-dom";
import AddCategory from "./components/CategoriesSection/addCategory";
import CategoriesSection from "./components/CategoriesSection";
import EditCategory from "./components/CategoriesSection/editCategory";

const Routes = (
    <Route path="admin">
        <Route path="categories" element={<CategoriesSection/>} />
        <Route path="categories/add" element={<AddCategory/>} />
        <Route path="categories/edit" element={<EditCategory/>} />
    </Route>
)

export default Routes;