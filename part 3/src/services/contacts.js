import axios from "axios";

const Base_URL = "api/persons";

const getContacts = () => {
    const response = axios.get(Base_URL)
    return response.then(response => response.data);
}

const postContact = newContact => {
    const response = axios.post(Base_URL, newContact)
    return response.then(response => response.data);
}

const deleteContact = id => {
    const data = axios.delete(`${Base_URL}/${id}`);
    return data.then(response => response.data)
}

const updateContact = (id, newContact) => {
    const data = axios.put(`${Base_URL}/${id}`, newContact)
    return data.then(response => response.data);
}

export default {
  getContacts,
  postContact,
  deleteContact,
  updateContact,
};