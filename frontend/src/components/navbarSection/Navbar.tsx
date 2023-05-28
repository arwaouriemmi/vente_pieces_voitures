import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import NavbarProps from '../../types/NavbarProps';
import ProviderProps from "../../types/ProviderProps";
import { getData } from '../../apis/generic';
import "./Navbar.css";

const provider1 = {
    id: "1",
    name: "eya raouine",
    email: "eya.raouine@gmail.com",
    phone: "98100686",
    whatsapp: "98100686",
    address: "lot n°184",
    city: "ariana",
    facebook: "https://eya/facebook.com",
    logo: "https://picsum.photos/300",
    createdAt: Date.now().toLocaleString(),
};

export default function NavbarSection({ isAuthentificated, role, id }: NavbarProps) {

    const linkStyle = {
        color: "white", opacity: 0.9, margin: "0 40px",
    };
    const [provider, setProvider] = useState<ProviderProps>({
        id: id ?? "",
        name: "",
        logo: "",
        city: "",
        address: "",
        email: "",
        phone: "",
        whatsapp: "",
        facebook: "",
        messenger: "",
        observation: "",
        createdAt: "",
        deletedAt: "",
    });
    useEffect(() => {
        if (id) {
            getData("providers/" +id, setProvider)
            setProvider(provider1)
        }
    }, [id])

    return (
        <Navbar bg="primary" variant="dark" expand="lg">
            <Navbar.Brand as={Link} to="/">
                <img
                    src="../logo_app.jpg"
                    width="45"
                    height="40"
                    className="d-inline-block align-top rounded-circle "
                    alt="mon logo"
                    style={{ marginLeft: "20px" }}
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {isAuthentificated && role == 'admin' ? (
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/admin/home" style={linkStyle}>Acceuil</Nav.Link>
                        <Nav.Link as={Link} to="/admin/categories" style={linkStyle}>Catégories</Nav.Link>
                        <Nav.Link as={Link} to="/admin/cars" style={linkStyle}>Voitures</Nav.Link>
                        <Nav.Link as={Link} to="/admin/providers" style={linkStyle}>Fournisseurs</Nav.Link>
                        <Nav.Link as={Link} to="/login" style={linkStyle} onClick={() => localStorage.removeItem("token")}>Se déconnecter</Nav.Link>
                    </Nav>
                ) : isAuthentificated && role == 'provider' ? (<Nav className="ml-auto">
                 
                    <Nav.Link as={Link} to="/" style={linkStyle} >Acceuil</Nav.Link>
                    <Nav.Link as={Link} to={`/providers/${id}/pieces`} style={linkStyle} >Pièces</Nav.Link>
                    <Nav.Link as={Link} to="/pieces/add" style={linkStyle}>Ajouter une pièce</Nav.Link>
                    <NavDropdown title={<img src={provider.logo ? provider.logo : "../placeholder.jpg"} className="rounded-circle d-inline-block align-top" width="32" height="32" />} align="end">
                        <NavDropdown.Item as={Link} to={`/providers/${id}`}>Consulter votre profil</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to="/login" onClick={() => localStorage.removeItem("token")}>Se déconnecter</NavDropdown.Item>
                    </NavDropdown>
                </Nav>) : !isAuthentificated && (<Nav className="ml-auto">
                    <Nav.Link as={Link} to="/" style={linkStyle}>Acceuil</Nav.Link>
                    <Nav.Link as={Link} to="#" style={linkStyle}>À propos</Nav.Link>
                    <Nav.Link as={Link} to="/login" style={linkStyle}>Se Connecter</Nav.Link>
                </Nav>)}
            </Navbar.Collapse>
        </Navbar>
    );
}

