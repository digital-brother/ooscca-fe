import axios from "axios";

const API_HOST = "http://localhost:8000/";
const PROVIDERS_PATH = "providers/";

const client = axios.create({
  baseURL: API_HOST,
  withCredentials: true,
  timeout: 1000,
});

export async function getProviders() {
  const response = await client.get(PROVIDERS_PATH);
  return response.data;
}

export async function postProvider(url, { arg: data }) {
  const response = await client.post(PROVIDERS_PATH, data);
  return response.data;
}

export async function patchProvider(providerId, data) {
  const response = await client.patch(`${PROVIDERS_PATH}${providerId}/`, data);
  return response.data;
}

export async function deleteProvider(providerId) {
  const response = await client.delete(`${PROVIDERS_PATH}${providerId}/`);
  return response.data;
}
