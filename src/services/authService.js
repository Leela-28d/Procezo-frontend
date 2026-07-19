import api from "./api";

export async function login(email, password) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });
  console.log(response.data);

  localStorage.setItem("token", response.data.token);
  localStorage.setItem("email", email);
  localStorage.setItem("role", response.data.role);
 
  return response.data;
}

export function logout() {
  localStorage.clear();
}

export function isLoggedIn() {
  return localStorage.getItem("token") !== null;
}