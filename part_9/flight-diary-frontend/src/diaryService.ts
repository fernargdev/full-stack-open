import axios from 'axios'
import { DiaryEntry, NewDiaryEntry } from './types'

const baseUrl = 'http://localhost:3005/api/diaries'

export const getAllDiaryEntry = () => {
  return axios.get<DiaryEntry[]>(`${baseUrl}/all`).then((res) => res.data)
}

export const createDiaryEntry = (object: NewDiaryEntry) => {
  return axios.post<DiaryEntry>(`${baseUrl}`, object).then((res) => res.data)
}
