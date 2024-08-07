import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const PROVIDERS_PATH = "/providers";
const ACTIVITY_TYPES_PATH = "/activity-types";
const ACTIVITIES_PATH = "/activities";
const DISCOUNTS_SUBPATH = "discounts";
const IMAGES_PRIMARY_SUBPATH = "primary-images";
const IMAGES_SECONDARY_SUBPATH = "secondary-images";

const CHILDREN_PATH = "/children";
const BOOKINGS_PATH = "/bookings";
const BOOKING_SETS_PATH = "/booking-sets";
const FRIENDS_BOOKINGS_PATH = "/friends-bookings";
const BILLS_PATH = "/bills";
const SCHOOLS_PATH = "/schools";
const LOGIN_PATH = "/dj-rest-auth/login";
const SIGNUP_ACCOUNT_PATH = "/dj-rest-auth/registration";
const SIGNUP_DATAILS_PATH = "/signup-details";
const SIGNUP_CHILDREN_PATH = "/signup-children";
const RESEND_EMAIL_PATH = "/resend-email";
const VERIFY_EMAIL_PATH = "/verify-email";
const LOGOUT_PATH = "/dj-rest-auth/logout";
const SHARE_CALENDAR_PATH = "/share-calendar";
const SHARE_BACK_CALENDAR_PATH = "/share-back-calendar";

export const AUTH_TOKEN_KEY = "authToken";
export const USER_ID_KEY = "userId";
export const SIGNUP_CURRENT_STEP_KEY = "signupCurrentStep";

const client = axios.create({
  baseURL: API_HOST,
  timeout: 5000,
});
  
client.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
    if (authToken) config.headers.Authorization = `Token ${authToken}`;
    return config;
  }
);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      window.location.href = '/login';
  }
    return Promise.reject(error);
  }
  );

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
  const dateStr = date.format("YYYY-MM-DD");
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
  const url = `${CHILDREN_PATH}/`;
  const response = await client.get(url);
  return response.data;
}

export async function getBookings({ dateAfter, dateBefore }) {
  const url = `${BOOKINGS_PATH}/`;
  const response = await client.get(url, {
    params: {
      date_after: dateAfter.format("YYYY-MM-DD"),
      date_before: dateBefore.format("YYYY-MM-DD"),
    },
  });
  return response.data;
}

export async function getBooking(bookingId) {
  const response = await client.get(`${BOOKINGS_PATH}/${bookingId}/`);
  return response.data;
}

export async function getFriendsBookings({ dateAfter, dateBefore }) {
  const url = `${FRIENDS_BOOKINGS_PATH}/`;
  const response = await client.get(url, {
    params: {
      date_after: dateAfter.format("YYYY-MM-DD"),
      date_before: dateBefore.format("YYYY-MM-DD"),
    },
  });
  return response.data;
}

export async function createBooking(data) {
  const url = `${BOOKINGS_PATH}/`;
  const response = await client.post(url, data);
  return response.data;
}

export async function createBookingSet(data) {
  const url = `${BOOKING_SETS_PATH}/`;
  const response = await client.post(url, data);
  return response.data
}

export async function deleteBookingSets({ startDate, endDate, childId, activityId }) {
  const url = `${BOOKING_SETS_PATH}/`;
  const response = await client.delete(url, {
    params: {
      start_date: startDate.format("YYYY-MM-DD"),
      end_date: endDate.format("YYYY-MM-DD"),
      child_id: childId,
      activity_id: activityId
    }
  });
  return response.data;
}

export async function deleteBooking(bookingId) {
  const url = `${BOOKINGS_PATH}/${bookingId}/`;
  const response = await client.delete(url);
  return response.data;
}

// SCHOOLS
export async function getSchools() {
  const response = await client.get(`${SCHOOLS_PATH}/`);
  return response.data;
}

// AUTH
export async function signupAccount(data) {
  const url = `${SIGNUP_ACCOUNT_PATH}/`;
  const response = await client.post(url, data);
  return response.data;
}

export async function login(data) {
  const url = `${LOGIN_PATH}/`;
  const response = await client.post(url, data);
  return response.data;
}

export async function signupDetails(userId, data) {
  const url = `${SIGNUP_DATAILS_PATH}?userId=${userId}`;
  const response = await client.put(url, data);
  return response.data;
}

export async function signupChildren(isLastChild, userId, data) {
  const url = `${SIGNUP_CHILDREN_PATH}?userId=${userId}&isLastChild=${isLastChild}`;
  const response = await client.post(url, data);
  return response.data;
}

export async function resendEmail(data) {
  const url = `${RESEND_EMAIL_PATH}/`;
  const response = await client.post(url, data);
  return response.data;
}

export async function verifyEmail(data) {
  const url = `${VERIFY_EMAIL_PATH}/`;
  const response = await client.post(url, data);
  return response.data;
}

export async function logout() {
  const url = `${LOGOUT_PATH}/`;
  const response = await client.post(url);
  return response.data;
}

// BILLS
export async function createBill(data) {
  const response = await client.post(`${BILLS_PATH}/`, data);
  return response.data;
}

export async function getBill(billId) {
    const response = await client.get(`${BILLS_PATH}/${billId}/`);
    return response.data;
}

export async function shareCalendar(childId, data) {
  data.child = childId;
  const response = await client.post(`${SHARE_CALENDAR_PATH}/`, data);
  return response.data;
}

export async function shareCalendarBack(acceptionInviteId, data) {
  const response = await client.patch(`${SHARE_BACK_CALENDAR_PATH}/${acceptionInviteId}/`, data);
  return response.data;
}
