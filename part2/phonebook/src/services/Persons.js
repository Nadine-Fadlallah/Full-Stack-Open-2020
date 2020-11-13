import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

// returns all the persons' data in our backend
const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

// return the added person's data in our backend
const create = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then((response) => response.data);
};

const deleteContact = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request
}

// return the updated person's data
const update = (id, updatedObj) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedObj)
    return request.then(response => response.data)
}

export default { getAll, create, deleteContact, update };
