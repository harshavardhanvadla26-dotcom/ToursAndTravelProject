import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const baseUrl = (
  import.meta.env.VITE_BASE_URL || "http://localhost:8080"
).replace(/\/+$/, "");

const getToken = () => localStorage.getItem("token");

const getAuthConfig = (headers = {}) => {
  const token = getToken();
  if (!token) {
    throw new Error("Please sign in again.");
  }

  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getApiErrorMessage = (error, fallback = "Request failed") => {
  if (typeof error === "string") {
    return error;
  }

  const responseData = error?.response?.data;
  if (typeof responseData === "string") {
    return responseData;
  }

  return (
    responseData?.message || responseData?.error || error?.message || fallback
  );
};

const requestWithError = async (request, rejectWithValue, fallback) => {
  try {
    return await request();
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error, fallback));
  }
};

export const getThunkData = (result, fallback = "Request failed") => {
  if (result?.error) {
    throw new Error(
      typeof result.payload === "string"
        ? result.payload
        : result.error.message || fallback,
    );
  }

  const payload = result?.payload;
  if (!payload) {
    throw new Error("No response received from server.");
  }

  if (payload?.isAxiosError || payload?.response) {
    throw new Error(getApiErrorMessage(payload, fallback));
  }

  return payload.data ?? payload;
};

export const resolveAssetUrl = (url) => {
  if (!url || typeof url !== "string") {
    return "";
  }

  if (/^(https?:|data:|blob:)/i.test(url)) {
    return url;
  }

  return `${baseUrl}/${url.replace(/^\/+/, "")}`;
};

export const normalizeTour = (tour) => {
  if (!tour) {
    return null;
  }

  return {
    ...tour,
    meals: Array.isArray(tour.meals) ? tour.meals : [],
    activities: Array.isArray(tour.activities) ? tour.activities : [],
    tourImages: Array.isArray(tour.tourImages)
      ? tour.tourImages.map(resolveAssetUrl).filter(Boolean)
      : [],
    location: tour.location || {},
    lodging: tour.lodging || {},
    transport: tour.transport || {},
  };
};

export const normalizeTours = (tours) =>
  Array.isArray(tours) ? tours.map(normalizeTour).filter(Boolean) : [];

// Sign up
export const userSignUP = createAsyncThunk(
  "userSignUp",
  async (credentials, { rejectWithValue }) =>
    requestWithError(
      () => axios.post(`${baseUrl}/auth/signup`, credentials),
      rejectWithValue,
      "Unable to sign up.",
    ),
);

// Sign in
export const userLogin = createAsyncThunk(
  "userLogin",
  async (credentials, { rejectWithValue }) =>
    requestWithError(
      () => axios.post(`${baseUrl}/auth/login`, credentials),
      rejectWithValue,
      "Invalid email or password.",
    ),
);

// Admin get all tours
export const adminTours = createAsyncThunk(
  "adminTours",
  async (_, { rejectWithValue }) =>
    requestWithError(
      () => axios.get(`${baseUrl}/admin/tours`, getAuthConfig()),
      rejectWithValue,
      "Failed to fetch tours.",
    ),
);

// Get admin tour by ID
export const fetchTourDetails = createAsyncThunk(
  "fetchTourDetails",
  async (tourId, { rejectWithValue }) =>
    requestWithError(
      async () => {
        const response = await axios.get(
          `${baseUrl}/admin/tours/${tourId}`,
          getAuthConfig(),
        );
        return response.data;
      },
      rejectWithValue,
      "Failed to fetch tour details.",
    ),
);

// Get admin all transport
export const adminTransport = createAsyncThunk(
  "adminTransport",
  async (_, { rejectWithValue }) =>
    requestWithError(
      () => axios.get(`${baseUrl}/admin/transports`, getAuthConfig()),
      rejectWithValue,
      "Failed to fetch transport data.",
    ),
);

// Get admin all locations
export const adminLocation = createAsyncThunk(
  "adminLocation",
  async (_, { rejectWithValue }) =>
    requestWithError(
      () => axios.get(`${baseUrl}/admin/locations`, getAuthConfig()),
      rejectWithValue,
      "Failed to fetch location data.",
    ),
);

export const publicLocations = createAsyncThunk(
  "publicLocations",
  async (_, { rejectWithValue }) =>
    requestWithError(
      () => axios.get(`${baseUrl}/locations`),
      rejectWithValue,
      "Failed to fetch locations.",
    ),
);

// Delete admin tour
export const deleteTour = createAsyncThunk(
  "deleteTour",
  async (tourId, { rejectWithValue }) =>
    requestWithError(
      () => axios.delete(`${baseUrl}/admin/tours/${tourId}`, getAuthConfig()),
      rejectWithValue,
      "Failed to delete tour.",
    ),
);

