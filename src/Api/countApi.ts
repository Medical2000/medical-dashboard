import ApiClient from "./axios";
import { COUNT_API } from "./baseApi";



export const getCountUser = async () => {
    try {
        const response = await ApiClient.get(COUNT_API.GET_USER);
        return response.data
    } catch (error: any) {
        console.log(error)
    }
}
