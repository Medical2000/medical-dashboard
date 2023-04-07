export const TOKEN_KEY = "token";



export const removeToken = () => {
    return localStorage.removeItem(TOKEN_KEY);
  };
  