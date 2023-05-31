import ProductCard from "./productCard";
import "./home.css";
import { Row } from "react-bootstrap";
import CategoriesList from "./categoryList";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./sideBar";
import { useEffect, useState } from "react";
import { ProductProps } from "../../types/ProductProps";
import { useSearchParams } from "react-router-dom";
import { getPiecesFromApi, searchPieces, searchPiecesByCategory } from "../../apis/piecesApis";
import Paginate from "../pagination";
import { useUserRole } from "../../getRole";
import SearchPieceProps from "../../types/searchPieceProps";


export function HomePage() {
  useUserRole(["", "admin", "provider"])
  const [searchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(0);
  const [selected, setSelected] = useState([] as number[]);
  const [page, setPage] = useState(
    searchParams.get("page") ? parseInt(searchParams.get("page") ?? "1") : 1
  );
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    motorization: "",
    sortBy: "",
} as SearchPieceProps);

  useEffect(() => {
    getPiecesFromApi(page).then((res) => {
      setProducts(res.data);
      if (res.count)
        setPageNumber(res.count / 5 + 1);
      else setPageNumber(0)
    });
  }, [page]);

  useEffect(() => {
    setPage(1);
    handleSearch();
  }, [selected]);

  const handleSearch = () => {
    setPage(1);
    if (selected.length > 0) {    
      searchPiecesByCategory(selected, formData, page).then((res) => {
        setProducts(res.data);
        if (res.count)
          setPageNumber(res.count / 5 + 1);
        else setPageNumber(0)
      });
    }
    else{
      console.log(formData)
      searchPieces(formData, page).then((res) => {
        setProducts(res.data);
        if (res.count)
          setPageNumber(res.count / 5 + 1);
        else setPageNumber(0)
      });
    }
  };

  return (
    <>
      <div className="custom-container">
        <h4>Catégories</h4>
        <CategoriesList selected ={selected} setSelected={setSelected}/>
      </div>
      <div className="d-flex flex-row justify-items-between">
        <SideBar formData={formData} setFormData={setFormData} handleSearch={handleSearch} />
        <div
          className="p-2 "
          style={{
            width: "75%",
            marginLeft: "50px",
          }}
        >
          <h4 style={{ paddingTop: 90 }}>Résulats de la recherche pour :</h4>
          <Row style={{ gap: 30 }}>
            {products.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </Row>
          {pageNumber!== 0 && <Paginate page={page} setPage={setPage} pageNumber={pageNumber} />}
        </div>

      </div>
    </>
  );
}