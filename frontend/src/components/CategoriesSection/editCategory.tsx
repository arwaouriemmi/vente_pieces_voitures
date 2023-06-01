import { useEffect, useState } from "react";
import { Button, FormControl, FormLabel } from "react-bootstrap";
import { CategoryProps } from "../../types/categoryProps";
import "react-toastify/dist/ReactToastify.css";
import { GrClose } from "react-icons/gr";
import "../../custom.css";
import {handleChange} from "../../apis/generic";
import { getCategoriesFromApi, getCategoryFromApi, patchCategory, postCategory } from "../../apis/categoryApis";

interface CategoryFormProps {
  id?: number;
  parent?: number;
  label?: string;
  image?: File;
 }

interface FormProps extends CategoryFormProps {
  isHidden: boolean;
  hide: () => void;
}

const setData = (data: CategoryFormProps) => {
  let formData = new FormData();
  if (data.image)
    formData.append("image", data.image, data.image?.name ?? "");
  formData.append("parent", data.parent?.toString() ?? "");
  formData.append("label", data.label ?? "");
  return formData;
};

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
    console.log("id", id)
    if (id && id !== -1 ) {
      const data = await getCategoryFromApi(id);
      setFormData(data);
    } else {
      const newFormData: CategoryFormProps = {
        id: id,
        parent: parent ?? -1,
      };
      setFormData(newFormData);
    }
  }
  

  useEffect(() => {
    getFormData();
  }, [id, parent]);

  const validateForm = (values: CategoryFormProps) => {
    const errors: { [key: string]: string } = {};
    if (!values.label) {
      errors.label = "⚠ Veuillez remplir ce champ";
    } else if (values.label.length < 2) {
      errors.label = "⚠ Veuillez entrer au moins 2 caractères";
    }
    if (errors.label) {
      setIsValidate(false);
    } else {
      setIsValidate(true);
    }
    return errors;
  };

  useEffect(() => {
    setErrors(validateForm(formData));
    console.log(formData);
  }, [formData]);

  const EditCategory = async () => {
    console.log("id", id)
    console.log("parent", parent)
    console.log("formData", formData)
    const data = setData(formData);
    patchCategory(id ?? -1, data);
    setFormData({ label: "" });
  };

  const AddCategory = async () => {
    console.log("id", id)
    console.log("parent", parent)
    console.log("formData", formData)
    const data = setData(formData);
    postCategory(data);
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
      {/*formData.parent === -1 &&*/ (
        <div className="mb-3">
          <FormLabel>Image: </FormLabel>
          <FormControl
            type={"file"}
            name={"image"}
            onChange={(e: any) => setFormData({ ...formData, image: e.target.files[0] })}
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
