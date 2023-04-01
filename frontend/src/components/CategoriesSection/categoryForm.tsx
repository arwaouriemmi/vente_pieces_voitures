import { Formik } from "formik";
import { Form, Field, ErrorMessage, FieldAttributes } from "formik";
import { FormEvent, useState } from "react";
import axios from "axios";
import { FormControl, FormLabel } from "react-bootstrap";
import { CategoryProps } from "./categoryProps";
import "./categories.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Button from "react-bootstrap/esm/Button";
import "./categories.css"
import { useEffect } from "react";

export default function CategoryForm({ parent, id, label, image }: CategoryProps){
    const [formData, setFormData] = useState<CategoryProps>({});
    const [isValidate, setIsValidate] = useState(false);

    useEffect(() => {
      const data = {
        parent : parent ?? undefined,
        id : id ?? undefined,
        label : label ?? undefined,
        image : image ?? undefined
      }
      setFormData(data)
      console.log(formData)
    }, [parent, id, label, image])
  
    const validateForm = (values: { [key: string]: string }) => {
      const errors: { [key: string]: string } = {};
      if (!values.label) {
        errors.label = '⚠ Veuillez remplir ce champ';
      } 
      if (errors.label) {
        setIsValidate(false);
      } else {
        setIsValidate(true);
      }
      return errors;
    };
  
    const handleSubmit = async () => {
        console.log(formData)
        try {
            await axios.post('http://localhost:3001/admin/categories/add', {
            ...formData,
            });
        } catch (err) {
            console.log(err);
        }
    };
  
    const handleChange = (e: FormEvent<HTMLFormElement>) => {
      const { name, value } = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: value });
    };
  
    return (
      <div>
        <Formik
          initialValues={{ label: formData.label ?? ""}}
          validate={validateForm}
          onSubmit={handleSubmit}

        >
          {() => (
            <Form
              name="Form"
              onChange={handleChange}
              
            >
              <Field
                type="name"
                name="label"
              >
                {(field : FieldAttributes<any>) => (
                    <div className="mb-3">
                        <FormLabel>Nom de la Catégorie</FormLabel>
                        <FormControl type={'text'} value={field.value} onChange={field.onChange} />
                    </div>
                )}
              </Field>
              <ErrorMessage
                name="label"
                component="div"
              />
            

            <div className="m-3">
                <label className="form-label">Entrez votre image</label>
                <input className="form-control" type="file" id="image" onChange={(event) => {
                    setFormData({...formData, image : event.target.files ? event.target.files[0].name : undefined });
                }} />
            </div>
              <Button
                name="Submit"
                type="submit"
                disabled={!isValidate}
                className= "m-3"
              >
                Enregistrer
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    );

}