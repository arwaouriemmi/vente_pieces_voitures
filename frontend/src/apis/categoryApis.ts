import { deleteData, getData, patchData, postData } from "./generic"

// route (/categories) : get all categories
// route (/subcategories/:id) : get all subcategories by category id
const getCategoriesFromApi = async (id?: number) => {
    try {
      let data = id
        ? await getData("categories/subcategories/" + id)
        : await getData("categories")
    return data
    } catch (error) {
        console.log(error);
    }
};

const getCategoryFromApi = async (id: number) => {
    try {
        let data = await getData("categories/" + id);
        return data;
    } catch (error) {
        console.log(error);
    }
};

const postCategory = async (data: any) => {
    try {
        await postData("categories/add", data);
    } catch (error) {
        console.log(error);
    }
};

const patchCategory = async (id:number, data: any) => {
    await patchData("categories/update/" + id, data);
}

const deleteCategory = async (id: number) => {
    await deleteData("categories/delete/", id)
}

export { getCategoriesFromApi, getCategoryFromApi, postCategory, patchCategory, deleteCategory };