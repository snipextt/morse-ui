import http from "../utils/http";

export async function login(username: string, password: string) {
  const response = await http.post("/auth/login", { username, password });
  if (response) return response.data;
}

export async function register(
  username: string,
  password: string,
  name: string,
  email: string
) {
  const response = await http.post("/auth/register", {
    username,
    password,
    name,
    email,
  });
  if (response) return response.data;
}
