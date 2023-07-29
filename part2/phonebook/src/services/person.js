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

const update = (personObject) => {
    const request = axios.put(`${baseUrl}/${personObject.id}`, personObject )
    return request.then(()=> alert(`user ${personObject.name} modified`))
}

const personService = {getAll, add, deletePerson, update}

export default personService