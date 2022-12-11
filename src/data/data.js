import { get, post, put, del } from '../lib.js';

let path = '';
let endpoints = {};

export function initPath(basePath) {
    path = basePath;

    endpoints.catalog = `${path}?sortBy=_createdOn%20desc`;
    endpoints.create = `${path}`;
    endpoints.count = `${path}?count`;
    endpoints.details = (id) => `${path}/${id}`;
    endpoints.delete = (id) => `${path}/${id}`;
    endpoints.edit = (id) => `${path}/${id}`;
}

export async function catalogData() {
    return get(endpoints.catalog);
}

export async function detailsData(id) {
    return get(endpoints.details(id));
}

export async function dataSize() {
    return get(endpoints.count);
}

export async function createData(data) {
    return post(endpoints.create, data);
}

export async function deleteData(id) {
    return del(endpoints.delete(id));
}

export async function editData(id, data) {
    return put(endpoints.edit(id), data);
}