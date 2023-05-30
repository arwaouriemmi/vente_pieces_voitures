import "bootstrap/dist/css/bootstrap.min.css";
import {useState} from "react";
import {Button, Form} from "react-bootstrap";
import CarsSearchForm from "../SearchForm/carsSearchForm";
import CarProps from "../../types/carProps";
import {getData} from "../../apis/generic";
import {ProductProps} from "../../types/ProductProps";
import { searchPieces } from "../../apis/piecesApis";

export default function SideBar({handleSearch}: { handleSearch: (products: ProductProps[]) => void }) {
    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        motorization: "",
    } as CarProps);
    const [sortBy, setSortBy] = useState<string>("");
    const handleClick = () => {
        searchPieces(formData, sortBy).then((res) => {
            handleSearch(res);
        });
    }

    return (
        <div
            className="p-2"
            style={{
                backgroundColor: "aliceblue",
                marginTop: "50px",
                justifyItems: "center",
            }}
        >
            <h4>Filtres</h4>
            <CarsSearchForm formData={formData} setFormData={setFormData}/>
            <Form>
                <div className="mb-3 p-2">
                    <h6>Trier Par: </h6>
                    <Form.Check>
                        <Form.Check.Label htmlFor="sort1">
                            Prix croissant
                        </Form.Check.Label>
                        <Form.Check.Input type="radio" name="sort" id="sort1"
                                          onChange={() => setSortBy("IncreasingPrice")}/>
                        <Form.Check.Label htmlFor="sort2">
                            Prix décroissant
                        </Form.Check.Label>
                        <Form.Check.Input type="radio" name="sort" id="sort2"
                                          onChange={() => setSortBy("DecreasingPrice")}/>
                        <Form.Check.Label htmlFor="sort3">
                            Date d'ajout
                        </Form.Check.Label>
                        <Form.Check.Input type="radio" name="sort" id="sort3"
                                          onChange={() => setSortBy("AdditionDate")}/>
                    </Form.Check>
                </div>
                <Button variant="primary" type="submit" className="mt-3 p-2" onClick={(e) => handleClick()}>
                    Rechercher
                </Button>
            </Form>
        </div>
    );
}
