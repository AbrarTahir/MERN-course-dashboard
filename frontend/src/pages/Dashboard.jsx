import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import API from '../api/axios';

import Layout from '../components/layout/Layout';

function Dashboard() {

  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const [editingCourse, setEditingCourse] =
    useState(null);

  const [activeSection, setActiveSection] =
    useState('home');


  // AUTH CHECK
  useEffect(() => {

    const token = localStorage.getItem('token');

    if (!token) {

      navigate('/login');

    } else {

      fetchCourses();

    }

  }, []);


  // FETCH COURSES
  const fetchCourses = async () => {

    try {

      const res = await API.get('/courses');

      setCourses(res.data);

    } catch (error) {

      console.log(error);

    }

  };


  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  // EDIT COURSE
  const editCourse = (course) => {

    setEditingCourse(course);

    setFormData({
      title: course.title,
      description: course.description,
    });

    setActiveSection('courses');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

  };


  // SUBMIT FORM
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      // UPDATE
      if (editingCourse) {

        await API.put(
          `/courses/${editingCourse._id}`,
          formData
        );

        setEditingCourse(null);

      }

      // CREATE
      else {

        await API.post(
          '/courses',
          formData
        );

      }

      // RESET FORM
      setFormData({
        title: '',
        description: '',
      });

      fetchCourses();

    } catch (error) {

      console.log(error);

    }

  };


  // DELETE COURSE
  const deleteCourse = async (id) => {

    try {

      await API.delete(`/courses/${id}`);

      fetchCourses();

    } catch (error) {

      console.log(error);

    }

  };


  // LOGOUT
  const logout = () => {

    localStorage.removeItem('token');

    navigate('/login');

  };


  // CHART DATA
  const groupedCourses = {};

  courses.forEach((course) => {

    const date =
      new Date(
        course.createdAt
      ).toLocaleDateString();

    if (groupedCourses[date]) {

      groupedCourses[date] += 1;

    } else {

      groupedCourses[date] = 1;

    }

  });


  const chartData =
    Object.keys(groupedCourses).map(
      (date) => ({
        date,
        total: groupedCourses[date],
      })
    );


  return (

    <Layout
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      logout={logout}
    >

      {/* HOME SECTION */}
      {
        activeSection === 'home' && (

          <div>

            {/* HEADER */}
            <div className="mb-5">

              <h1
                className="fw-bold mb-2"
                style={{
                  color: '#0f172a',
                  letterSpacing: '-1px',
                }}
              >
                Dashboard
              </h1>

              <p
                style={{
                  color: '#64748b',
                }}
              >
                Overview of your system
              </p>

            </div>



            {/* STATS */}
            <div className="row mb-5">

              <div className="col-md-4">

                <div
                  className="bg-white shadow-sm p-4"
                  style={{
                    borderRadius: '20px',
                  }}
                >

                  <h2
                    className="fw-bold"
                    style={{
                      color: '#0f172a',
                    }}
                  >
                    {courses.length}
                  </h2>

                  <p
                    className="m-0"
                    style={{
                      color: '#64748b',
                    }}
                  >
                    Total Courses
                  </p>

                </div>

              </div>


              <div className="col-md-4">

                <div
                  className="bg-white shadow-sm p-4"
                  style={{
                    borderRadius: '20px',
                  }}
                >

                  <h2
                    className="fw-bold"
                    style={{
                      color: '#0f172a',
                    }}
                  >
                    Active
                  </h2>

                  <p
                    className="m-0"
                    style={{
                      color: '#64748b',
                    }}
                  >
                    Authentication Status
                  </p>

                </div>

              </div>

            </div>



            {/* CHART */}
            <div
              className="bg-white shadow-sm p-5"
              style={{
                borderRadius: '24px',
              }}
            >

              <div className="mb-4">

                <h4
                  className="fw-bold"
                  style={{
                    color: '#0f172a',
                  }}
                >
                  Course Analytics
                </h4>

              </div>


              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <BarChart data={chartData}>

                  <XAxis dataKey="date" />

                  <YAxis allowDecimals={false} />

                  <Tooltip />

                  <Bar
                    dataKey="total"
                    radius={[10, 10, 0, 0]}
                    fill="#3b82f6"
                    barSize={80}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        )
      }



      {/* COURSES SECTION */}
      {
        activeSection === 'courses' && (

          <div>

            {/* PAGE HEADER */}
            <div className="mb-5">

              <h1
                className="fw-bold mb-2"
                style={{
                  color: '#0f172a',
                  letterSpacing: '-1px',
                }}
              >
                Courses
              </h1>

              <p
                style={{
                  color: '#64748b',
                }}
              >
                Create and manage courses
              </p>

            </div>



            {/* FORM */}
            <div
              className="bg-white shadow-sm p-5 mb-5"
              style={{
                borderRadius: '24px',
              }}
            >

              <h4
                className="fw-bold mb-4"
                style={{
                  color: '#0f172a',
                }}
              >

                {
                  editingCourse
                    ? 'Edit Course'
                    : 'Add Course'
                }

              </h4>


              <form onSubmit={handleSubmit}>

                <div className="mb-4">

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Course title"
                    className="form-control form-control-lg"
                    style={{
                      borderRadius: '14px',
                    }}
                  />

                </div>


                <div className="mb-4">

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Course description"
                    rows="4"
                    className="form-control form-control-lg"
                    style={{
                      borderRadius: '14px',
                    }}
                  />

                </div>


                <button
                  type="submit"
                  className={
                    editingCourse
                      ? 'btn btn-warning'
                      : 'btn btn-primary'
                  }
                  style={{
                    borderRadius: '12px',
                    padding: '12px 20px',
                  }}
                >

                  {
                    editingCourse
                      ? 'Update Course'
                      : 'Add Course'
                  }

                </button>

              </form>

            </div>



            {/* COURSES TABLE */}
            <div
              className="bg-white shadow-sm p-4"
              style={{
                borderRadius: '24px',
              }}
            >

              <div
                className="d-flex justify-content-between align-items-center mb-4"
              >

                <h4
                  className="fw-bold m-0"
                  style={{
                    color: '#0f172a',
                  }}
                >
                  Course List
                </h4>

              </div>


              <div className="table-responsive">

                <table className="table align-middle">

                  <thead>

                    <tr>

                      <th>Course Name</th>

                      <th>Description</th>

                      <th>Date Created</th>

                      <th>Actions</th>

                    </tr>

                  </thead>


                  <tbody>

                    {
                      courses.map((course) => (

                        <tr key={course._id}>

                          <td className="fw-semibold">
                            {course.title}
                          </td>


                          <td
                            style={{
                              maxWidth: '300px',
                            }}
                          >
                            {course.description}
                          </td>


                          <td>

                            {
                              new Date(
                                course.createdAt
                              ).toLocaleDateString()
                            }

                          </td>


                          <td>

                            <button
                              className="btn btn-sm btn-warning me-2"
                              style={{
                                borderRadius: '10px',
                              }}
                              onClick={() =>
                                editCourse(course)
                              }
                            >
                              Update
                            </button>


                            <button
                              className="btn btn-sm btn-danger"
                              style={{
                                borderRadius: '10px',
                              }}
                              onClick={() =>
                                deleteCourse(course._id)
                              }
                            >
                              Delete
                            </button>

                          </td>

                        </tr>

                      ))
                    }

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        )
      }

    </Layout>

  );

}

export default Dashboard;