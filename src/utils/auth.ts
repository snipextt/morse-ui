import { useState } from "react";
import { Cookie } from "./cookie";

interface AuthState {
  token: string;
  userId: any;
}

export const useAuthState = () => {
  let [token, setToken] = useState(
    Cookie.get("token") || sessionStorage.getItem("token")
  );
  let [userId, setUserId] = useState(
    Cookie.get("user") || sessionStorage.getItem("user")
  );
  const setAuthState = (userAuthData: AuthState, rememberSession?: boolean) => {
    if (rememberSession) {
      Cookie.set("token", userAuthData.token);
      sessionStorage.setItem("token", userAuthData.token);
      Cookie.set("user", userAuthData.userId);
      sessionStorage.setItem("user", userAuthData.userId);
    }
    setToken(userAuthData.token);
    setUserId(userAuthData.userId);
  };
  return { token, userId, setAuthState };
};
