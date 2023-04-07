import {
    Route,
} from "react-router-dom";
import ProviderDetails from "./ProviderDetails";
import SignIn from "./SignIn";

import FormAjoutPieces from "./AddProviderPieceForm";

const Routes = (
<Route path="provider">
        <Route path="details/:id" element={<ProviderDetails/>} />
       <Route path="login" element={<SignIn/>}/>
       <Route path="add/:id" element={<FormAjoutPieces/>}/>
       </Route>
)

export default Routes;