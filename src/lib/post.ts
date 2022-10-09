import http from "../utils/http";

export const getPostById = async (id: string) => {
  const response = await http.get(`/post/${id}`);
  if (response) return response.data;
};

export const likePost = async (id: string) => {
  const response = await http.put(`/post/${id}/like`);
  if (response) return response.data;
};

export const unlikePost = async (id: string) => {
  const response = await http.put(`/post/${id}/unlike`);
  if (response) return response.data;
};

export const createCommentOnPost = async (id: string, comment: string) => {
  const response = await http.post(`/post/${id}/comment`, { comment });
  if (response) return response.data;
};

export const getPostCommnets = async (id: string) => {
  const response = await http.get(`/post/${id}/comments`);
  if (response) return response.data;
};
