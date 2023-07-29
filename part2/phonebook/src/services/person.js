import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const add = (personObject) => {
   const request = axios.post(baseUrl, personObject)
   return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(()=> alert('user deleted'))
}

const personService = {getAll, add, deletePerson}

export default personService