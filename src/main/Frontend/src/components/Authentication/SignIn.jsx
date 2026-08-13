import React, { useEffect, useState } from "react";
import { Eye, EyeOff, LogIn, Moon, Sun } from "lucide-react";

import googleIMg from "../../assets/Images/Google.svg.webp";
import loginInterface from "../../assets/Images/login_interface.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../Redux/API/API";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignIn = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const getTokenRole = (authToken) => {
    try {
      return authToken ? jwtDecode(authToken).role : null;
    } catch {
      localStorage.removeItem("token");
      return null;
    }
  };
  const decodedTokenRole = getTokenRole(token);
  const { loading } = useSelector((state) => state.user);

  const toggle = () => {
    setDarkMode(!darkMode);
  };

  const validateForm = () => {
    const errors = { email: "", password: "" };

    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!password) {
      errors.password = "Password is required.";
    }

    setFormErrors(errors);
    return !errors.email && !errors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    let credentials = {
      email,
      password,
    };

    try {
      const response = await dispatch(userLogin(credentials)).unwrap();
      const newToken = response.data;
      if (!newToken) {
        throw new Error("Login failed. No token received.");
      }

      localStorage.setItem("token", newToken);
      const loggedInRole = getTokenRole(newToken);
      navigate(
        loggedInRole === "ROLE_ADMIN" ? "/admin/dashboard" : "/user/dashboard",
      );
    } catch (error) {
      setFormErrors({ email: "", password: "" });
      setEmail("");
      setPassword("");
      toast.error(
        typeof error === "string" ? error : error.message || "Login failed",
      );
    }
  };

  useEffect(() => {
    if (token) {
      navigate(
        decodedTokenRole === "ROLE_ADMIN"
          ? "/admin/dashboard"
          : "/user/dashboard",
      );
    }
  }, [token, decodedTokenRole, navigate]);

  if (loading) {
    return <div className="flex justify-center font-bold">loading...</div>;
  }

  const googleLogin = () => {
    window.open("http://localhost:8080/oauth2/authorization/google", "_self");
  };

  return (
    <>
      <div className={darkMode ? "dark" : ""}>
        <div className="min-h-screen flex items-center justify-center px-6 py-8 dark:bg-slate-900">
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left: illustration / interface image (visible on lg and up) */}
              <div className="hidden lg:flex justify-center">
                {/* If the image file is missing, the browser will show broken image — add the file to src/assets/Images/login_interface.png */}
                <img
                  src={loginInterface}
                  alt="Login Interface"
                  className="w-[80%] rounded-lg shadow-lg object-cover"
                />
              </div>

              {/* Right: sign-in form */}
              <div className="mx-auto w-full max-w-sm">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
                  <LogIn className={darkMode ? "m-auto text-white size-14" : "m-auto size-14"} />
                  <h2 className="mt-5 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900 dark:text-slate-200">
                    Sign in to your account
                  </h2>
                </div>

                <div className="mt-10">
                  <form
                    action="#"
                    method="POST"
                    className="space-y-6"
                    onSubmit={handleSubmit}
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                      >
                        Email
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full mt-1 rounded-md"
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                      >
                        Password
                      </label>
                      <div className="relative mt-2">
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          required
                          autoComplete="current-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="block w-full mt-1 rounded-md"
                        />
                        {formErrors.password && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
                        )}
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5 text-gray-500" />
                          ) : (
                            <Eye className="w-5 h-5 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full py-2 text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500"
                      >
                        Sign in
                      </button>
                    </div>
                  </form>

                  <p className="mt-6 text-sm text-center text-gray-500">
                    Not a member?{' '}
                    <Link
                      to="/SignUp"
                      className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      Sign Up
                    </Link>
                  </p>

                  <p className="mt-3 text-sm text-center text-gray-900 dark:text-white">or continue with</p>
                  <button
                    className="mt-3 flex items-center w-40 m-auto justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 dark:text-white text-black border border-slate-400 shadow-sm"
                    onClick={googleLogin}
                  >
                    <img src={googleIMg} alt="Google" className="mr-2 size-4" />
                    Google
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-5 right-5 md:right-12">
            <button
              className={
                darkMode
                  ? "border border-white size-8 rounded-lg flex items-center justify-center shadow-lg"
                  : "border border-black size-8 rounded-lg flex items-center justify-center shadow-lg"
              }
              onClick={toggle}
            >
              {darkMode ? <Moon className="text-white" /> : <Sun />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
