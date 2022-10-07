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
            <Route path="/app" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="messages" element={<Messages />} />
              <Route path="onboarding" element={<Onboarding />} />
              <Route path="profile">
                <Route index element={<Profile />} />
                <Route path=":id" element={<Profile />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
