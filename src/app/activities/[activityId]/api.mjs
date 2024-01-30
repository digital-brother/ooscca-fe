import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
// TODO: Remove once auth is set
const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;

const PROVIDERS_PATH = "/providers";
const ACTIVITY_TYPES_PATH = "/activity-types";
const ACTIVITIES_PATH = "/activities";
const DISCOUNTS_SUBPATH = "discounts";

const client = axios.create({
  baseURL: API_HOST,
  timeout: 1000,
  headers: {
    Authorization: `Token ${AUTH_TOKEN}`,
  },
});

export async function createDiscount(activityId, data) {
  const url = `${ACTIVITIES_PATH}/${activityId}/${DISCOUNTS_SUBPATH}/`;
  const response = await client.post(url, data);
  return response.data;
}
export async function getActivityDiscounts(activityId) {
  const url = `${ACTIVITIES_PATH}/${activityId}/${DISCOUNTS_SUBPATH}/`;
  const response = await client.get(url);
  return response.data;
}
export async function patchDiscount(activityId, discountId, data) {
  const url = `${ACTIVITIES_PATH}/${activityId}/${DISCOUNTS_SUBPATH}/${discountId}/`;
  const response = await client.patch(url, data);
  return response.data;
}

export async function getActivity(activityId) {
  const url = `${ACTIVITIES_PATH}/${activityId}/`;
  const response = await client.get(url);
  return response.data;
}
export async function patchActivity(activityId, data) {
  const url = `${ACTIVITIES_PATH}/${activityId}/`;
  const response = await client.patch(url, data);
  return response.data;
}

export async function getActivityTypes() {
  const response = await client.get(`${ACTIVITY_TYPES_PATH}/`);
  return response.data;
}

export async function getProvider(providerId) {
  const response = await client.get(`${PROVIDERS_PATH}/${providerId}/`);
  return response.data;
}
export async function patchProvider(providerId, data, file) {
  const formData = new FormData();

  // TODO: Refactor to a generic solution
  if (file) formData.append("logo", file, file.name);

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      formData.append(key, data[key]);
    }
  }

  const response = await client.patch(`${PROVIDERS_PATH}/${providerId}/`, formData);
  return response.data;
}