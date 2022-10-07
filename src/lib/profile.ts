import http from "../utils/http";

export async function getUserProfile(params: any) {
  let userId = "";
  if (params.queryKey.length > 1) userId = params.queryKey[1];
  const response = await http.get(`/user/profile${userId ? `/${userId}` : ""}`);
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
