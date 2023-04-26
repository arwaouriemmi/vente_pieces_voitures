import { deleteData, getData, patchData, postData } from "./generic"

const getCarsFromApi = async (page?: number) => {
    try {
      let data = await getData("cars?page=" + page)
    return data
    } catch (error) {
        console.log(error);
    }
};

const getCarByIdFromApi = async (id: string) => {
    try {
        let data = await getData("cars/" + id)
        return data
    } catch (error) {
        console.log(error);
    }
};

const getCarBrands = async () => {
    try {
        let data = await getData("cars/brands")
        return data
    } catch (error) {
        console.log(error);
    }
};

const getCarModels = async (brand: string) => {
    try {
        let data = await getData("cars/models/" + brand)
        return data
    } catch (error) {
        console.log(error);
    }
};

const getCarMotorization = async (brand: string, model: string) => {
    try {
        let data = await getData("cars/motorization?brand=" + brand + "&model=" + model)
        return data
    } catch (error) {
        console.log(error);
    }
};

const postCar = async (data: any) => {
    try {
        postData("cars/add", data);
    } catch (error) {
        console.log(error);
    }
};

const patchCar = async (id: string, data: any) => {
    patchData("cars/edit/" + id, data);
}

const deleteCar = async (id: string) => {
    deleteData("cars/delete/", id)
}

export { getCarsFromApi, getCarByIdFromApi, getCarBrands, getCarModels, getCarMotorization, postCar, patchCar, deleteCar };