import Label from "./label";
import "./categories.css";
import { useEffect, useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import axios from "axios";
import { Button } from "react-bootstrap";
import EditCategory from "./editCategory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CategoryProps {
  parent?: number;
  id: number;
  label: string;
  image: string;
}

export default function CategoriesSection() {
  const [categories, setCategories] = useState([] as CategoryProps[][]);
  const [selected, setSelected] = useState([] as number[]);
  const [data, setData] = useState({});
  const [isHidden, setIsHidden] = useState(true);

  const getCategories = async (id?: number, index?: number) => {
    let newCategories = [...categories];
    try {
      let response = id
        ? await axios.get("http://localhost:3001/categories")
        : await axios.get("http://localhost:3001/subcategories/" + id);
      if (index !== undefined) {
        newCategories[index + 1] = response.data;
      } else {
        newCategories[0] = response.data;
      }
      setCategories(newCategories);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="custom-container">
      <h1>Categories</h1>
      {categories.length !== 0 &&
        categories.map((catList, index) => (
          <div className="container">
            {Object.values(catList).map((cat) => {
              return (
                <div
                  key={cat.id}
                  style={{
                    width: "fit-content",
                    margin: "auto",
                    paddingBottom: "10px",
                  }}
                  onClick={() => {
                    let newSelected = [...selected];
                    if (categories.length > index + 1) {
                      newSelected.length = index + 1;
                      categories.length = index + 1;
                    }
                    newSelected[index] = cat.id;
                    setSelected(newSelected);
                    setCategories(categories);
                    if (newSelected.includes(cat.id))
                      getCategories(cat.id, index);
                  }}
                >
                  <Label
                    key={cat.id}
                    selected={selected.includes(cat.id)}
                    {...cat}
                  />
                </div>
              );
            })}
            <div
              className="icon"
              onClick={() => {
                setIsHidden(false);
                setData({ id: -1, parent: selected[index - 1] });
              }}
            >
              <GrAddCircle size={index === 0 ? 60 : 30} />
            </div>
          </div>
        ))}
      <div className="container">
        <Button
          variant="primary"
          disabled={selected.length === 0}
          onClick={() => {
            setIsHidden(false);
            setData({ id: selected[selected.length - 1] });
          }}
        >
          Modifier
        </Button>

        <Button
          variant="primary"
          disabled={selected.length === 0}
          onClick={async () => {
            try {
              await axios.delete(
                "http://localhost:3001/admin/categories/delete/" +
                  selected[selected.length - 1]
              );
              window.location.reload();
            } catch (err) {
              console.log(err);
            }
          }}
        >
          Supprimer
        </Button>
      </div>
      <EditCategory
        isHidden={isHidden}
        hide={() => setIsHidden(true)}
        {...data}
      />
      <ToastContainer position="bottom-right" />
    </div>
  );
}
