import { useState } from "react";
import axios from "axios";
import { LoginProps } from "../../types/LoginProps";
import { useNavigate } from "react-router-dom";
import { TokenPayloadProps } from "../../types/TokenPayloadProps";
import jwt_decode from "jwt-decode";

export default function SignIn() {

    const [user, setUser] = useState<LoginProps>({
        username: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState<string>("");
    let navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post("http://localhost:3001/auth/login", user)
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                const decodedToken = jwt_decode<TokenPayloadProps>(response.data.token);
                const { user } = decodedToken;
                if (user.role === "admin") {
                    navigate("/admin/home");
                } else if (user.role === "provider") {
                    navigate("/");
                }
            })
            .catch((error) => {
                setErrorMessage(error.response.data.message);
            });
    };

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    };



    return (<section className="vh-100 gradient-custom" style={{ backgroundImage: 'url("../background.png")' }}>
        <div className="container py-5 d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-light text-primary" style={{ borderRadius: '1rem' }}>
                    <div className="card-body p-5 text-center">

                        <div className="mb-md-5 mt-md-4 pb-5">

                            <h2 className="fw-bold mb-2 text-uppercase">Connexion</h2>
                            <p className="text-primary-50 mb-5">Entrez votre login et votre mot de passe !</p>

                            <div className="form-outline form-primary mb-4">
                                <label className="form-label" htmlFor="typeEmailX">Email</label>
                                <input type="email" id="typeEmailX" className="form-control form-control-lg"
                                    value={user.username} onInput={handleInputChange} />

                            </div>

                            <div className="form-outline form-primary mb-4">
                                <label className="form-label" htmlFor="typePasswordX">Password</label>
                                <input type="password" id="typePasswordX" value={user.password}
                                    className="form-control form-control-lg" onInput={handleInputChange} />
                            </div>

                            {errorMessage && <p className="text-danger">{errorMessage}</p>}

                            <button className="btn btn-outline-primary " style={{ marginTop: '70px' }} type="submit" onClick={(e) => handleSubmit }>Se connecter
                            </button>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>)

}

