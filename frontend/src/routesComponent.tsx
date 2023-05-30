import { Route, Routes } from "react-router-dom";
import CategoriesSection from "./components/CategoriesSection";
import ProviderSection from "./components/ProviderSection";
import EditProvider from "./components/ProviderSection/editProvider";
import CarsSection from "./components/CarsSection";
import EditCar from "./components/CarsSection/editCar";
import { HomePage } from "./components/HomePage";
import ProviderDetails from "./components/ProviderSection/ProviderDetails";
import EditPiece from "./components/SparePiecesSection/editPiece";
import SignIn from "./components/ProviderSection/SignIn";
import SignUp from "./components/ProviderSection/SignUp";
import PieceDetails from "./components/SparePiecesSection/pieceDetails";

export default function RoutesComponent (){
  return(<Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="login" element={<SignIn />} />
    <Route path="register" element={<SignUp />} />
    <Route path="admin">
      <Route path="categories" element={<CategoriesSection />} />
      <Route path="providers">
        <Route path="" element={<ProviderSection />} />
        <Route path="add" element={<EditProvider newElement={true} />} />
        <Route path="edit/:id" element={<EditProvider newElement={false} />} />
      </Route>
      <Route path="cars">
        <Route path="" element={<CarsSection />} />
        <Route path="add" element={<EditCar newElement={true} />} />
        <Route path="edit/:id" element={<EditCar newElement={false} />} />
      </Route>
    </Route>
    <Route path="providers">
      <Route path=":id" element={<ProviderDetails />} />
      <Route path=":id/pieces" element={<HomePage />} />
    </Route>
    <Route path="pieces">
      <Route path=":id" element={<PieceDetails/>} />
      <Route path="add" element={<EditPiece />} />
    </Route>
  </Routes>)
}


