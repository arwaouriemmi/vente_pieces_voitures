import ProductCard from "./productCard";
import "./home.css";
import { Row } from "react-bootstrap";
import CategoriesList from "./categoryList";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./sideBar";
import { useEffect, useState } from "react";
import { ProductProps } from "../../types/ProductProps";
import { useSearchParams } from "react-router-dom";
import {
  getPiecesFromApi,
  searchPieces,
  searchPiecesByCategory,
} from "../../apis/piecesApis";
import Paginate from "../pagination";
import { useUserRole } from "../../getRole";
import SearchPieceProps from "../../types/searchPieceProps";

export function HomePage() {
  useUserRole(["", "admin", "provider"]);
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
  const [search, setSearch] = useState(false);

  useEffect(() => {
    search
      ? handleSearch(page)
      : getPiecesFromApi(page).then((res) => {
          setProducts(res.data);
          setPageNumber(res.count / 6 + 1);
        });
  }, [page]);

  useEffect(() => {
    setFormData({
      brand: "",
      model: "",
      motorization: "",
      sortBy: "",
    } as SearchPieceProps);
    if (selected.length !== 0) 
      handleSearch();
  }, [selected]);

  const handleSearch = (page?: number) => {
    setSearch(true);
    if (!page) {
      page = 1;
      setPage(1);
    }
    if (selected.length > 0) {
      searchPiecesByCategory(selected[selected.length - 1], formData, page).then((res) => {
        setProducts(res.data);
        setPageNumber(res.count / 6 + 1);
      });
    } else {
      searchPieces(formData, page).then((res) => {
        setProducts(res.data);
        setPageNumber(res.count / 6 + 1);
      });
    }
    setFormData({
      brand: "",
      model: "",
      motorization: "",
    } as SearchPieceProps); 
  };

  return (
    <>
      <div className="custom-container">
        <h4>Catégories</h4>
        <CategoriesList selected={selected} setSelected={setSelected} />
      </div>
      <div className="d-flex flex-row justify-items-between">
        <SideBar
          formData={formData}
          setFormData={setFormData}
          handleSearch={handleSearch}
        />
        <div
          className="p-2 "
          style={{
            width: "75%",
            marginLeft: "50px",
          }}
        >
          <h4 style={{ paddingTop: 90 }}>Résulats de la recherche pour :</h4>
          <Row style={{ gap: 30 }}>
            {Object.values(products).map((product, i) => {
              return <ProductCard key={i} product={product} />;
            })}
          </Row>
          {pageNumber !== 0 && (
            <Paginate page={page} setPage={setPage} pageNumber={pageNumber} />
          )}
        </div>
      </div>
    </>
  );
}
