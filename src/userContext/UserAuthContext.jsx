import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
const userContext = createContext();
export default function UserAuthContext({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState();
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      if (localStorage.getItem("user-token")) {
        const res = await axios.post(
          "http://localhost:8080/um/user/verified-check",
          {},
          {
            withCredentials: true,
          }
        );
        console.log(res);
        if (res.status === 200) {
          setUser(res.data);
          setIsAuth(true);
          setRole(res.data.role);
        }
      } else {
        setIsAuth(() => false);
      }
      console.log(isAuth);
    }
    fetchData();
  }, []);
  return (
    <userContext.Provider value={{ isAuth: isAuth, role: role, user: user }}>
      {children}
    </userContext.Provider>
  );
}

export const useAuth = () => useContext(userContext);
