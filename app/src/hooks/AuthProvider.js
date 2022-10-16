import { createContext, useState, useEffect, useContext } from "react";
import client from "../client";
import { NotAuthenticatedError } from "../client/errors";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  const fetchUser = async () => {
    try {
      setUser(await client.authentication.user());
    } catch (error) {
      if (error instanceof NotAuthenticatedError) {
        setUser(null);
        return;
      }
      throw error;
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async ({ email, password }) => {
    await client.authentication.login({ email, password });
    await fetchUser();
  };

  const logout = async () => {
    client.authentication.logout();
    await fetchUser();
  };

  const register = async ({ email, username, password }) => {
    client.authentication.register({ email, username, password });
  };

  const update = async ({ contactEmail, contactPhone, contactMessenger }) => {
    await client.authentication.update({
      contactEmail,
      contactPhone,
      contactMessenger,
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, update }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
