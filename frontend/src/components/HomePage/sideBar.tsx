import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import CarsSearchForm from "../SearchForm/carsSearchForm";
import CarProps from "../../types/carProps";

export default function SideBar() {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    motorization: "",
  } as CarProps);
  const [sortBy, setSortBy] = useState<string>("");

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
      <CarsSearchForm formData={formData} setFormData={setFormData} />
      <Form>
        <div className="mb-3 p-2">
          <h6>Trier Par: </h6>
          <Form.Check>
            <Form.Check.Label htmlFor="sort1">
              Prix croissant
            </Form.Check.Label>
            <Form.Check.Input type="radio" name="sort" id="sort1" />
            <Form.Check.Label htmlFor="sort2">
              Prix décroissant
            </Form.Check.Label>
            <Form.Check.Input type="radio" name="sort" id="sort2" />
            <Form.Check.Label htmlFor="sort3">
              Date d'ajout
            </Form.Check.Label>
            <Form.Check.Input type="radio" name="sort" id="sort3" />
          </Form.Check>
        </div>
        <Button variant="primary" type="submit" className="mt-3 p-2">
          Rechercher
        </Button>
      </Form>
    </div>
  );
}
