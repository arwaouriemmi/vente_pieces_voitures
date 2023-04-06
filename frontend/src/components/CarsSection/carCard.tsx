import { Card, Col, Row } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import CarProps from "./carProps";

export default function CarCard({
  id,
  brand,
  model,
  createdAt,
  motorization,
}: CarProps) {
  const deleteCar = (id: string) => {
    axios.delete("http://localhost:3001/admin/cars/delete/" + id.toString());
  };

  return (
    <Col sm={4}>
      <Card>
        <Card.Body>
          <Card.Text className="text-muted" style={{ fontSize: 12, margin: 1 }}>
            id: {id}
          </Card.Text>
          <Card.Title>
            {brand} {model}
          </Card.Title>
          <Card.Text>{motorization}</Card.Text>
          <Card.Text className="text-muted" style={{ fontSize: 12 }}>
            Ajouté le {createdAt.slice(0, 10)} à {createdAt.slice(11, 16)}
          </Card.Text>
          <Row>
            <Link
              to={"/admin/cars/edit/" + id}
              className="btn btn-primary col-sm"
            >
              Modifier
            </Link>
            <Card.Link
              className="btn btn-info col-sm"
              onClick={() => {
                deleteCar(id);
              }}
            >
                Supprimer
            </Card.Link>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}
