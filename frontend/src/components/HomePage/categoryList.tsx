import Label from "./label";
import "../CategoriesSection/categories.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Row } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css'


interface CategoryProps {
  parent?: number;
  id: number;
  label: string;
  image: string;
}

export default function CategoriesList() {
  const [categories, setCategories] = useState([] as CategoryProps[][]);
  const [selected, setSelected] = useState([] as number[]);

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
    console.log(categories);
  }, []);

  return (
    <div>
      {categories.length !== 0 &&
        categories.map((catList, index) => (<Row>
          <Slide
          slidesToShow={catList.length < 4? catList.length : 5}>
            {Object.values(catList).map((cat) => {
              return (
                <div
                  key={cat.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundSize: 'cover',
                    height: '100px'
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
                  } }
                >
                  <Label
                    key={cat.id}
                    selected={selected.includes(cat.id)}
                    {...cat} />
                </div>
              );
            })}
          
          </Slide>
        </Row>
        ))}
    </div>
  );
}