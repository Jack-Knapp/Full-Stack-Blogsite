import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: {Authorization: token},
  }

  const response = await axios.post(baseUrl, newObject, config)
  //console.log(response.data)
  return response.data
}

const update = async newObject => {
  console.log(newObject)

  const response = await axios.put(baseUrl + `/${newObject.id}`, newObject)
  console.log(response.data)
  return response.data
 
}

const addComment = async newObject => {
  console.log('In the service')
  console.log(newObject)
  const response = await axios.post(baseUrl + `/${newObject.id}/comments`, newObject)
  console.log(response.data)
  return response.data
}

const remove = async newObject => {
  //console.log(newObject.blog.id)
  const response = await axios.delete(`${baseUrl}/${newObject.id}`)
  //console.log(`This is the response for a delete ${response.data}!`)
  return response.data
}

export default { getAll, create, setToken, update, addComment, remove }