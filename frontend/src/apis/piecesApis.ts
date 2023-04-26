import { getData, postData } from "./generic";

const searchPieces = async (formData: any, sortBy: any) => {
  try {
    let data = await getData(
      "search?brand=" +
        formData.brand +
        "&model=" +
        formData.model +
        "&motorization=" +
        formData.motorization +
        "&sortby=" +
        sortBy
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const postPiece = async (data: any) => {
  try {
    postData("pieces/add", data);
  } catch (err) {
    console.log(err);
  }
};  

export { searchPieces, postPiece };
