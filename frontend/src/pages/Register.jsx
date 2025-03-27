import React, { useState, useEffect } from 'react';
import RegisterHelloGif from '../assets/GIFs/registering-hello.gif';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PageTransitor from '../components/PageTransitor';
import SamplePhoto from '../assets/Sidd.jpg';
import '../custom.css'


function Register() {
  const [transitor, setTransitor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [data, setData] = useState(null);
  const [userCredentials, setUserCredentials] = useState({
    username: '',
    email: '',
    fullName: '',
    password: '',
    avatar: SamplePhoto,
  });

  const registerUser = async (userCredentials) => {
    try {
      setLoading(true);
      console.log('Sending Request:', userCredentials);
      const response = await axios.post('/api/user/register-user', userCredentials);
      console.log('Response received:', response);
      setData(response.data.data);
      if (response.statusText == 'OK' || response.status == 200 || response.status == 201) {
        setTransitor(true)
      }
    } catch (error) {
      if (error.response) {
        if (
          error.response.status === 400 &&
          error.response.data.message.includes('Username already taken')
        ) {
          setMessage('This username is already taken. Please choose another one.');
        } else {
          setMessage(error.response.data.message || 'Registration failed');
        }
      } else {
        setMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await registerUser(userCredentials);
  };

  useEffect(() => {
    console.log('DATA', data);
  }, [data]);

  return (
    <div
      className={`max-w-[95%] sm:w-4xl lg:w-7xl min-w-[50%] mx-auto h-[85vh] bg-purple-800 rounded-md flex ${
        transitor ? 'blurred-background' : ''
      }`}
    >
      <div
        className={`w-[50%] h-full bg-slate-300 text-black p-5 hidden md:flex rounded-l-md rounded-bl-md flex-col relative`}
      >
        <span className="text-3xl cursor-pointer">
          Hello Dear, <span className="text-purple-900 font-bold">Welcome</span> to{' '}
          <span className="text-4xl bg-slate-900 p-1 rounded-md text-purple-400">NOTEBUILD</span>
        </span>
        <h1>You are </h1>
        <img className="absolute -bottom-3 rotate-12 -left-13" src={RegisterHelloGif} width={300} />
      </div>

      <div className="w-full sm:mx-10 md:mx-0 md:w-[50%] rounded-r-xl rounded-br-xl p-4 text-white flex-col">
        <div className="w-full flex justify-center mb-10 mt-5">
          <div className="border-b-2 w-[60%] flex justify-center">
            <span>
              Register to <span className="text-xl text-purple-900 bg-white p-1 rounded">Become</span> our
              Member
            </span>
          </div>
        </div>
        <form onSubmit={handleFormSubmit} className="bg-purple-950 px-10 py-10 flex flex-col gap-4 w-full rounded-2xl">
          {/* Username */}
          <div className="relative w-full sm:w-[60%]">
            <input
              type="text"
              name="username"
              id="username"
              value={userCredentials.username}
              onChange={handleInputChange}
              className="peer h-10 w-full border-b-2 bg-transparent outline-none px-2 py-1 text-white focus:border-blue-500 valid:border-blue-500"
              placeholder=" "
              required
            />
            <label
              htmlFor="username"
              className="absolute text-md cursor-pointer left-2 top-1/2 transform -translate-y-1/2 text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-md peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500 peer-valid:top-0 peer-valid:text-sm peer-valid:text-blue-500"
            >
              Username
            </label>
          </div>

          {/* Email */}
          <div className="relative w-full sm:w-[60%]">
            <input
              type="text"
              name="email"
              id="email"
              value={userCredentials.email}
              onChange={handleInputChange}
              className="peer h-10 w-full border-b-2 bg-transparent outline-none px-2 py-1 text-white focus:border-blue-500 valid:border-blue-500"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="absolute text-md cursor-pointer left-2 top-1/2 transform -translate-y-1/2 text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-md peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500 peer-valid:top-0 peer-valid:text-sm peer-valid:text-blue-500"
            >
              Email
            </label>
          </div>

          {/* Full Name */}
          <div className="relative w-full sm:w-[60%]">
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={userCredentials.fullName}
              onChange={handleInputChange}
              className="peer h-10 w-full border-b-2 bg-transparent outline-none px-2 py-1 text-white focus:border-blue-500 valid:border-blue-500"
              placeholder=" "
              required
            />
            <label
              htmlFor="fullName"
              className="absolute text-md cursor-pointer left-2 top-1/2 transform -translate-y-1/2 text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-md peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500 peer-valid:top-0 peer-valid:text-sm peer-valid:text-blue-500"
            >
              Full Name
            </label>
          </div>

          {/* Password */}
          <div className="relative w-full sm:w-[60%]">
            <input
              type="password"
              name="password"
              id="password"
              value={userCredentials.password}
              onChange={handleInputChange}
              className="peer h-10 w-full border-b-2 bg-transparent outline-none px-2 py-1 text-white focus:border-blue-500 valid:border-blue-500"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="absolute cursor-pointer text-md left-2 top-1/2 transform -translate-y-1/2 text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-md peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500 peer-valid:top-0 peer-valid:text-sm peer-valid:text-blue-500"
            >
              Password
            </label>
          </div>

          <div className="text-sm">
            {message && <div className='text-red-500'>{message}</div>}
          </div>

          <div className="w-full flex justify-center mt-1">
            <button
              type="submit"
              disabled={loading}
              className={`bg-purple-500 text-white p-2 rounded w-[100px] transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-400 cursor-pointer'
              }`}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>

          <div className="w-full text-center flex gap-2 justify-center">
            <span className="text-sm">Already Have an Account ?</span>
            <span className="text-sm hover:text-purple-300 cursor-pointer">
              <Link to="/user/login">Login</Link>
            </span>
          </div>

          <div className="w-full text-center flex gap-2 justify-center">
            <input required type="checkbox" name="agreeTermsCondition" id="agreeTermsCondition" />
            <span className="text-sm">Agree our Terms and Conditions</span>
            <span className="text-sm hover:text-purple-300 cursor-pointer">
              <Link to="/terms-and-conditions">Terms</Link>
            </span>
          </div>
        </form>
      </div>

      {transitor && <PageTransitor />}
    </div>
  );
}

export default Register;
