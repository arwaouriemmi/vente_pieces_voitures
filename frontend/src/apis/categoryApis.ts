import { deleteData, getData, patchData, postData } from "./generic"

// route (/categories) : get all categories
// route (/subcategories/:id) : get all subcategories by category id
const getCategoriesFromApi = async (id?: number) => {
    try {
      let data = id
        ? await getData("categories")
        : await getData("subcategories/" + id);
        return data
    } catch (error) {
        console.log(error);
    }
};

const postCategory = async (data: any) => {
    try {
        postData("categories/add", data);
    } catch (error) {
        console.log(error);
    }
};

const patchCategory = async (id:number, data: any) => {
    patchData("categories/edit/" + id, data);
}

const deleteCategory = async (id: number) => {
    deleteData("categories/delete/", id)
}

export { getCategoriesFromApi, postCategory, patchCategory, deleteCategory };