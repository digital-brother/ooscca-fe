import axios from "axios";

const API_HOST = "http://localhost:8000/";
const PROVIDERS_PATH = "providers/";

const client = axios.create({
  baseURL: API_HOST,
  timeout: 1000,
  headers: {
    'Authorization': `Token fc4b8a24c6ca26d888feb082dc2ff30836953f48`
  }
});

export async function getProviders() {
  const response = await client.get(PROVIDERS_PATH);
  return response.data;
}

export async function postProvider(url, {arg: data}) {
  const response = await client.post(PROVIDERS_PATH, data);
  return response.data;
}

export async function patchProvider(providerId, file) {
  const config = {headers: {'Content-Type': 'multipart/form-data'}}

  let formData = new FormData();
  formData.append("logo", file, file.fileName)

  // TODO: Refactor to a generic solution
  // for (const key in data) {
  //   if (data.hasOwnProperty(key)) {
  //     formData.append(key, data[key]);
  //   }
  // }

  const response = await client.patch(`${PROVIDERS_PATH}${providerId}/`, formData, config)
  return response.data;
}

export async function deleteProvider(providerId) {
  const response = await client.delete(`${PROVIDERS_PATH}${providerId}/`);
  return response.data;
}
