import { Story } from "../schema/Story";
import http from "../utils/http";

export async function getUserStories() {
  const response = await http.get("/story");
  if (response) return response.data;
}

export async function addStory(story: any) {
  const formData = new FormData();
  formData.append("media", story.media);
  formData.append("mediaType", story.mediaType);
  formData.append("backgroundColor", story.backgroundColor);
  formData.append("caption", story.caption);
  const response = await http.post("/story", formData);
  if (response) return response.data;
}
