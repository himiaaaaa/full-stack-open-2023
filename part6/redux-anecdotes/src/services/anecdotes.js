/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getId = () => (100000 * Math.random()).toFixed(0)

const createNew = async (content) => {
    const object = {content, id: getId(), votes: 0}
    const response = await axios.post(baseUrl, object)
    return response.data
}

export default { getAll, createNew }