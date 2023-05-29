import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {ProductProps} from "../../types/ProductProps";

export default function ProductCard({product}: {product: ProductProps}) {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    console.log(product);
  }, [product]);

  return (
    <div className="product-card">
      <img src={product.image?? "https://placehold.co/500x400"} alt={product.id} className="product-image" />
      <Card.Body style={{margin: "12px"}}>
        <Card.Title>
          <Link to={"pieces/" + product.id.toString()} style={{textDecoration: "none"}}>{product.piece}</Link>
        </Card.Title>

        <Card.Text>{product.price + " TND"}</Card.Text>
        <Card.Text>{product.category.label} </Card.Text>
        <Card.Text style={{fontWeight: "bold"}}>{product.cars.brand + " " + product.cars.model}
        </Card.Text>

      </Card.Body>
      <Card.Footer style={{marginLeft : "auto", marginTop:"-50px", cursor: "pointer"}} onClick={() => setIsClicked(!isClicked)}>
        {isClicked ? <AiFillHeart style={{color: "red"}} size={30} /> : <AiOutlineHeart size={30} />}
        </Card.Footer>
    </div>
  );
}
