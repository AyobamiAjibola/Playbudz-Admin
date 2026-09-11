import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const refreshApi = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

type RetryConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let isRefreshing = false;

let failedQueue: Array<{
  resolve: () => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryConfig | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const status = error.response?.status;

    // Don't try refreshing these requests
    const isAuthRequest =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/refresh");

    if (
      status === 401 &&
      !originalRequest._retry &&
      !isAuthRequest
    ) {

      if (isRefreshing) {
        try {
          await new Promise<void>((resolve, reject) => {
            failedQueue.push({
              resolve,
              reject,
            });
          });

          return api(originalRequest);
        } catch (queueError) {
          return Promise.reject(queueError);
        }
      }
      
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // refresh_token HTTP-only cookie is automatically sent

        await refreshApi.post("/auth/refresh");

        processQueue();

        // New access_token cookie was set by NestJS.
        // Retry the failed request.
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);