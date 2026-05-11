import { useEffect, useState } from 'react';

import API from '../api/axios';

function Courses() {

  const [courses, setCourses] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });


  // Handle input change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  // Fetch courses
  const fetchCourses = async () => {

    try {

      const res = await API.get('/courses');

      setCourses(res.data);

    } catch (error) {

      console.log(error);

    }

  };


  // Create course
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        '/courses',
        formData
      );

      setFormData({
        title: '',
        description: '',
      });

      fetchCourses();

    } catch (error) {

      console.log(error);

    }

  };


  // Delete course
  const deleteCourse = async (id) => {

    try {

      await API.delete(`/courses/${id}`);

      fetchCourses();

    } catch (error) {

      console.log(error);

    }

  };


  useEffect(() => {

    fetchCourses();

  }, []);


  return (
    <div>

      <h1>Courses</h1>


      {/* FORM */}
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={formData.title}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Add Course
        </button>

      </form>

      <hr />


      {/* COURSES LIST */}
      {
        courses.map((course) => (

          <div
            key={course._id}
            style={{
              border: '1px solid black',
              marginBottom: '10px',
              padding: '10px',
            }}
          >

            <h3>{course.title}</h3>

            <p>{course.description}</p>

            <button
              onClick={() => deleteCourse(course._id)}
            >
              Delete
            </button>

          </div>

        ))
      }

    </div>
  );
}

export default Courses;