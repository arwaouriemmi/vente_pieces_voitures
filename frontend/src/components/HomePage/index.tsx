import ProductCard from "./productCard";
import "./home.css";
import { Row } from "react-bootstrap";
import CategoriesList from "./categoryList";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./sideBar";
import { useEffect, useState } from "react";
import { ProductProps } from "../../types/ProductProps";
import { useSearchParams } from "react-router-dom";
import { getPiecesFromApi, searchPiecesByCategory, searchPiecesBySubCategory } from "../../apis/piecesApis";
import Paginate from "../pagination";


export function HomePage() {
  const [searchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(0);
  const [page, setPage] = useState(
    searchParams.get("page") ? parseInt(searchParams.get("page") ?? "1") : 1
  );
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
   const [selectedSubcategory, setSelectedSubcategory] = useState<number | undefined>();


  useEffect(() => {
      if (selectedCategory) {
        searchPiecesByCategory(selectedCategory).then((res:any) => {
          setProducts(res.data);
        });
      } else if (selectedSubcategory) {
        searchPiecesBySubCategory(selectedSubcategory).then((res:any) => {
          setProducts(res.data);
        });
      } else {
    getPiecesFromApi(page).then((res) => {
      setProducts(res.data);
      if (res.count)
        setPageNumber(res.count / 5 + 1);
      else setPageNumber(0)
    }
    );}
  }, [page,selectedCategory,selectedSubcategory]);

  const handleSearch = (products: ProductProps[]) => {
    setProducts(products);
  };
  const handleCategorySelect = (categoryId:number) => {
    setSelectedCategory(categoryId);
  };
  
  const handleSubcategorySelect = (subcategoryId:number) => {
    setSelectedSubcategory(subcategoryId);
  };
  
  return (
    <>
      <div className="custom-container">
        <h4>Catégories</h4>
        <CategoriesList   onCategorySelect={setSelectedCategory}
  onSubcategorySelect={setSelectedSubcategory}/>
      </div>
      <div className="d-flex flex-row justify-items-between">
        <SideBar handleSearch={handleSearch} />
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