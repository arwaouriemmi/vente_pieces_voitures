import {data} from '../Components/Data' ;
import {voitures} from '../Components/Voitures' ;
import ProductCards from '../Components/ProductCards';
import NavBar from '../Components/NavBarComponent';
export default function Home(){
 
    return(
        <div>
           <NavBar />
           <ProductCards products={data} voitures={voitures} />
        </div>

          )


}