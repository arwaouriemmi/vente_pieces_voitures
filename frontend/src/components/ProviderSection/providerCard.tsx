import { Card, Col, Row } from "react-bootstrap";
import ProviderProps from "../../types/ProviderProps";
import axios from "axios";
import { Link } from "react-router-dom";
import { deleteData, getData } from "../../utils";

export default function ProviderCard({ 
    id,
    name,
    logo,
    city,
    address,
    deletedAt,
    createdAt
}: ProviderProps) {

    const deleteProvider = (id: string) => {
        deleteData("providers/delete/", id.toString())
    }

    const restoreProvider = (id: string) => {
        getData("providers/restore/"+ id.toString())
    }

    return (
        <Col sm={6}>
            <Card>
                <div className="container">
                <div style={{margin: "auto"}}>
                    <Card.Img variant="left" src={logo ?? "https://via.placeholder.com/150"}
                 style={{borderRadius: 9999, height: 110}} />
               </div>   
               <Card.Body>
                    <Card.Text className="text-muted" style={{fontSize: 12, margin: 1}}>
                        Numéro de matricule: { id }
                    </Card.Text>
                    <Card.Title>{ name }</Card.Title>
                    <Card.Text>
                        { address }<br/>
                        { city }
                    </Card.Text>
                    <Card.Text className="text-muted" style={{fontSize: 12}}>
                        Ajouté le { createdAt.slice(0,10) } à { createdAt.slice(11,16) }
                    </Card.Text>
                    {
                        deletedAt &&
                        <Card.Text className="text-muted" style={{fontSize: 12}}>
                            Bloqué le { deletedAt.slice(0,10) } à { deletedAt.slice(11,16) }
                        </Card.Text>
                    }
                    <Row>
                    <Link to={"/admin/providers/edit/" + id} className="btn btn-primary col-sm">Modifier</Link>
                    <Card.Link className="btn btn-info col-sm" onClick={()=>{deletedAt ? restoreProvider(id) : deleteProvider(id)}}>{deletedAt? "Activer" : "Bloquer"}</Card.Link>
                    </Row>
                </Card.Body>
                </div>
            </Card>
        </Col>
    );
}
