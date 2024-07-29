import { useEffect, useState } from "react";
import { useAuth } from "../../Context/auth.js";
import { Outlet } from "react-router-dom";
import axios from "axios";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/auth/admin-auth"
        );
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : "Loadin ";
}
