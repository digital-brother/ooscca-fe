import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
// TODO: Remove once auth is set
const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;
const IMAGES_PATH = "images/";
export const TEST_ACTIVITY_ID = 1

// TODO: Remove once providers page is set
export const TEST_PROVIDER_ID = process.env.NEXT_PUBLIC_TEST_PROVIDER_ID;

const client = axios.create({
  baseURL: API_HOST,
  timeout: 1000,
  // headers: {
  //   "Authorization": `Token ${AUTH_TOKEN}`
  // }
});

export async function getImages() {
  const response = await client.get(`${IMAGES_PATH}`);
  return response.data;
}

export async function getPrimaryImages() {
  const response = await client.get(`${IMAGES_PATH}?type=primary`);
  return response.data;
}

export async function getSecondaryImages() {
  const response = await client.get(`${IMAGES_PATH}?type=secondary`);
  return response.data;
}

export async function getImage(ImageId) {
  const response = await client.get(`${IMAGES_PATH}${ImageId}/`);
  return response.data;
}

export async function postImage(data) {
  let formData = new FormData();

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key]);
    }
  }

  const response = await client.post(`${IMAGES_PATH}`, formData);
  return response.data;
}

export async function patchImage(data) {
  let formData = new FormData();

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key]);
    }
  }

  const response = await client.patch(`${IMAGES_PATH}${data.id}/`, formData);
  return response.data;
}

export async function deleteImage(imageId) {
  const response = await client.delete(`${IMAGES_PATH}${imageId}/`);
  return response.data;
}
