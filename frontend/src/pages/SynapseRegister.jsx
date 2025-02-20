import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/apiService";
import Header from "../components/Header";
import FooterComp from "../components/Footer";

const SynapseRegister = () => {
  const { login } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [branch, setBranch] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [year, setYear] = useState("");
  const [kaggleUserName, setKaggleUserName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validate input fields
  const validateForm = () => {
    if (
      !name ||
      !email ||
      !password ||
      // !branch ||
      !collegeName ||
      !mobileNo ||
      !rollNo||
      !kaggleUserName
    ) {
      return "All fields are required.";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Email is not valid.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!/^\d+$/.test(mobileNo)) {
      return "Mobile number must be numeric.";
    }
    return null;
  };

  const handleRegister = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const userData = {
        name,
        email,
        password,
        year,
        collegeName,
        mobileNo,
        rollNo,
        kaggleUserName,
      };
      const response = await registerUser(userData);
      login(response);
      navigate("/login");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-screen mt-28 md:mt-10">
        <div className="flex flex-col md:flex-row max-w-4xl w-full md:w-4/5">
          <div className="relative md:w-1/2 w-full p-8 flex items-center justify-center bg-center">
            <div className="absolute inset-0 bg-gray-800 bg-opacity-0"></div>
            <p className="relative text-white text-xl text-center">
              Welcome! Create an account to get started.
            </p>
          </div>

          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-6">Sign up</h2>
            {error && (
              <p className="mt-4 font-mono text-sm text-red-500 mb-4">
                {error}
              </p>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
              }}
            >
              <input
                className="w-full p-3 mb-4 border border-gray-300 rounded bg-transparent focus:outline-none"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="w-full p-3 mb-4 border border-gray-300 rounded bg-transparent focus:outline-none"
                type="text"
                placeholder="Roll No."
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
              />
              <input
                className="w-full p-3 mb-4 border border-gray-300 rounded bg-transparent focus:outline-none"
                type="text"
                placeholder="Kaggle Username"
                value={kaggleUserName}
                onChange={(e) => setKaggleUserName(e.target.value)}
              />
               <input
                className="w-full p-3 mb-4 border border-gray-300 rounded bg-transparent focus:outline-none"
                type="email"
                placeholder="Kaggle Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
             
              <select
                className="w-full p-3 mb-4 border border-gray-300 rounded bg-transparent focus:outline-none"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option
                  value=""
                  disabled
                  className="bg-gray-700 text-white w-1/4 md:w-full"
                >
                  Select Year
                </option>
                <option
                  value="1"
                  className="bg-gray-700 text-white w-1/4 md:w-full"
                >
                  1st Year
                </option>
                <option
                  value="2"
                  className="bg-gray-700 text-white w-1/4 md:w-full"
                >
                  2nd Year
                </option>
                <option
                  value="3"
                  className="bg-gray-700 text-white w-1/4 md:w-full"
                >
                  3rd Year
                </option>
                <option
                  value="4"
                  className="bg-gray-700 text-white w-1/4 md:w-full"
                >
                  4th Year
                </option>
              </select>

              <input
                className="w-full p-3 mb-4 border border-gray-300 rounded bg-transparent focus:outline-none"
                type="text"
                placeholder="College Name"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
              />
              <input
                className="w-full p-3 mb-4 border border-gray-300 rounded bg-transparent focus:outline-none"
                type="text"
                placeholder="Mobile No."
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
             
              <input
                className="w-full p-3 mb-4 border border-gray-300 rounded bg-transparent border-b  focus:outline-none"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                className="w-full bg-blue-500 text-white py-3 rounded"
                type="submit"
              >
                {loading ? "Creating Account..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <FooterComp />
    </>
  );
};

export default SynapseRegister;
