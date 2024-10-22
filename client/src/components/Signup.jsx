import { useContext, useState } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setLoggedIn, setToken, setUser } = useContext(AuthContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) throw "Please fill all fields!";
      const user = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/signup`,
        {
          email,
          password,
          name,
        }
      );
      toast.success("Successfully Registered");
      setUser(user.data.user);
      setToken(user.data.token);
      setLoggedIn(true);
      localStorage.setItem("token", user.data.token);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(`Can't create account!\nError: ${error}`);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen" style={{ backgroundColor: "#1e1e2e" }}>
      <div className="p-8 rounded shadow-md w-full md:w-96" style={{ backgroundColor: "#2e2e3e" }}>
        <h2 className="text-4xl font-bold mb-4 text-center" style={{ color: "#ffffff" }}>
          Signup
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium" style={{ color: "#ffffff" }}>
              Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-600 rounded focus:outline-none focus:border-blue-300"
              style={{ backgroundColor: "#1e1e2e", color: "#fff" }}
              required
            />
          </div>
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
              required
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
              className="mt-1 p-2 w-full border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              style={{ backgroundColor: "#1e1e2e", color: "#fff" }}
              required
            />
          </div>
          <button
            type="button"
            onClick={(e) => handleSignup(e)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 w-full"
          >
            Signup
          </button>
        </form>
        <div className="mt-4 text-center">
          <a
            href="/login"
            className="text-blue-500 hover:underline focus:outline-none focus:underline"
          >
            Already have an account?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
