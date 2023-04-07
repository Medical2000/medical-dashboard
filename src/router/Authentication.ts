import {TOKEN_KEY} from "../constants/appconstants";

class Authentication{
    constructor(){

    }

    isAuthentication(){
        const token = localStorage.getItem(TOKEN_KEY)
        
        return token
    }
}

const authentication = new Authentication();

export {authentication};