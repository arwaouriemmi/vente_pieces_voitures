import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { getData, handleChange } from "../../utils";
import { Button, Form, FormControl, FormLabel } from "react-bootstrap";

export default function SideBar() {
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");

  useEffect(() => {
    getData("cars/brands/", setBrands);
  }, []);

  useEffect(() => {
    if (selectedBrand !== "") {
      getData("cars/models?brand=" + selectedBrand, setModels);
    } else {
      setModels([]);
    }
  }, [selectedBrand]);

  return (
    <div
      className="p-2"
      style={{
        width: "40%",
        backgroundColor: "aliceblue",
        marginTop: "50px",
        justifyItems: "center"
      }}
    >
      <h4>Filtres</h4>{" "}
      <Form>
        <div className="mb-3 p-2">
          <h6>Marque: </h6>
          <Form.Select
            value={selectedBrand}
            name={"brandSelect"}
            onChange={(e: any) => setSelectedBrand(e.target.value)}
          >
            <option value="">Choisir une marque</option>
            {Array.isArray(brands) &&
              brands.map((brand) => <option value={brand}>{brand}</option>)}
          </Form.Select>
        </div>

        <div className="mb-3 p-2">
          <h6>Modéle: </h6>
          <Form.Select
            defaultValue={selectedBrand ?? ""}
            name={"modelSelect"}
            onChange={(e: any) => setSelectedBrand(e.target.value)}
          >
            <option value="">Choisir un modéle</option>
            {Array.isArray(models) &&
              models.map((model) => <option value={model}>{model}</option>)}
          </Form.Select>
        </div>

        <div className="mb-3 p-2">
          <h6>Trier Par: </h6>
          <Form.Check>
            <Form.Check.Label htmlFor="sort1">Prix croissant</Form.Check.Label>
            <Form.Check.Input type="radio" name="sort" id="sort1" />
            <Form.Check.Label htmlFor="sort2">
              Prix décroissant
            </Form.Check.Label>
            <Form.Check.Input type="radio" name="sort" id="sort2" />
            <Form.Check.Label htmlFor="sort3">Date d'ajout</Form.Check.Label>
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
