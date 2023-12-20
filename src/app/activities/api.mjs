import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
// TODO: Remove once auth is set
const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;
export const TEST_PROVIDER_ID = process.env.NEXT_PUBLIC_TEST_PROVIDER_ID;

const PROVIDERS_PATH = "providers/";
const ACTIVITY_TYPES_PATH = "activity-types/";

// TODO: Remove once providers page is set

const client = axios.create({
  baseURL: API_HOST,
  timeout: 1000,
  headers: {
    "Authorization": `Token ${AUTH_TOKEN}`
  }
});

// TODO: Unify logic with provider api functions
export async function getActivityTypes() {
  const response = await client.get(ACTIVITY_TYPES_PATH);
  return response.data;
}

// TODO: remove once providers page is set
// export async function getProviders() {
//   const response = await client.get(PROVIDERS_PATH);
//   return response.data;
// }

export async function getProvider(providerId) {
  const response = await client.get(`${PROVIDERS_PATH}${providerId}/`);
  return response.data;
}

// TODO: remove once providers page is set
// export async function postProvider(url, {arg: data}) {
//   const response = await client.post(PROVIDERS_PATH, data);
//   return response.data;
// }

export async function patchProvider(providerId, data, file) {
  let formData = new FormData();

  // TODO: Refactor to a generic solution
  if (file) formData.append("logo", file, file.name);

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key]);
    }
  }

  const response = await client.patch(`${PROVIDERS_PATH}${providerId}/`, formData);
  return response.data;
}

// TODO: remove once providers page is set
// export async function deleteProvider(providerId) {
//   const response = await client.delete(`${PROVIDERS_PATH}${providerId}/`);
//   return response.data;
// }
