
import './App.css';

import ProductCards from './Components/ProductCards';
import {data} from './Components/Data' ;
import {voitures} from './Components/Voitures' ;
function App() {
  
  
  return (
    <div>
    
  <ProductCards products={data} voitures={voitures} />
    
    </div>
  );
}

export default App;
