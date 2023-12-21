import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
// TODO: Remove once auth is set
const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;
export const TEST_PROVIDER_ID = process.env.NEXT_PUBLIC_TEST_PROVIDER_ID;
export const TEST_ACTIVITY_ID = process.env.NEXT_PUBLIC_TEST_ACTIVITY_ID;

// TODO: Update, so that urls explicitly include slashes
const PROVIDERS_PATH = "providers/";
const ACTIVITY_TYPES_PATH = "activity-types/";
const ACTIVITIES_PATH = "activities/";

const client = axios.create({
  baseURL: API_HOST,
  timeout: 1000,
  headers: {
    "Authorization": `Token ${AUTH_TOKEN}`
  }
});

export function patchActivity(activityId, data) {
  const url = `${ACTIVITIES_PATH}${activityId}/`;
  return client.patch(url, data);
}

// TODO: Unify logic with provider api functions
export function getActivityTypes() {
  return client.get(ACTIVITY_TYPES_PATH);
}

export function getProvider(providerId) {
  return client.get(`${PROVIDERS_PATH}${providerId}/`);
}

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
