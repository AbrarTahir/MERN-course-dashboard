function Navbar() {

  return (

    <nav
      className="navbar px-4 py-3 border-bottom"
      style={{
        background: '#ffffff',
      }}
    >

      <div className="container-fluid d-flex justify-content-between">

        <h4
          className="fw-bold m-1"
          style={{
            color: '#111827',
            letterSpacing: '-0.5px'
          }}
        >
          Course Portal
        </h4>

      </div>

    </nav>

  );

}

export default Navbar;