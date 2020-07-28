import axios from 'axios';
import { getUrl, headers } from './API';

export function getFrames() {
  return axios.get(getUrl('frames'), { headers }).then(res => res.data);
}

export function getFrameById(id) {
  return axios.get(getUrl(`frame/${id}`), { headers }).then(res => res.data);
}

export function setFrame(body) {
  return axios.post(getUrl(`frame`), body, { headers }).then(res => res.data);
}

export function updateFrame(body) {
  return axios.put(getUrl(`frame`), body, { headers }).then(res => res.data);
}

export function deleteFrame(id) {
  return axios.delete(getUrl(`frame/${id}`), { headers }).then(res => res.data);
}
