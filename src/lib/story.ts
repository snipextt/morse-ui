import http from "../utils/http";

export async function getUserStories() {
  const response = await http.get("/story");
  if (response) return response.data;
}