// Get admin all lodging
export const adminLodging = createAsyncThunk(
  "adminLodging",
  async (_, { rejectWithValue }) =>
    requestWithError(
      () => axios.get(`${baseUrl}/admin/lodgings`, getAuthConfig()),
      rejectWithValue,
      "Failed to fetch lodging data.",
    ),
);

// Update tour
export const updateTour = createAsyncThunk(
  "updateTour",
  async ({ tourId, formData }, { rejectWithValue }) =>
    requestWithError(
      async () => {
        const response = await axios.put(
          `${baseUrl}/admin/tours/${tourId}`,
          formData,
          getAuthConfig({ "Content-Type": "multipart/form-data" }),
        );
        return response.data;
      },
      rejectWithValue,
      "Failed to update tour.",
    ),
);

// Update location
export const editLocation = createAsyncThunk(
  "editLocation",
  async ({ locationId, updatedLocation }, { rejectWithValue }) =>
    requestWithError(
      () =>
        axios.put(
          `${baseUrl}/admin/locations/${locationId}`,
          updatedLocation,
          getAuthConfig({ "Content-Type": "application/json" }),
        ),
      rejectWithValue,
      "Failed to update location.",
    ),
);

// Update transport
export const editTransport = createAsyncThunk(
  "editTransport",
  async ({ transportId, updatedTransport }, { rejectWithValue }) =>
    requestWithError(
      () =>
        axios.put(
          `${baseUrl}/admin/transports/${transportId}`,
          updatedTransport,
          getAuthConfig({ "Content-Type": "application/json" }),
        ),
      rejectWithValue,
      "Failed to update transport.",
    ),
);

// Update lodging
export const editLodging = createAsyncThunk(
  "editLodging",
  async ({ lodgingId, updatedLodging }, { rejectWithValue }) =>
    requestWithError(
      () =>
        axios.put(
          `${baseUrl}/admin/lodgings/${lodgingId}`,
          updatedLodging,
          getAuthConfig({ "Content-Type": "application/json" }),
        ),
      rejectWithValue,
      "Failed to update lodging.",
    ),
);

// Admin ticket summary
export const allTickets = createAsyncThunk(
  "allTickets",
  async (_, { rejectWithValue }) =>
    requestWithError(
      () => axios.get(`${baseUrl}/admin/tourTicketSummary`, getAuthConfig()),
      rejectWithValue,
      "Failed to fetch ticket summary.",
    ),
);

// Admin tour booking details
export const bookDetails = createAsyncThunk(
  "bookDetails",
  async (tourId, { rejectWithValue }) =>
    requestWithError(
      () =>
        axios.get(`${baseUrl}/admin/tourDetails/${tourId}`, getAuthConfig()),
      rejectWithValue,
      "Failed to fetch booking details.",
    ),
);

// User get all tours
export const userTours = createAsyncThunk(
  "userTours",
  async (_, { rejectWithValue }) =>
    requestWithError(
      () => axios.get(`${baseUrl}/customer/tours`, getAuthConfig()),
      rejectWithValue,
      "Failed to fetch tours.",
    ),
);

// Get user tour by ID
export const UserTourDetail = createAsyncThunk(
  "UserTourDetails",
  async (tourId, { rejectWithValue }) =>
    requestWithError(
      async () => {
        const response = await axios.get(
          `${baseUrl}/customer/tours/${tourId}`,
          getAuthConfig(),
        );
        return response.data;
      },
      rejectWithValue,
      "Failed to fetch tour details.",
    ),
);

// User book tour
export const userBook = createAsyncThunk(
  "userBook",
  async ({ tourId, numberOfTickets }, { rejectWithValue }) =>
    requestWithError(
      async () => {
        const response = await axios.post(
          `${baseUrl}/customer/create-payment-intent/${tourId}?numberOfTickets=${numberOfTickets}`,
          {},
          getAuthConfig(),
        );
        return response.data;
      },
      rejectWithValue,
      "Booking failed. Please try again.",
    ),
);

// User confirm booking
export const confirmBooking = createAsyncThunk(
  "confirmBooking",
  async ({ bookingId, paymentIntentId }, { rejectWithValue }) =>
    requestWithError(
      () =>
        axios.post(
          `${baseUrl}/customer/confirm-payment/${bookingId}?paymentIntentId=${paymentIntentId}`,
          {},
          getAuthConfig({ "Content-Type": "application/json" }),
        ),
      rejectWithValue,
      "Failed to confirm booking.",
    ),
);
