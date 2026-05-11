import { useState } from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';

import API from '../api/axios';

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        '/auth/login',
        formData
      );

      localStorage.setItem(
        'token',
        res.data.token
      );

      navigate('/dashboard');

    } catch (error) {

      console.log(error);

      alert('Invalid Credentials');

    }

  };


  return (

    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        background: '#f1f5f9',
      }}
    >

      <div
        className="bg-white shadow-sm p-5"
        style={{
          width: '430px',
          borderRadius: '24px',
        }}
      >

        <div className="mb-5">

          <h1
            className="fw-bold mb-2"
            style={{
              color: '#0f172a',
              letterSpacing: '-1px',
            }}
          >
            Welcome back
          </h1>

          <p
            style={{
              color: '#64748b',
            }}
          >
            Login to continue
          </p>

        </div>


        <form onSubmit={handleSubmit}>

          <div className="mb-4">

            <label className="form-label fw-semibold mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="form-control form-control-lg"
              onChange={handleChange}
              style={{
                borderRadius: '14px',
              }}
            />

          </div>


          <div className="mb-4">

            <label className="form-label fw-semibold mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="form-control form-control-lg"
              onChange={handleChange}
              style={{
                borderRadius: '14px',
              }}
            />

          </div>


          <button
            type="submit"
            className="btn w-100 text-white fw-semibold"
            style={{
              background: '#0f172a',
              padding: '14px',
              borderRadius: '14px',
            }}
          >
            Login
          </button>

        </form>


        <p
          className="text-center mt-4"
          style={{
            color: '#64748b',
          }}
        >

          Don&apos;t have an account?

          <Link
            to="/register"
            className="ms-2 text-decoration-none fw-semibold"
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;