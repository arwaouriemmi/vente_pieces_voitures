import { FormEvent, useEffect, useState } from "react";
import ProviderProps from "../../types/ProviderProps";
import { useParams } from "react-router-dom";
import { Button, Form, FormControl, FormLabel } from "react-bootstrap";
import { cities } from "./cities";
import { getProviderByIdFromApi, patchProvider, postProvider } from "../../apis/providerApis";
import { ToastContainer } from "react-toastify";

interface ProviderFormProps extends Partial<ProviderProps> { }

export default function EditProvider({ newElement }: { newElement: boolean }) {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<ProviderFormProps>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isValidate, setIsValidate] = useState(false);

  useEffect(() => {
    if (!newElement && id) {
      getProviderByIdFromApi(id).then((res) => {
        setFormData(res.data);
      });
    }
  }, [id]);

  const validateForm = (values: ProviderFormProps) => {
    const errors: { [key: string]: string } = {};
    if (!values.name) {
      errors.name = "⚠ Veuillez remplir ce champ";
    } else if (values.name.length < 3) {
      errors.name = "⚠ Le nom doit contenir au moins 3 caractères";
    }
    if (!values.address) {
      errors.address = "⚠ Veuillez remplir ce champ";
    }
    if (!values.phone) {
      errors.phone = "⚠ Veuillez remplir ce champ";
    } else if (values.phone.match(/^\+216\s\d{2}\s\d{3}\s\d{3}$/) === null) {
      errors.phone =
        "⚠ Le numéro de téléphone doit être sous la forme +216 XX XXX XXX";
    }
    if (!values.city || values.city === "") {
      errors.city = "⚠ Veuillez choisir une ville";
    }
    if (
      values.email &&
      values.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) === null
    ) {
      errors.email = "⚠ L'adresse email doit être sous la forme ...@...";
    }
    if (
      values.facebook &&
      values.facebook.match(
        /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/
      ) === null
    ) {
      errors.facebook =
        "⚠ Le lien doit être sous la forme https://www.facebook.com/...";
    }
    if (
      values.whatsapp &&
      values.whatsapp.match(
        /^(https?:\/\/)?(www\.)?wa.me\/[a-zA-Z0-9(\.\?)?]/
      ) === null
    ) {
      errors.whatsapp = "⚠ Le lien doit être sous la forme https://wa.me/...";
    }
    if (
      values.messenger &&
      values.messenger.match(
        /^(https?:\/\/)?(www\.)?m.me\/[a-zA-Z0-9(\.\?)?]/
      ) === null
    ) {
      errors.messenger = "⚠ Le lien doit être sous la forme https://m.me/...";
    }
    console.log(errors);
    if (
      errors.name ||
      errors.address ||
      errors.phone ||
      errors.city ||
      errors.facebook ||
      errors.whatsapp ||
      errors.messenger
    ) {
      console.log("invalid form");
      setIsValidate(false);
    } else {
      setIsValidate(true);
      console.log("valid form");
    }
    return errors;
  };

  useEffect(() => {
    console.log(formData);
    setErrors(validateForm(formData));
  }, [formData]);

  const EditProvider = async (formData: ProviderFormProps) => {
    console.log(formData);
    patchProvider(id ?? "", formData);
    setFormData({
      name: "",
      address: "",
      phone: "",
      city: "",
      facebook: "",
      whatsapp: "",
      messenger: "",
    });
  };

  const AddProvider = async (formData: ProviderFormProps) => {
    console.log(formData);
    postProvider(formData);
    setFormData({
      name: "",
      address: "",
      phone: "",
      city: "",
      facebook: "",
      whatsapp: "",
      messenger: "",
    });
  };

  const handleChange = (e: FormEvent<HTMLFormElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  };

  return (<>
    <div className={`custom-container`}>
      <h4>{newElement ? "Ajouter " : "Modifier "}un fournisseur</h4>
      <div className="mb-3">
        <FormLabel>Nom: </FormLabel>
        <FormControl
          type={"text"}
          value={formData.name}
          name={"name"}
          onChange={(e: any) => handleChange(e)}
        />
        <p className="text-danger">{!isValidate && errors["name"]}</p>
      </div>

      <div className="mb-3">
        <FormLabel>Ville: </FormLabel>
        <Form.Select
          value={formData.city}
          name={"city"}
          onChange={(e: any) => handleChange(e)}
        >
          <option value="">Choisir une ville</option>
          {cities.map((city) => (
            <option value={city}>{city}</option>
          ))}
        </Form.Select>
        <p className="text-danger">{!isValidate && errors["city"]}</p>
      </div>

      <div className="mb-3">
        <FormLabel>Adresse: </FormLabel>
        <FormControl
          type={"text"}
          value={formData.address}
          name={"address"}
          onChange={(e: any) => handleChange(e)}
        />
        <p className="text-danger">{!isValidate && errors["address"]}</p>
      </div>

      <div className="mb-3">
        <FormLabel>N° téléphone: </FormLabel>
        <FormControl
          type={"text"}
          value={formData.phone}
          name={"phone"}
          onChange={(e: any) => handleChange(e)}
        />
        <p className="text-danger">{!isValidate && errors["phone"]}</p>
      </div>

      <div className="mb-3">
        <FormLabel>E-mail: </FormLabel>
        <FormControl
          type={"text"}
          value={formData.email}
          name={"email"}
          onChange={(e: any) => handleChange(e)}
        />
        <p className="text-danger">{!isValidate && errors["email"]}</p>
      </div>

      <div className="mb-3">
        <FormLabel>N° Whatsapp: </FormLabel>
        <FormControl
          type={"text"}
          value={formData.whatsapp}
          name={"whatsapp"}
          onChange={(e: any) => handleChange(e)}
        />
        <p className="text-danger">{!isValidate && errors.whatsapp}</p>
      </div>

      <div className="mb-3">
        <FormLabel>Lien compte Facebook: </FormLabel>
        <FormControl
          type={"text"}
          value={formData.facebook}
          name={"facebook"}
          onChange={(e: any) => handleChange(e)}
        />
        <p className="text-danger">{!isValidate && errors["facebook"]}</p>
      </div>

      <div className="mb-3">
        <FormLabel>Lien compte Messenger: </FormLabel>
        <FormControl
          type={"text"}
          value={formData.messenger}
          name={"messenger"}
          onChange={(e: any) => handleChange(e)}
        />
        <p className="text-danger">{!isValidate && errors["messenger"]}</p>
      </div>

      <div className="mb-3">
        <FormLabel>Observation: </FormLabel>
        <FormControl
          type={"text"}
          value={formData.observation}
          name={"observation"}
          onChange={(e: any) => handleChange(e)}
        />
      </div>

      <div className="m-3">
        <FormLabel>Logo</FormLabel>
        <FormControl
          type={"file"}
          value={formData.logo}
          name={"logo"}
          onChange={(e: any) => {
            setFormData({
              ...formData,
              logo: e.target.files ? e.target.files[0].name : undefined,
            });
          }}
        />
      </div>

      <Button
        name="Submit"
        type="submit"
        disabled={!isValidate}
        className="m-3"
        onClick={() => {
          newElement ? AddProvider(formData) : EditProvider(formData);
        }}
      >
        Enregistrer
      </Button>
    </div>
    <ToastContainer position="bottom-right" />
  </>
  );
}
