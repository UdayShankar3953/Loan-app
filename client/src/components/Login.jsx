import { useContext, useState } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setToken, setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      if (!email || !password) throw "Please fill all fields!";
      const user = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        { email, password }
      );
      setUser(user.data.user);
      setToken(user.data.token);
      setLoggedIn(true);
      toast.success("Successfully Logged In");
      localStorage.setItem("token", user.data.token);
      navigate("/");
    } catch (error) {
      toast.error(`Can't login! Error while login`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "#1e1e2e" }}>
      <div className="p-8 rounded shadow-md w-full md:w-96" style={{ backgroundColor: "#2e2e3e" }}>
        <h2 className="text-4xl font-bold mb-4 text-center" style={{ color: "#ffffff" }}>
          Login
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium" style={{ color: "#ffffff" }}>
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-600 rounded focus:outline-none focus:border-blue-300"
              style={{ backgroundColor: "#1e1e2e", color: "#fff" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium" style={{ color: "#ffffff" }}>
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-600 rounded focus:outline-none focus:border-blue-300"
              style={{ backgroundColor: "#1e1e2e", color: "#fff" }}
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 w-full"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-400">
            Dont have an account?{" "}
            <a
              href="/signup"
              className="text-blue-500 hover:underline focus:outline-none focus:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
