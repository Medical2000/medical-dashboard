import { TOKEN_KEY } from "../constants/appconstants";
import { IUserLogin } from "../interface/auth";
import ApiClient from "./axios";
import { LOGIN_API } from "./baseApi";


export async function authProviders({ user_name, password }: IUserLogin) {
  try {
    const response = await ApiClient.post(LOGIN_API, { user_name, password });
    if (response.status === 200) {
      localStorage.setItem(TOKEN_KEY, response.data.token);
    }
    return response.data;
  } catch (error) {
    throw (error)
  }
}