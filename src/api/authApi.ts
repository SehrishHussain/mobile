import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.1.2:5000/api", // your Express backend
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

// Call this before making protected requests
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const res = await API.post("/auth/login", credentials);
  console.log("API res.data:", res.data);
  return res.data; // expect { accessToken, refreshToken, user }
};

export const refreshAccessToken = async (refreshToken: string) => {
  const res = await API.post("/auth/refresh-token", { refreshToken });
  return res.data; // expect { accessToken }
};
