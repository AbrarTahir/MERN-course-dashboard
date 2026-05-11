import { useState } from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';

import API from '../api/axios';

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
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

      await API.post(
        '/auth/register',
        formData
      );

      alert('Registered Successfully');

      navigate('/login');

    } catch (error) {

      console.log(error);

      alert('Registration Failed');

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
          width: '450px',
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
            Create account
          </h1>

          <p
            style={{
              color: '#64748b',
            }}
          >
            Register to continue
          </p>

        </div>


        <form onSubmit={handleSubmit}>

          <div className="mb-4">

            <label className="form-label fw-semibold mb-2">
              Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="form-control form-control-lg"
              onChange={handleChange}
              style={{
                borderRadius: '14px',
              }}
            />

          </div>


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
            className="btn btn-primary w-100 fw-semibold"
            style={{
              padding: '14px',
              borderRadius: '14px',
            }}
          >
            Register
          </button>

        </form>


        <p
          className="text-center mt-4"
          style={{
            color: '#64748b',
          }}
        >

          Already have an account?

          <Link
            to="/login"
            className="ms-2 text-decoration-none fw-semibold"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Register;