import axios from 'axios'
import { DiaryEntry } from './types'

const baseUrl = 'http://localhost:3005/api/diaries'

export const getAllDiaryEntry = () => {
  return axios
    .get<DiaryEntry[]>(`${baseUrl}/all`)
    .then((response) => response.data)
}
