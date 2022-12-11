import { clearUserDate, setUserDate } from "../util.js";
import { get, post } from "./api.js";

export async function login(email, password){
    const result = await post('/users/login', {email, password});

    const userData = setDate(result);

    setUserDate(userData);

    return userData;
}

export async function register(email, password){
    const result = await post('/users/register', {email, password});
    const userData = setDate(result);

    setUserDate(userData);

    return userData;
}

export async function logout(){
    get('/users/logout');
    clearUserDate();    
}

function setDate(date){
    const userData = {
        id: date._id,
        email: date.email,
        accessToken: date.accessToken,
    }

    return userData;
}