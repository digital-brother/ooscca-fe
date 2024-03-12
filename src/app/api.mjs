import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
// TODO: Remove once auth is set
const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;

const PROVIDERS_PATH = "/providers";
const ACTIVITY_TYPES_PATH = "/activity-types";
const ACTIVITIES_PATH = "/activities";
const DISCOUNTS_SUBPATH = "discounts";
const IMAGES_PRIMARY_SUBPATH = "primary-images";
const IMAGES_SECONDARY_SUBPATH = "secondary-images";

const CHILDREN_PATH = "/children";
const BOOKINGS_PATH = "/bookings";

const client = axios.create({
  baseURL: API_HOST,
  timeout: 1000,
  headers: {
    Authorization: `Token ${AUTH_TOKEN}`,
  },
});


// TODO: Rationalize mutation and api layer (duplicate function code)
// IMAGES
// PRIMARY IMAGES
export async function getActivityImagesPrimary(activityId) {
  const url = `${ACTIVITIES_PATH}/${activityId}/${IMAGES_PRIMARY_SUBPATH}/`;
  const response = await client.get(url);
  return response.data;
}

export async function postActivityImagePrimary(activityId, data) {
  const formData = new FormData();

  // TODO: Make backend auto-assign activity id
  for (const key in { ...data, activity: activityId }) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      formData.append(key, data[key]);
    }
  }

  const url = `${ACTIVITIES_PATH}/${activityId}/${IMAGES_PRIMARY_SUBPATH}/`;
  const response = await client.post(url, formData);
  return response.data;
}

export async function deleteActivityImagePrimary(activityId, imageId) {
  const url = `${ACTIVITIES_PATH}/${activityId}/${IMAGES_PRIMARY_SUBPATH}/${imageId}/`;
  const response = await client.delete(url);
  return response.data;
}

// SECONDARY IMAGES
export async function getActivityImagesSecondary(activityId) {
  const url = `${ACTIVITIES_PATH}/${activityId}/${IMAGES_SECONDARY_SUBPATH}/`;
  const response = await client.get(url);
  return response.data;
}

export async function postActivityImageSecondary(activityId, data) {
  const formData = new FormData();

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      formData.append(key, data[key]);
    }
  }

  const url = `${ACTIVITIES_PATH}/${activityId}/${IMAGES_SECONDARY_SUBPATH}/`;
  const response = await client.post(url, formData);
  return response.data;
}

export async function deleteActivityImageSecondary(activityId, imageId) {
  const url = `${ACTIVITIES_PATH}/${activityId}/${IMAGES_SECONDARY_SUBPATH}/${imageId}/`;
  const response = await client.delete(url);
  return response.data;
}

// DISCOUNTS
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

// ACTIVITIES FOR DATE
export async function getActivitiesForDate(date) {
  const dateStr = date.format("YYYY-MM-DD")
  const url = `${ACTIVITIES_PATH}/${dateStr}/`;
  const response = await client.get(url);
  return response.data;
}

export async function getActivityForDate(activityId, dateStr) {
  const url = `${ACTIVITIES_PATH}/${activityId}/${dateStr}/`;
  const response = await client.get(url);
  return response.data;
}

// ACTIVITIES
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

// ACTIVITY TYPES
export async function getActivityTypes() {
  const response = await client.get(`${ACTIVITY_TYPES_PATH}/`);
  return response.data;
}

// PROVIDERS
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

export async function getChildren() {
  const response = await client.get(CHILDREN_PATH);
  return response.data;
}

export async function getBookings(dateAfter, dateBefore) {

  const response = await client.get(BOOKINGS_PATH, {
    params: {
      dateAfter: dateAfter.format('YYYY-MM-DD'),
      dateBefore: dateBefore.format('YYYY-MM-DD'),
    }
  });
  return response.data;
}
