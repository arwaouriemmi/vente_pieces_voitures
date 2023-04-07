import {FormEvent, useEffect, useState} from "react";
import {FormDataProps} from "./FormDataProps"
import {useParams} from "react-router-dom";
import {Button, Form, FormControl, FormLabel} from "react-bootstrap";
import {getData, postData} from "./utils";

export default function AddProviderPieceForm() {
    const [formData, setFormData] = useState<FormDataProps>({
        category: '',
        subCategory: '',
        piece: '',
        image: '',
        price: 0,
        description: '',
        constructorReference: '',
        comments: '',
        brand: '',
        model: '',
        motorization: ''
    })

    const [brands, setBrands] = useState<string[]>([]);
    const [disabledModel, setDisabledModel] = useState(true);
    const [models, setModels] = useState<string[]>([]);
    const [disabledMotorization, setDisabledMotorization] = useState(true)
    const [motorizations, setMotorizations] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [disabledSubCategory, setDisabledSubcategory] = useState(true)
    const [subCategories, setSubCategories] = useState<string[]>([]);
    const [disabledPiece, setDisabledPiece] = useState(true);
    const [pieces, setPieces] = useState<string[]>([])
    const {id} = useParams<{ id: string }>();
    const [isValidate, setIsValidate] = useState(true);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        console.log(formData);
        setErrors(validateForm(formData));
    }, [formData]);
    const handleChangeDetails = (e: FormEvent<HTMLFormElement>) => {
        const {name, value} = e.target as HTMLInputElement;
        setFormData({...formData, [name]: value});
    };
    const validateForm = (values: FormDataProps) => {
        const errors: { [key: string]: string } = {};
        if (values.description && values.description.length < 10) {
            errors.description = "⚠ La description doit contenir au moins 10 caractères !"
        }
        if (values.comments && values.comments.length < 5) {
            errors.comments = "⚠ Les commentaires doivent contenir au moins 5 caractères !"
        }
        if (values.price && values.price < 0) {
            errors.price = "⚠ Le prix ne peut pas être négatif !"

        }
        if (!values.brand ) {
            errors.brand = "⚠ Veuillez choisir la marque !"
        }
        if (!values.model) {
            errors.model = "⚠ Veuillez choisir le modéle !"
        }
        if (!values.motorization) {
            errors.motorization = "⚠ Veuillez choisir la génération !"
        }
        if (!values.category) {
            errors.category = "⚠ Veuillez choisir la catégorie !"
        }
        if (!values.subCategory) {
            errors.subCategory = "⚠ Veuillez choisir la sous catégorie !"
        }
        if (!values.piece) {
            errors.piece = "⚠ Veuillez choisir la piéce !"
        }

        if (errors.brand || errors.model || errors.motorization || errors.category || errors.subCategory|| errors.piece ||errors.description || errors.comments || errors.price ) {
            setIsValidate(false);
        } else {
            setIsValidate(true);
        }
        return errors
    }


    useEffect(() => {
        const getBrands = async (id: string) => {
            try {
                getData('provider/getbrands'+id,setBrands);
                setBrands(["uez", "dufg"])
            } catch (err) {
                console.log(err)
            }
        };
        if (id)
            getBrands(id)
    }, [id])
    useEffect(() => {
        const fetchModels = async () => {
            try {
                getData("provider/getmodelsbybrand/" + formData.brand, setModels);
                setModels(["ez", "dfhff"])
            } catch (err) {
                console.log(err)
            }
        };
        fetchModels();
    }, [formData.brand])
    useEffect(() => {
        const fetchMotorization = async () => {
            try {
                getData('provider/getmotorizationbymodel/' + formData.model, setMotorizations);
                setMotorizations(["fdggh", "fkggg"])
            } catch (err) {
                console.log(err)
            }
        };
        fetchMotorization();
    }, [formData.model])
    const handleChangeBrand = async (e: FormEvent<HTMLFormElement>) => {
        const {name, value} = e.target as HTMLInputElement;
        setFormData({...formData, [name]: value, motorization: '', model: ''});
        setDisabledModel(false);
        setDisabledMotorization(true);
    }
    const handleChangeModel = async (e: FormEvent<HTMLFormElement>) => {
        const {name, value} = e.target as HTMLInputElement;
        setFormData({...formData, motorization: '', [name]: value});
        setDisabledMotorization(false);
    }
    const handleChangeMotorization = async (e: FormEvent<HTMLFormElement>) => {
        const {name, value} = e.target as HTMLInputElement;
        setFormData({...formData, [name]: value});
    }
    const handleSubmit = async () => {
        console.log(formData)
        try {
            postData('provider/add', {
                ...formData,
            });
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        const fetchCategories = async (id: string) => {
            try {
                getData('provider/getcategories' + id, setCategories);
                setCategories(["uez", "dufg"])

            } catch (err) {
                console.log(err)
            }
        };
        if (id) {
            fetchCategories(id)
        }
    }, [id])
    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                getData("provider/getsubcategory/" + formData.category, setSubCategories);
                setSubCategories(["ez", "dfhff"])
            } catch (err) {
                console.log(err)
            }
        };
        fetchSubCategories();
    }, [formData.category])
    useEffect(() => {
        const fetchPieces = async () => {
            try {
                getData('provider/getpieces/' + formData.subCategory, setPieces);
                setPieces(["fdggh", "fkggg"])
            } catch (err) {
                console.log(err)
            }
        };
        fetchPieces();
    }, [formData.subCategory])
    const handleChangeCategory = async (e: FormEvent<HTMLFormElement>) => {
        const {name, value} = e.target as HTMLInputElement;
        setFormData({...formData, [name]: value, subCategory: '', piece: ''});
        setDisabledSubcategory(false);
        setDisabledPiece(true);
    }
    const handleChangeSubCategory = async (e: FormEvent<HTMLFormElement>) => {
        const {name, value} = e.target as HTMLInputElement;
        setFormData({...formData, piece: '', [name]: value});
        setDisabledPiece(false);
    }
    const handleChangePiece = async (e: FormEvent<HTMLFormElement>) => {
        const {name, value} = e.target as HTMLInputElement;
        setFormData({...formData, [name]: value});
    }
    return (
        <div className={`custom-container`} style={{
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            marginTop: '50px',
            height: '100%',
            width: '80%'
        }}>
            <fieldset style={{border: '2px solid ', margin: '20px', padding: '20px'}}>
                <legend style={{fontSize: '20px', padding: '20px'}}>Choisir une voiture</legend>
                <div className="mb-3">
                    <FormLabel>Marque</FormLabel>
                    <Form.Select
                        value={formData.brand}
                        name={"brand"}
                        onChange={(e: any) => handleChangeBrand(e)}
                        style={{marginLeft: '30px'}}
                    >
                        <option value="">Choisir une marque</option>
                        {brands.map((brand) => (
                            <option value={brand}>{brand}</option>
                        ))}
                    </Form.Select>
                    <p className="text-danger">{!isValidate && errors["brand"]}</p>
                </div>
                <div className="mb-3">
                    <FormLabel>Modèle</FormLabel>
                    <Form.Select
                        value={formData.model}
                        name={"model"}
                        onChange={(e: any) => handleChangeModel(e)}
                        disabled={disabledModel}
                        style={{marginLeft: '30px'}}
                    >
                        <option value="">Choisir un modèle</option>
                        {models && models.map((model) => (
                            <option value={model}>{model}</option>
                        ))}
                    </Form.Select>
                    <p className="text-danger">{!isValidate && errors["model"]}</p>
                </div>
                <FormLabel>Génération</FormLabel>
                <Form.Select
                    value={formData.motorization}
                    name={"motorization"}
                    onChange={(e: any) => handleChangeMotorization(e)}
                    disabled={disabledMotorization}
                    style={{marginLeft: '30px'}}
                >
                    <option value="">Choisir une génération</option>
                    {motorizations.map((motorization) => (
                        <option value={motorization}>{motorization}</option>
                    ))}
                </Form.Select>
                <p className="text-danger">{!isValidate && errors["motorization"]}</p>
            </fieldset>
            <fieldset style={{border: '2px solid ', margin: '20px', padding: '20px'}}>
                <legend style={{fontSize: '20px', padding: '20px'}}>Choisir une piéce</legend>
                <div className="mb-3">
                    <FormLabel>Catégorie</FormLabel>
                    <Form.Select
                        value={formData.category}
                        name={"category"}
                        onChange={(e: any) => handleChangeCategory(e)}
                        style={{marginLeft: '30px'}}
                    >
                        <option value="">Choisir une catégorie</option>
                        {categories.map((category) => (
                            <option value={category}>{category}</option>
                        ))}
                    </Form.Select>
                    <p className="text-danger">{!isValidate && errors["category"]}</p>
                </div>
                <div className="mb-3">
                    <FormLabel>Sous Catégorie </FormLabel>
                    <Form.Select
                        value={formData.subCategory}
                        name={"subCategory"}
                        onChange={(e: any) => handleChangeSubCategory(e)}
                        disabled={disabledSubCategory}
                        style={{marginLeft: '30px'}}
                    >

                        <option value="">Choisir une sous catégorie</option>
                        {subCategories.map((subCategory) => (
                            <option value={subCategory}>{subCategory}</option>
                        ))}
                    </Form.Select>
                    <p className="text-danger">{!isValidate && errors["subCategory"]}</p>
                </div>
                <div className="mb-3">
                    <FormLabel>Piéce</FormLabel>
                    <Form.Select
                        value={formData.piece}
                        name={"piece"}
                        onChange={(e: any) => handleChangePiece(e)}
                        disabled={disabledPiece}
                        style={{marginLeft: '30px'}}
                    >
                        <option value="">Choisir une piéce</option>
                        {pieces.map((piece) => (
                            <option value={piece}>{piece}</option>
                        ))}
                    </Form.Select>
                    <p className="text-danger">{!isValidate && errors["piece"]}</p>
                </div>
            </fieldset>
            <fieldset style={{border: '2px solid ', margin: '20px', padding: '20px'}}>
                <legend style={{fontSize: '20px', padding: '20px'}}>Saisir les détails de la piéce</legend>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <FormLabel style={{marginRight: '10px'}}> Image </FormLabel>
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
                        style={{width: '500px'}}
                    />
                </div>
                <div style={{display: 'flex', alignItems: 'center', paddingTop: '20px'}}>
                    <FormLabel style={{marginRight: '10px'}}>Prix</FormLabel>
                    <FormControl
                        type={"number"}
                        value={formData.price}
                        name={"price"}
                        onChange={(e: any) => handleChangeDetails(e)}
                        style={{width: '500px'}}
                    />
                    <p className="text-danger">{!isValidate && errors["price"]}</p>
                </div>
                <div style={{display: 'flex', alignItems: 'center', paddingTop: '20px'}}>
                    <FormLabel style={{marginRight: '10px'}}>Description</FormLabel>

                    <FormControl
                        type={"text"}
                        value={formData.description}
                        name={"description"}
                        onChange={(e: any) => handleChangeDetails(e)}
                        style={{width: '500px'}}
                    />
                </div>
                <p className="text-danger">{!isValidate && errors["description"]}</p>
                <div style={{display: 'flex', alignItems: 'center', paddingTop: '20px'}}>
                    <FormLabel style={{marginRight: '10px'}}>Référence du constructeur</FormLabel>

                    <FormControl
                        type={"text"}
                        value={formData.constructorReference}
                        name={"constructorReference"}
                        onChange={(e: any) => handleChangeDetails(e)}
                        style={{width: '500px'}}
                    />
                </div>
                <div style={{display: 'flex', alignItems: 'center', paddingTop: '20px'}}>
                    <FormLabel style={{marginRight: '10px'}}>Commentaires</FormLabel>
                    <FormControl
                        type={"text"}
                        value={formData.comments}
                        name={"comments"}
                        onChange={(e: any) => handleChangeDetails(e)}
                        style={{width: '500px'}}
                    />
                    <p className="text-danger">{!isValidate && errors["comments"]}</p>
                </div>
            </fieldset>
            <Button
                name="Submit"
                type="submit"
                disabled={!isValidate}
                onClick={() => {
                    handleSubmit()
                }}
                style={{marginRight: '900px', marginLeft: '20px'}}
            >
                Enregistrer la piéce
            </Button>
        </div>
    )
}