import "bootstrap/dist/css/bootstrap.min.css";
import { ChangeEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import CarsSearchForm from "../SearchForm/carsSearchForm";
import CarProps from "../../types/carProps";
import SearchPieceProps from "../../types/searchPieceProps";

export default function SideBar({
  handleSearch,
  formData,
  setFormData,
}: {
  handleSearch: () => void;
  formData: SearchPieceProps;
  setFormData: (formData: SearchPieceProps) => void;
}) {
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
      <CarsSearchForm
        formData={formData as CarProps}
        setFormData={setFormData}
      />
      <Form>
        <div className="mb-3 p-2">
          <h6>Trier Par: </h6>
          <Form.Check>
            <Form.Check.Label htmlFor="IncreasingPrice">
              Prix croissant
            </Form.Check.Label>
            <Form.Check.Input
              type="radio"
              name="sortby"
              id="IncreasingPrice"
              onChange={(e: any) =>setFormData({...formData, sortBy: "IncreasingPrice"})}
            />
            <Form.Check.Label htmlFor="sort2">
              Prix décroissant
            </Form.Check.Label>
            <Form.Check.Input
              type="radio"
              name="sortby"
              id="DecreasingPrice"
              onChange={(e: any) =>setFormData({...formData, sortBy: "DecreasingPrice"})}
            />
            <Form.Check.Label htmlFor="sort3">Date d'ajout</Form.Check.Label>
            <Form.Check.Input
              type="radio"
              name="sortby"
              id="AdditionDate"
              onChange={(e: any) =>setFormData({...formData, sortBy: "AdditionDate"})}
            />
          </Form.Check>
        </div>
        <Button
          variant="primary"
          type="submit"
          className="mt-3 p-2"
          onClick={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          Rechercher
        </Button>
      </Form>
    </div>
  );
}
