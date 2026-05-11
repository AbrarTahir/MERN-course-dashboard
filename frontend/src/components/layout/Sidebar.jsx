import {
  FiHome,
  FiBook,
  FiLogOut,
} from 'react-icons/fi';

function Sidebar({
  activeSection,
  setActiveSection,
  logout,
}) {

  return (

    <div
      className="d-flex flex-column justify-content-between p-4"
      style={{
        width: '260px',
        minHeight: '100vh',
        background: '#0f172a',
      }}
    >

      {/* TOP */}
      <div>

        <h3
          className="fw-bold text-white mb-5"
          style={{
            letterSpacing: '-1px',
          }}
        >
          Navigation
        </h3>


        {/* HOME */}
        <button
          className={
            activeSection === 'home'
              ? 'btn btn-light text-start mb-3 fw-semibold d-flex align-items-center'
              : 'btn text-white text-start mb-3 d-flex align-items-center'
          }
          onClick={() =>
            setActiveSection('home')
          }
          style={{
            borderRadius: '12px',
            padding: '12px 16px',
            gap: '10px',
          }}
        >

          <FiHome />

          Home

        </button>


        {/* COURSES */}
        <button
          className={
            activeSection === 'courses'
              ? 'btn btn-light text-start fw-semibold d-flex align-items-center'
              : 'btn text-white text-start d-flex align-items-center'
          }
          onClick={() =>
            setActiveSection('courses')
          }
          style={{
            borderRadius: '12px',
            padding: '12px 16px',
            gap: '10px',
          }}
        >

          <FiBook />

          Courses

        </button>

      </div>



      {/* BOTTOM LOGOUT */}
      <button
        onClick={logout}
        className="btn btn-danger d-flex align-items-center justify-content-center"
        style={{
          borderRadius: '12px',
          padding: '12px',
          gap: '10px',
        }}
      >

        <FiLogOut />

        Logout

      </button>

    </div>

  );

}

export default Sidebar;