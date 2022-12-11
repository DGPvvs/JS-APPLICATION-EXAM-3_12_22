import { clearUserDate, getUserDate } from "../util.js";

const host = 'http://localhost:3030';

async function request(url, method, data) {
    const options = {
        method,
        headers: {},
    }

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);        
    }

    const userDate = getUserDate();

    if (userDate) {
        options.headers['X-Authorization'] = userDate.accessToken;        
    }

    try {
        const res = await fetch(host + url, options);

        if (!res.ok) {
            if (res.status == 403) {
                clearUserDate();            
            }
            const err = await res.json();
            throw new Error(err.message);
        }

        if (res.status == 204) {
            return res;
        }

        return res.json();

    } catch (err) {
        alert(err.message);
        throw err;
    }
}

export async function get(url){
    return await request(url, 'get');
}

export async function post(url, data){
    return await request(url, 'post', data);
}

export async function put(url, data){
    return await request(url, 'put', data);
}

export async function del(url){
    return await request(url, 'delete');
}