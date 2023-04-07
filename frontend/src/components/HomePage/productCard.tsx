import { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const piece = {
  id: 1,
  title: "Pièce 1",
  image: "https://picsum.photos/200/300",
  provider: "Fournisseur 1",
  price: 100,
  location: "Tunis",
};

export default function ProductCard() {
  const [isClicked, setIsClicked] = useState(false);
  
  return (
    <div className="product-card">
      <img src={piece.image} alt={piece.title} className="product-image" />
      <Card.Body style={{margin: "12px"}}>
        <Card.Title>
          <Link to={"spare-parts/" + piece.id.toString()} style={{textDecoration: "none"}}>{piece.title}</Link>
        </Card.Title>

        <Card.Text>{piece.price + " TND"}</Card.Text>
        <Card.Text>{piece.location} </Card.Text>
        <Card.Text style={{fontWeight: "bold"}}>{piece.provider}
        </Card.Text>

      </Card.Body>
      <Card.Footer style={{marginLeft : "auto", marginTop:"-50px", cursor: "pointer"}} onClick={() => setIsClicked(!isClicked)}>
        {isClicked ? <AiFillHeart style={{color: "red"}} size={30} /> : <AiOutlineHeart size={30} />}
        </Card.Footer>
    </div>
  );
}
