import axios from 'axios';
import { getUrl, headers } from './API';

export function getTodoById(id) {
  return axios.get(getUrl(`todo/${id}`), { headers }).then(res => res.data);
}

export function setTodo(body) {
  return axios.post(getUrl(`todo`), body, { headers }).then(res => res.data);
}

export function updateTodo(body) {
  return axios.put(getUrl(`todo`), body, { headers }).then(res => res.data);
}

export function deleteTodo(id) {
  return axios.delete(getUrl(`todo/${id}`), { headers }).then(res => res.data);
}
