import { Route } from "react-router-dom";
import CategoriesSection from "./components/CategoriesSection";
import ProviderSection from "./components/ProviderSection";
import EditProvider from "./components/ProviderSection/editProvider";
import CarsSection from "./components/CarsSection";
import EditCar from "./components/CarsSection/editCar";
import { HomePage } from "./components/HomePage";

const Routes = (
  <Route>
    <Route path="/" element={<HomePage />} />
    <Route path="admin">
      <Route path="categories" element={<CategoriesSection />} />
      <Route path="providers" element={<ProviderSection pageNumber={5} />} />
      <Route
        path="providers/add"
        element={<EditProvider newElement={true} />}
      />
      <Route
        path="providers/edit/:id"
        element={<EditProvider newElement={false} />}
      />
      <Route path="cars" element={<CarsSection pageNumber={5} />} />
      <Route path="cars/add" element={<EditCar newElement={true} />} />
      <Route path="cars/edit/:id" element={<EditCar newElement={false} />} />
    </Route>
  </Route>
);

export default Routes;
