import Navbar from './Navbar';

import Sidebar from './Sidebar';

function Layout({
  children,
  activeSection,
  setActiveSection,
  logout,
}) {

  return (

    <div
      style={{
        background: '#f8fafc',
        minHeight: '100vh',
      }}
    >

      <Navbar />

      <div className="d-flex">

        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          logout={logout}
        />

        <main
          className="w-100 p-5"
        >

          {children}

        </main>

      </div>

    </div>

  );

}

export default Layout;