import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProviderProps from "../../types/ProviderProps";
import { getData } from "../../utils";

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

export default function ProviderDetails() {
  const { id } = useParams<{ id: string }>();
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
    getData("providers/" + id, setProvider);
  }, []);

  return (
    <div
      className="container"
      style={{ display: "flex", flexDirection: "row", paddingTop: "100px" }}
    >
      <div className="image-profile" style={{ flex: 1 }}>
        {provider.logo ? (
          <img
            src={provider.logo}
            className="img-fluid rounded-circle "
            style={{ width: "300px" }}
            alt=""
          />
        ) : (
          <img
            src="../images/placeholder.png"
            className="img-fluid rounded-circle "
            style={{ width: "300px" }}
          />
        )}
      </div>
      <div className="credentials" style={{ flex: 2, paddingLeft: "20px" }}>
        <ul style={{ listStyle: "none", paddingTop: "70px" }}>
          <li style={{ paddingBottom: "30px" }}>
            <h1 className="text-4xl font-bold">
              {provider.name.charAt(0).toUpperCase() + provider.name.slice(1)}{" "}
            </h1>
          </li>
          <li style={{ paddingBottom: "30px" }}>
            <i
              className="fa fa-phone"
              style={{ color: "#34A853", paddingRight: "3px" }}
            ></i>{" "}
            {provider.phone}
          </li>
          <li style={{ paddingBottom: "30px" }}>
            <i
              className="fa-brands fa-whatsapp"
              style={{
                color: "#34A853",
                paddingRight: "3px",
                fontSize: "23px",
              }}
            ></i>
            {provider?.whatsapp ? provider?.whatsapp : "Non Fourni"}
          </li>
          <li style={{ paddingBottom: "30px" }}>
            <i
              className="fa-brands fa-facebook"
              style={{ color: "#405DE6", paddingRight: "3px" }}
            ></i>{" "}
            {provider?.facebook ? (
              <a href={provider?.facebook}>Lien Facebook</a>
            ) : (
              "Non Fourni"
            )}
          </li>
          <li style={{ paddingBottom: "30px" }}>
            <i
              className="fa-brands fa-facebook-messenger"
              style={{ color: "#405DE6", paddingRight: "3px" }}
            ></i>
            {provider.messenger ? (
              <a href={provider.messenger}>Lien Messenger</a>
            ) : (
              "Non Fourni"
            )}
          </li>
          <li style={{ paddingBottom: "30px" }}>
            <a href="mailto:johndoe@gmail.com">
              <i
                className="fa fa-envelope"
                style={{
                  color: "#EA4335",
                  fontSize: "15px",
                  paddingRight: "3px",
                }}
              ></i>
              {provider?.email ? provider.email : "Non Fourni"}
            </a>
          </li>

          <li style={{ paddingBottom: "20px" }}>
            <i
              className="fas fa-map-marker-alt"
              style={{ paddingRight: "3px", color: "#ffa500" }}
            ></i>
            {provider.address}, {provider.city}
          </li>
          <li style={{ paddingBottom: "20px" }}>
            <i
              className="fa-solid fa-comment"
              style={{ paddingRight: "3px" }}
            ></i>
            {provider.observation
              ? provider.observation
              : "Aucune observation disponible"}
          </li>
          <li>
            <Link to="/login" className="focus-visible:outline-none">
              <button className="btn-sm btn-primary text-sm" type="submit">
                <i className="fa-sharp fa-regular fa-eye"></i>Voir les piéces
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
