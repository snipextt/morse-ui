import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useAuthState } from "./utils/auth";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Onboarding from "./Pages/Onboarding";

import "./App.scss";
import Messages from "./Pages/Messages";
import Layout from "./Components/Layout";
import Profile from "./Pages/Profile";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RecoilRoot } from "recoil";
import Post from "./Pages/Post";

const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <ReactQueryDevtools />
        <BrowserRouter>
          <Routes>
            <Route index element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="onboarding" element={<Onboarding />} />
            <Route path="/app" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="messages" element={<Messages />} />
              <Route path="profile">
                <Route index element={<Profile />} />
                <Route path=":id" element={<Profile />} />
              </Route>
              <Route path="post/:id" element={<Post />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
