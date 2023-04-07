import {useState} from "react";
import axios from "axios";

export default function SignIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (<section className="vh-100 bg-primary" style={{backgroundImage: 'url("../images/img.png")'}}>
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card bg-light text-primary" style={{borderRadius: '1rem'}}>
                        <div className="card-body p-5 text-center">

                            <div className="mb-md-5 mt-md-4 pb-5">

                                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                <p className="text-primary-50 mb-5">Please enter your login and password!</p>

                                <div className="form-outline form-primary mb-4">
                                    <label className="form-label" htmlFor="typeEmailX">Email</label>
                                    <input type="email" id="typeEmailX" className="form-control form-control-lg"
                                           value={email} onInput={(e) => {
                                        const target = e.target as HTMLInputElement;
                                        setEmail(target.value);
                                    }}/>

                                </div>

                                <div className="form-outline form-primary mb-4">
                                    <label className="form-label" htmlFor="typePasswordX">Password</label>
                                    <input type="password" id="typePasswordX" value={password}
                                           className="form-control form-control-lg" onInput={(e) => {
                                        const target = e.target as HTMLInputElement;
                                        setPassword(target.value);
                                    }}/>

                                </div>

                                <button className="btn btn-outline-primary btn-lg px-5" type="submit" onClick={(e) => {
                                    axios.post('/fournisseur/login', {
                                        email,
                                        password
                                    }).then((res) => {
                                        //traitement de la reponse
                                    }).catch((err) => {
                                        //traitement de l'erreur
                                        console.log(err);
                                    })
                                }}
                                >Login
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>)

}

