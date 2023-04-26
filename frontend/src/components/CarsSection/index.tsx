import { Nav, Row, Pagination } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { GrAddCircle } from "react-icons/gr";
import CarProps from "../../types/carProps";
import CarCard from "./carCard";
import { getData } from "../../apis/generic";
import { getCarsFromApi } from "../../apis/carApis";

export default function CarsSection({ pageNumber }: { pageNumber: number }) {
  const [searchParams] = useSearchParams();
  const [cars, setCars] = useState<CarProps[]>([]);
  const [page, setPage] = useState(
    searchParams.get("page") ? parseInt(searchParams.get("page") ?? "1") : 1
  );

  useEffect(() => {
    getCarsFromApi(page).then((res) => {
      setCars(res.data);
    });
  }, [page]);

  return (<>
    <div className="custom-container">
      <h1>
        Voitures
        <Link
          to="/admin/cars/add"
          style={{ marginLeft: "auto", cursor: "pointer" }}
        >
          <GrAddCircle size={30} />
        </Link>
      </h1>
      <Row>
        {cars.map((car) => {
          return <CarCard {...car} />;
        })}
      </Row>

      <Nav>
        <Pagination style={{ margin: "auto" }}>
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
    </div>
  </>
  );
}
