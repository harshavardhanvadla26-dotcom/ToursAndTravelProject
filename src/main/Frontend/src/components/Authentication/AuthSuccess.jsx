import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      try {
        localStorage.setItem("token", token);
        const decodedToken = jwtDecode(token);

        if (decodedToken.role === "ROLE_CUSTOMER") {
          navigate("/user/dashboard");
          return;
        }

        if (decodedToken.role === "ROLE_ADMIN") {
          navigate("/admin/dashboard");
          return;
        }
      } catch {
        localStorage.removeItem("token");
      }
    }

    navigate("/");
  }, [location, navigate]);

  return <div>Processing Authentication from google...</div>;
};

export default AuthSuccess;
