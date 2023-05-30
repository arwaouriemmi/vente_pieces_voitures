import { getData, postData } from "./generic";

const getPiecesFromApi = async (page?: number) => {
  try {
    let data = await getData("pieces?page=" + page);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getPieceByIdFromApi = async (id: string) => {
  try {
    let data = await getData("pieces/" + id);
    return data;
  } catch (error) {
    console.log(error);
  }
}

//Get all pieces if 
const searchPieces = async (formData: any, sortBy: any) => {
  try {
  
  let data = await getData(
      "pieces/search?"+"brand=" +
        formData.brand +
        "&model=" +
        formData.model +
        "&motorization=" +
        formData.motorization +
        "&sortBy=" +
        sortBy
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
const searchPiecesByCategory=async (id:any)=>{
  try{
    let data=await getData("pieces/search/category/"+id);
  }
  catch (error) {
    console.log(error);
  }
}
const searchPiecesBySubCategory=async (id:any)=>{
  try{
    let data=await getData("pieces/search/subcategory/"+id);
  }
  catch (error) {
    console.log(error);
  }
}

const postPiece = async (data: any) => {
  try {
    postData("pieces/add", data);
  } catch (err) {
    console.log(err);
  }
  
};  

export { searchPieces, postPiece, getPieceByIdFromApi, getPiecesFromApi,searchPiecesByCategory,searchPiecesBySubCategory };
