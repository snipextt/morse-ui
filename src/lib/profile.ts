import http from "../utils/http";

export async function getUserProfile(params: any) {
  let userId = "";
  if (params.queryKey.length > 1) userId = params.queryKey[1];
  const response = await http.get(`/user/profile${userId ? `/${userId}` : ""}`);
  if (response) return response.data;
}

export async function updateUserProfile(params: any) {
  const response = await http.put("/user/profile", params);
  if (response) return response.data;
}

export const searchUsername = async (username: string) => {
  if (!username) return null;
  const response = await http.get(`/user/search/${username}`);
  if (response) return response.data;
};

export const followUserProfile = async (userId?: string) => {
  if (!userId) return null;
  const response = await http.post(`/user/follow/${userId}`);
  if (response) return response.data;
};

export const unfollowUserProfile = async (userId?: string) => {
  if (!userId) return null;
  const response = await http.post(`/user/unfollow/${userId}`);
  if (response) return response.data;
};

export const addPost = async (data: any) => {
  const formData = new FormData();
  formData.append("image", data.image);
  formData.append("caption", data.caption);
  const response = await http.post(`/post`, formData);
  if (response) return response.data;
};

export const getPostsForUser = async (params: any) => {
  let userId = "";
  if (params.queryKey.length > 1) userId = params.queryKey[1];
  const response = await http.get(
    `/user/profile${userId ? `/${userId}` : ""}/post`
  );
  if (response) return response.data;
};

export const getfeedForCurrentUser = async () => {
  const response = await http.get(`/user/feed`);
  if (response) return response.data;
};
