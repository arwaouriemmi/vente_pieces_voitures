import { deleteData, getData, patchData, postData } from "./generic";

const getProvidersFromApi = async (active: string, page?: number) => {
  try {
    let data = await getData("providers?active=" + active + "&page=" + page);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getProviderByIdFromApi = async (id: string) => {
  try {
    let data = await getData("providers/" + id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getProviderDeleted = async (id: string) => {
  try {
    let data = await getData("providers/all/" + id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const postProvider = async (data: any) => {
  try {
    postData("providers/add", data);
  } catch (error) {
    console.log(error);
  }
};

const patchProvider = async (id: string, data: any) => {
  patchData("providers/edit/" + id, data);
};

const deleteProvider = async (id: string) => {
  deleteData("providers/delete/", id);
};

const restoreProvider = async (id: string) => {
  getData("providers/restore/" + id);
};

export {
  getProvidersFromApi,
  getProviderByIdFromApi,
  postProvider,
  patchProvider,
  deleteProvider,
  restoreProvider,
  getProviderDeleted,
};
