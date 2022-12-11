import { html, render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { initPath, catalogData, detailsData, dataSize, createData, deleteData, editData } from './data/data.js';
import {getUserDate, setUserDate, clearUserDate} from './util.js';
import {login, logout, register} from './api/user.js';
import {get, post, put, del} from './api/api.js';



export {
    html, render,
    page,    
    initPath, catalogData, detailsData, dataSize, createData, deleteData, editData,
    getUserDate, setUserDate, clearUserDate,
    login, logout, register,
    get, post, put, del,
};

export function validateData(data){
    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            data[key] = data[key].trim();
            if (data[key] == '') {
                return false;
            }            
        }
    }

    return data;
}
