import { useEffect, useState } from "react";
import { Button, FormControl, FormLabel } from "react-bootstrap";
import { CategoryProps } from "../../types/categoryProps";
import "react-toastify/dist/ReactToastify.css";
import { GrClose } from "react-icons/gr";
import "../../custom.css";
import {handleChange} from "../../apis/generic";
import { getCategoriesFromApi, patchCategory, postCategory } from "../../apis/categoryApis";

interface CategoryFormProps extends Partial<CategoryProps> { }

interface FormProps extends CategoryFormProps {
  isHidden: boolean;
  hide: () => void;
}

export default function EditCategory({
  id,
  parent,
  isHidden,
  hide,
}: FormProps) {
  const [formData, setFormData] = useState<CategoryFormProps>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isValidate, setIsValidate] = useState(false);

  const getFormData = async ()=>{
    if (id !== -1 && id !== undefined) {
      const data = await getCategoriesFromApi(id);
      setFormData(data);
    } else {
      const newFormData: CategoryFormProps = {
        id: id !== -1 ? id : undefined,
        parent: parent !== -1 ? parent : undefined,
      };
      setFormData(newFormData);
    }
  }
  

  useEffect(() => {
    getFormData();
  }, [id]);

  const validateForm = (values: CategoryFormProps) => {
    const errors: { [key: string]: string } = {};
    if (!values.label) {
      errors.label = "⚠ Veuillez remplir ce champ";
    } else if (values.label.length < 2) {
      errors.label = "⚠ Veuillez entrer au moins 2 caractères";
    }
    console.log(errors);
    if (errors.label) {
      setIsValidate(false);
    } else {
      setIsValidate(true);
    }
    return errors;
  };

  useEffect(() => {
    console.log(formData);
    setErrors(validateForm(formData));
  }, [formData]);

  const EditCategory = async () => {
    console.log(formData);
    patchCategory(id ?? 0, formData);
    setFormData({ label: "" });
  };

  const AddCategory = async () => {
    console.log(formData);
    postCategory(formData);
    setFormData({ label: "" });
  };

  return (

    <div className={`prompt ${isHidden && "d-none"}`}>
      <GrClose
        onClick={() => hide()}
        size={20}
        style={{ marginLeft: "98%", cursor: "pointer" }}
      />
      <h4>{id === -1 ? "Ajouter " : "Modifier "}une catégorie</h4>
      <div className="mb-3">
        <FormLabel>Nom: </FormLabel>
        <FormControl
          type={"text"}
          value={formData.label}
          name={"label"}
          onChange={(e: any) => handleChange(e, formData, setFormData)}
        />
        <p className="text-danger">{!isValidate && errors.label}</p>
      </div>
      {parent === -1 && (
        <div className="mb-3">
          <FormLabel>Image: </FormLabel>
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
          />
        </div>
      )}

      <Button
        name="Submit"
        type="submit"
        disabled={!isValidate}
        className="m-3"
        onClick={() => {
          id === -1 ? AddCategory() : EditCategory();
        }}
      >
        Enregistrer
      </Button>
    </div>

  );
}
