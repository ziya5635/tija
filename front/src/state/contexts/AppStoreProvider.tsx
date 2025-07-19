import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "../../axios";
import { type Props, type User } from "../../types";
import { AppContext } from "./AppContext";
import { isValidToken } from "../../helpers";

export function AppStoreProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  //fix the issue rasing from here, consider realtime func starting section 6 also
  //backend token provided contains access_token and refresh_token,while here token property used
  useEffect(() => {
    try {
      var token = localStorage.getItem("token");
      if (isValidToken(token)) {
        const decoded = jwtDecode<{
          userId: string;
          username: string;
          email: string;
        }>(token!);
        setUser({
          id: decoded.userId,
          username: decoded.username,
          email: decoded.email,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function login(email: string, password: string) {
    try {
      const response = await axios.post("/auth/login", { email, password });
      const { accessToken } = response.data;
      if (!accessToken || !isValidToken(accessToken)) {
        throw new Error("invalid token provided!");
      }
      localStorage.setItem("token", accessToken);
      const decoded = jwtDecode<{
        userId: string;
        username: string;
        email: string;
      }>(accessToken);
      setUser({
        id: decoded.userId,
        username: decoded.username,
        email: decoded.email,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function register(username: string, email: string, password: string) {
    try {
      await axios.post("/auth/register", { username, email, password });
      await login(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AppContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AppContext.Provider>
  );
}
