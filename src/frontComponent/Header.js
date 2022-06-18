


import React,{useEffect} from 'react'

import { Link } from 'react-router-dom';


export default function Header(props) {

  useEffect(()=>{
    console.log(window.sessionStorage.getItem("navlink"))
  },[])
  window.addEventListener("scroll", (e) => {
    let a = window.scrollY
    if (a > 300) {
      document.querySelector(".toparoww").style.display = "none"
    } else {
      document.querySelector(".toparoww").style.display = "block"
    }

  })
  // const onLogoutSuccess = (res) => {
  //   console.log('Logged out Success',res);
  //   props.loginshow(true)

  // };

  // const onFailure = (res) => {
  //   props.loginshow(true)
  //   console.log('Logged out Failed',res);

  // };

  // const { signOut } = useGoogleLogout({
  //   clientId,
  //   onLogoutSuccess,
  //   onFailure,
  // });
  function route() {
    props.loginshow(true)
    // history.push("/")

  }
  function changenav(name) {
   
    if (name === "home") {
     window.sessionStorage.setItem("navlink","home")
    }else if(name === "about"){
      window.sessionStorage.setItem("navlink","about")
      
    }else if(name === "nelite"){
      window.sessionStorage.setItem("navlink","nelite")
      
    }else{
      window.sessionStorage.setItem("navlink","contact")
     
    }
  }


  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundImage: "black !important" }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><img src="./images/navlogo.png" height={"60px"} style={{marginTop:"10px",marginLeft:"15px"}} alt="" /></Link>
          {/* <h3 className='thenever'>
          THE NEVER ENDING GAME <span style={{fontSize:"18px"}}>(NE <i>Lite</i>)</span></h3> */}
          <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{ border: "1px solid #fff" }}>
            <span className="navbar-toggler-icon">
              <i className="fas fa-bars" style={{ width: "100%", color: "#fff", height: "50px", marginTop: "5px" }} ></i>
            </span>
          </button>
          <div className="collapse navbar-collapse  linkhoverwhite" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto   mb-2 mb-lg-0">


            </ul>
            {/* <form className="d-flex"> */}

            {window.sessionStorage.getItem("navlink") === "home" || window.sessionStorage.getItem("navlink") === null?   <ul className="navbar-nav d-flex justify-content-xl-center  w-100" style={{ marginLeft: "80px" }}>
              <li className="nav-item">
                <Link className="nav-link active linkhoverwhite  activenav" aria-current="page" to="/" style={{ fontSize: "18px", fontWeight: "700", paddingTop: "13px", color: "#fff" }} name="home" onClick={() => { changenav("home") }}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active linkhoverwhite " aria-current="page" to="/About" style={{ fontSize: "18px", fontWeight: "700", paddingTop: "13px", color: "#fff" }} name="about" onClick={() => { changenav("about") }}>About Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link linkhoverwhite " to="/Nelite" style={{ fontSize: "18px", fontWeight: "700", paddingTop: "13px", color: "#fff" }} name="nelite" onClick={() => { changenav("nelite") }}>
                  Features
                </Link>

              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link linkhoverwhite " to="/contact" style={{ fontSize: "18px", fontWeight: "700", paddingTop: "13px", color: "#fff" }} name="contact" onClick={() => { changenav("contact") }}>
                  Contact Us
                </Link>

              </li>


            </ul>:""}
            {window.sessionStorage.getItem("navlink") === "about"?   <ul className="navbar-nav d-flex justify-content-xl-center  w-100" style={{ marginLeft: "80px" }}>
              <li className="nav-item">
                <Link className="nav-link  linkhoverwhite  " aria-current="page" to="/" style={{ fontSize: "18px", fontWeight: "700", paddingTop: "13px", color: "#fff" }} name="home" onClick={() => { changenav("home") }}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link  linkhoverwhite activenav" aria-current="page" to="/About" style={{ fontSize: "18px", fontWeight: "700", paddingTop: "13px", color: "#fff" }} name="about" onClick={() => { changenav("about") }}>About Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link linkhoverwhite " to="/Nelite" style={{ fontSize: "18px", fontWeight: "700", paddingTop: "13px", color: "#fff" }} name="nelite" onClick={() => { changenav("nelite") }}>
                  Features
                </Link>

              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link linkhoverwhite " to="/contact" style={{ fontSize: "18px", fontWeight: "700", paddingTop: "13px", color: "#fff" }} name="contact" onClick={() => { changenav("contact") }}>
                  Contact Us
                </Link>

              </li>


            </ul>:""}
            {window.sessionStorage.getItem("navlink") === "nelite"?   <ul className="navbar-nav d-flex justify-content-xl-center  w-100" style={{ marginLeft: "80px" }}>
              <li className="nav-item">
                <Link className="nav-link active linkhoverwhite  " aria-current="page" to="/" style={{ fontSize: "18px", fontWeight: "700", paddingTop: "13px", color: "#fff" }}  onClick={() => { changenav("home") }}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active linkhoverwhite " aria-current="page" to="/About" style={{ fontSize: "18px", fontWeight: "700", paddingTop: "13px", color: "#fff" }}  onClick={() => { changenav("about") }}>About Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link linkhoverwhite activenav" to="/Nelite" style={{ fontSize: "18px", fontWeight: "700", paddingTop: "13px", color: "#fff" }}  onClick={() => { changenav("nelite") }}>
                  Features
                </Link>

              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link linkhoverwhite " to="/contact" style={{ fontSize: "18px", fontWeight: "700", paddingTop: "13px", color: "#fff" }}  onClick={() => { changenav("contact") }}>
                  Contact Us
                </Link>

              </li>


            </ul>:""}
            {window.sessionStorage.getItem("navlink") === "contact"?   <ul className="navbar-nav d-flex justify-content-xl-center  w-100" style={{ marginLeft: "80px" }}>
              <li className="nav-item">
                <Link className="nav-link active linkhoverwhite  " aria-current="page" to="/" style={{ fontSize: "18px", fontWeight: "700", paddingTop: "13px", color: "#fff" }}  onClick={() => { changenav("home") }}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active linkhoverwhite " aria-current="page" to="/About" style={{ fontSize: "18px", fontWeight: "700", paddingTop: "13px", color: "#fff" }}  onClick={() => { changenav("about") }}>About Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link linkhoverwhite " to="/Nelite" style={{ fontSize: "18px", fontWeight: "700", paddingTop: "13px", color: "#fff" }}  onClick={() => { changenav("nelite") }}>
                  Features
                </Link>

              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link linkhoverwhite activenav" to="/contact" style={{ fontSize: "18px", fontWeight: "700", paddingTop: "13px", color: "#fff" }}  onClick={() => { changenav("contact") }}>
                  Contact Us
                </Link>

              </li>


            </ul>:""}
            <ul className="" style={{ listStyleType: "none" }}>

              <li className="nav-item dropdown">
                <Link className="nav-link" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                  <button className='active headbuton ' as={Link} to="#" onClick={route}>Login/Register</button>

                </Link>

              </li>
            </ul>
            {/* </form> */}
          </div>
        </div>
      </nav>
      {/* <div className='container-fluid  toparoww'>
        <Navbar className='fixed-top' bg="dark" variant="dark" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#home"><img src={require('../assets/images/Frame 1 (2).png')} className="img-responsive" alt="logo" style={{ width: "100%" }} /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto justify-content-center  topnev" >
                <Nav.Link className="text-white active" as={Link} to="/" >Home</Nav.Link>
                <Nav.Link className="text-white active" as={Link} to="/about" >About</Nav.Link>
                <Nav.Link className="text-white active" as={Link} to="/Nelite" >NE <i>Lite</i></Nav.Link>
                <Nav.Link className="text-white active" as={Link} to="/contact"  >Contact</Nav.Link>

                <Nav.Link className='active headbuton text-white' as={Link} to="#" onClick={route} >Login/Register</Nav.Link>

               
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div> */}







    </>
  )
}

