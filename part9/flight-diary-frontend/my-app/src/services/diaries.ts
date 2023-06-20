import axios from 'axios';
import { DiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api'

const getAll = async() => {
    const { data } = await axios.get<DiaryEntry[]>(
        `${baseUrl}/diaries`
    );

    return data;
}

export default {
    getAll
}