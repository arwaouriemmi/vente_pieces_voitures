import { useEffect, useState } from "react";
import { FormDataProps } from "../../types/FormDataProps";
import { useParams } from "react-router-dom";
import { Button, Form, FormControl, FormLabel } from "react-bootstrap";
import { getData, handleChange, postData } from "../../utils";
import CarsSearchForm from "../SearchForm/carsSearchForm";
import { CategoryProps } from "../../types/categoryProps";

export default function EditPiece() {
  const [formData, setFormData] = useState<FormDataProps>({} as FormDataProps);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [subCategories, setSubCategories] = useState<CategoryProps[]>([]);
  const [pieces, setPieces] = useState<CategoryProps[]>([]);
  const { id } = useParams<{ id: string }>();
  const [isValidate, setIsValidate] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    console.log(formData);
    setErrors(validateForm(formData));
  }, [formData]);

  const validateForm = (values: FormDataProps) => {
    const errors: { [key: string]: string } = {};
    if (values.description && values.description.length < 10) {
      errors.description =
        "⚠ La description doit contenir au moins 10 caractères !";
    }
    if (values.comments && values.comments.length < 5) {
      errors.comments =
        "⚠ Les commentaires doivent contenir au moins 5 caractères !";
    }
    if (values.price && values.price < 0) {
      errors.price = "⚠ Le prix ne peut pas être négatif !";
    }
    if (!values.brand) {
      errors.brand = "⚠ Veuillez choisir la marque !";
    }
    if (!values.model) {
      errors.model = "⚠ Veuillez choisir le modéle !";
    }
    if (!values.motorization) {
      errors.motorization = "⚠ Veuillez choisir la génération !";
    }
    if (!values.category) {
      errors.category = "⚠ Veuillez choisir la catégorie !";
    }
    if (!values.subCategory) {
      errors.subCategory = "⚠ Veuillez choisir la sous catégorie !";
    }
    if (!values.piece) {
      errors.piece = "⚠ Veuillez choisir la piéce !";
    }

    if (
      errors.brand ||
      errors.model ||
      errors.motorization ||
      errors.category ||
      errors.subCategory ||
      errors.piece ||
      errors.description ||
      errors.comments ||
      errors.price
    ) {
      setIsValidate(false);
    } else {
      setIsValidate(true);
    }
    return errors;
  };

  const handleSubmit = async () => {
    console.log(formData);
    try {
      postData("pieces/add", {
        ...formData,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      getData("categories", setCategories);
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    if (formData.category !== "" && formData.category !== undefined) {
      getData("subcategories/" + formData.category, setSubCategories);
    } else {
      setSubCategories([]);
      setPieces([]);
    }
  }, [formData.category]);

  useEffect(() => {
    if (formData.subCategory !== "" && formData.subCategory !== undefined) {
      //getData("pieces/" + formData.subCategory, setPieces);
      setPieces([{id: 4, label: "piece1" }, {id: 5, label: "piece2" }, {id: 6, label: "piece3" }]);
    } else {
      setPieces([]);
    }
  }, [formData.subCategory]);

  return (
    <div
      className={`custom-container`}
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        marginTop: "50px",
        height: "100%",
        width: "80%",
      }}
    >
      <fieldset
        style={{ border: "2px solid ", margin: "20px", padding: "20px" }}
      >
        <CarsSearchForm formData={formData} setFormData={setFormData} 
        errors= {errors} isValidate = {isValidate} />
      </fieldset>

      <fieldset
        style={{ border: "2px solid ", margin: "20px", padding: "20px" }}
      >
        <legend style={{ fontSize: "20px", padding: "20px" }}>
          Choisir une piéce
        </legend>
        <div className="mb-3">
          <FormLabel>Catégorie</FormLabel>
          <Form.Select
            value={formData.category}
            name={"category"}
            onChange={(e: any) => handleChange(e, formData, setFormData)}
          >
            <option value="">Choisir une catégorie</option>
            {categories.map((category) => (
              <option value={category.id}>{category.label}</option>
            ))}
          </Form.Select>
          <p className="text-danger">{!isValidate && errors["category"]}</p>
        </div>
        <div className="mb-3">
          <FormLabel>Sous Catégorie </FormLabel>
          <Form.Select
            value={formData.subCategory}
            name={"subCategory"}
            onChange={(e: any) => handleChange(e, formData, setFormData)}
          >
            <option value="">Choisir une sous catégorie</option>
            {subCategories.map((subCategory) => (
              <option value={subCategory.id}>{subCategory.label}</option>
            ))}
          </Form.Select>
          <p className="text-danger">{!isValidate && errors["subCategory"]}</p>
        </div>
        <div className="mb-3">
          <FormLabel>Piéce</FormLabel>
          <Form.Select
            value={formData.piece}
            name={"piece"}
            onChange={(e: any) => handleChange(e, formData, setFormData)}
          >
            <option value="">Choisir une piéce</option>
            {pieces.map((piece) => (
              <option value={piece.id}>{piece.label}</option>
            ))}
          </Form.Select>
          <p className="text-danger">{!isValidate && errors["piece"]}</p>
        </div>
      </fieldset>
      <fieldset
        style={{ border: "2px solid ", margin: "20px", padding: "20px" }}
      >
        <legend style={{ fontSize: "20px", padding: "20px" }}>
          Saisir les détails de la piéce
        </legend>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FormLabel style={{ marginRight: "10px" }}> Image </FormLabel>
          <FormControl
            type={"file"}
            value={formData.image}
            name={"image"}
            onChange={(e: any) => {
              setFormData({
                ...formData,
                image: e.target.files ? e.target.files[0].name : undefined,
              });
            }}
            accept="image/*"
            style={{ width: "500px" }}
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", paddingTop: "20px" }}
        >
          <FormLabel style={{ marginRight: "10px" }}>Prix</FormLabel>
          <FormControl
            type={"number"}
            value={formData.price}
            name={"price"}
            onChange={(e: any) => handleChange(e, formData, setFormData)}
            style={{ width: "500px" }}
          />
          <p className="text-danger">{!isValidate && errors["price"]}</p>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", paddingTop: "20px" }}
        >
          <FormLabel style={{ marginRight: "10px" }}>Description</FormLabel>

          <FormControl
            type={"text"}
            value={formData.description}
            name={"description"}
            onChange={(e: any) => handleChange(e, formData, setFormData)}
            style={{ width: "500px" }}
          />
        </div>
        <p className="text-danger">{!isValidate && errors["description"]}</p>
        <div
          style={{ display: "flex", alignItems: "center", paddingTop: "20px" }}
        >
          <FormLabel style={{ marginRight: "10px" }}>
            Référence du constructeur
          </FormLabel>

          <FormControl
            type={"text"}
            value={formData.constructorReference}
            name={"constructorReference"}
            onChange={(e: any) => handleChange(e, formData, setFormData)}
            style={{ width: "500px" }}
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", paddingTop: "20px" }}
        >
          <FormLabel style={{ marginRight: "10px" }}>Commentaires</FormLabel>
          <FormControl
            type={"text"}
            value={formData.comments}
            name={"comments"}
            onChange={(e: any) => handleChange(e, formData, setFormData)}
            style={{ width: "500px" }}
          />
          <p className="text-danger">{!isValidate && errors["comments"]}</p>
        </div>
      </fieldset>
      <Button
        name="Submit"
        type="submit"
        disabled={!isValidate}
        onClick={() => {
          handleSubmit();
        }}
        style={{ marginRight: "900px", marginLeft: "20px" }}
      >
        Enregistrer la piéce
      </Button>
    </div>
  );
}