import ProductCard from "./productCard";
import "./home.css";
import { Row } from "react-bootstrap";
import CategoriesList from "./categoryList";
import "bootstrap/dist/css/bootstrap.min.css"
import SideBar from "./sideBar";

export function HomePage() {
  return (
    <div className="d-flex flex-row justify-items-between">
        <SideBar/>
    <div className="p-2 "
    style = {{
        width: "75%",
        marginLeft: "50px"}
    }>
      <h4>Catégories</h4>
      <CategoriesList />
      <h4 style={{paddingTop: 90}}>
        Résulats de la recherche pour : 
      </h4>
      <Row style={{ gap: 30 }}>
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <ProductCard key={i} />
          ))}
      </Row>
    </div>
    </div>
  );
}
