const getApiBaseUrl = (): string => {
  const envApiUrl = import.meta.env.VITE_API_URL;
  if (envApiUrl) {
    return envApiUrl;
  }

  if (import.meta.env.DEV) {
    const hostname = window.location.hostname;

    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "http://127.0.0.1:8000";
    }

    return `http://${hostname}:8000`;
  }

  return import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
};

export const API_BASE_URL = getApiBaseUrl();

if (import.meta.env.DEV) {
  console.log("🔧 API Base URL:", API_BASE_URL);
  console.log("🌐 Current hostname:", window.location.hostname);
  console.log("📍 Current origin:", window.location.origin);
}

export const apiUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  const url = `${API_BASE_URL}/api/${cleanEndpoint}`;

  if (import.meta.env.DEV) {
    console.log(`🔗 API URL for "${endpoint}":`, url);
  }

  return url;
};
