import { Nav, Card, Row, Pagination } from "react-bootstrap";
import ProviderProps from "../../types/ProviderProps";
import ProviderCard from "./providerCard";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { GrAddCircle } from "react-icons/gr";
import { getData } from "../../utils";

export default function ProviderSection({
  pageNumber,
}: {
  pageNumber: number;
}) {
  const [searchParams] = useSearchParams();
  const [providers, setProviders] = useState<ProviderProps[]>([]);
  const [active, setActive] = useState(searchParams.get("active") ?? "all");
  const [page, setPage] = useState(
    searchParams.get("page") ? parseInt(searchParams.get("page") ?? "1") : 1
  );

  useEffect(() => {
    getData("providers?active=" + active + "&page=" + page, setProviders);
  }, [active, page]);

  return (
    <div className="custom-container">
      <h1>Fournisseurs</h1>
      <Card>
        <Card.Header>
          <Nav variant="tabs">
            <Nav.Item
              onClick={() => {
                setActive("all");
              }}
            >
              <Nav.Link active={active === "all"}>Tous</Nav.Link>
            </Nav.Item>
            <Nav.Item
              onClick={() => {
                setActive("actifs");
              }}
            >
              <Nav.Link active={active === "actifs"}>Actifs</Nav.Link>
            </Nav.Item>
            <Nav.Item
              onClick={() => {
                setActive("bloques");
              }}
            >
              <Nav.Link active={active === "bloques"}>Bloqués</Nav.Link>
            </Nav.Item>
            <Link to="/admin/providers/add" 
              style={{ marginLeft: "auto", cursor: "pointer" }}
            >
              <GrAddCircle size={30} />
            </Link>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Row>
            {providers.map((provider) => {
              return <ProviderCard {...provider} />;
            })}
          </Row>
        </Card.Body>

        <Card.Footer>
        <Nav style={{marginLeft: "30%"}}>
        <Pagination>
          <Pagination.Prev
            disabled={page === 1}
            onClick={() => {
              setPage(page - 1);
            }}
          />
          {Array.from({ length: pageNumber }, (_, i) => (
            <Pagination.Item
              key={i}
              active={i + 1 === page}
              onClick={() => {
                setPage(i + 1);
              }}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={page === pageNumber}
            onClick={() => {
              setPage(page + 1);
            }}
          />
        </Pagination>
      </Nav>
        </Card.Footer>
      </Card>
    </div>
  );
}
