import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import { useGoogleLogout } from 'react-google-login';
// For Local server uncomment below commentid
 // const clientId =
  // '981474111172-2tnnhqurattsr3a6nmt7asp8b52a356j.apps.googleusercontent.com';
//  For testing server uncomment below commentid
//const clientId =
//'981474111172-cgnkrhht7ete180b8qq39r3h9o20rpr7.apps.googleusercontent.com';

//  For Live server server uncomment below clientid
 const clientId =
  '981474111172-leavehm46ikosquejc55ofvtnl2i9eqa.apps.googleusercontent.com';



export default function Menubar(props) {
  const onLogoutSuccess = (res) => {

    window.sessionStorage.clear();
    window.location.reload();
    window.open("/", "_self")
  };

  const onFailure = () => {
    window.sessionStorage.clear();
    window.location.reload();
    window.open("/", "_self")
  };

  function fbLogoutUser() {

    document.location.reload();
    window.sessionStorage.clear();

    window.open("/", "_self")






  }

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });
  const [soundon, setsoundon] = useState(window.sessionStorage.getItem("sound"))
  const [notificationon, setnotificationon] = useState(true)

  const [playing, setplaying] = useState(window.sessionStorage.getItem("music"))

  function toggle1() {
    if (soundon === "true") {
      setsoundon("false")
      window.sessionStorage.setItem("sound", "false")

    } else {
      setsoundon("true")

      window.sessionStorage.setItem("sound", "true")
    }
  }
  function toggle() {


    if (playing === "true") {
      setplaying("false")
      window.sessionStorage.setItem("music", "false")

    } else {
      setplaying("true")

      window.sessionStorage.setItem("music", "true")
    }


  }
  useEffect(() => {

    if (playing === "true") {
      PlayAudio()
    } else {
      pauseAudio()

    }

  }, [playing])
  const PlayAudio = () => {


    props.audioRef.play();
  };

  const pauseAudio = () => {


    props.audioRef.pause();

  };

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor:"transparent" }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/Dashboard"><img src="./images/navlogo-black.png"  height={"60px"}  alt="" style={{marginTop:"10px"}}/></Link>
    
          <h4 className='thenever' style={{marginTop:"15px",color:"white"}}> <span className="type"> <span >THE NEVER ENDING GAME <span style={{fontSize:"20px"}}>(NE <i>Lite</i>)</span></span></span> </h4>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{ border: "1px solid black" }}>
            <span className="navbar-toggler-icon">
              <i className="fas fa-bars" style={{ width: "100%", height: "50px", marginTop: "5px" }} ></i>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">


            </ul>
            <form className="d-flex">

              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/Dashboard"><img src="./images/home.png" style={{ width: "30px", height: "30px", paddingTop: "6px" ,marginRight:"20px",marginTop:"10px"}} alt=""/></Link>
                </li>
                <li className="nav-item dropdown">
                  <Link className="nav-link " to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="./Newdesign/dashboard/shopping-cart.png" style={{ width: "25px", height: "30px", paddingTop: "6px",marginRight:"20px",marginTop:"10px" }} alt="" />
                  </Link>
                  <ul className="dropdown-menu dropcart1" aria-labelledby="navbarDropdown">
                    <li className="dropdown-item"><Link to="Paymentplan"><button className='profilebutton' >Buy Game</button></Link></li>
                    <li className="dropdown-item"><Link to="Paypal"><button className='profilebutton' >Buy Hints</button></Link></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <Link className="nav-link" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="./Newdesign/dashboard/settings.png" style={{ width: "25px", height: "30px", paddingTop: "6px",marginRight:"20px",marginTop:"10px" }} alt="" />
                  </Link>
                  <ul className="dropdown-menu dropsetting1" aria-labelledby="navbarDropdown">
                    <li className="dropdown-item"><Link to="history"><button className='profilebutton' >History</button></Link></li>
                    <li className="dropdown-item"><Link to="Points"><button className='profilebutton' >Points</button></Link></li>
                    <li className="dropdown-item"><Link to="Feedback"><button className='profilebutton' >Feedback</button></Link></li>
                    <li className="dropdown-item"><Link to="#"> {playing === "true" ? <button className='profilebutton' onClick={toggle} style={{ backgroundColor: '' }}>Music</button> : <button className='profilebutton' onClick={toggle}>Music</button>}</Link></li>

                    <li className="dropdown-item"><Link to="#"> {soundon === "true" ? <button className='profilebutton' onClick={toggle1} style={{ backgroundColor: '' }}>Sound</button> : <button className='profilebutton' onClick={toggle1}>Sound</button>}</Link></li>

                   
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <Link className="nav-link" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                    <div className="profile">
                    <img src="./Newdesign/dashboard/log-out.png" alt="..." style={{
                          borderRadius: "50%", height: "30px",
                          width: "30px",marginRight:"20px",marginTop:"10px"
                        }} />
                    </div>

                  </Link>
                  <ul className="dropdown-menu dropprofile1" aria-labelledby="navbarDropdown">
                    <li><div className="dropdown-item"> <img src={window.sessionStorage.getItem("image")} onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = "./profilephoto.png";
                    }} alt="..." style={{ width: "70px", height: "70px", borderRadius: "50%", opacity: "1" }} /></div></li>
                    <li><span className="dropdown-item color-white" style={{ fontSize: "20px", fontWeight: "600", textTransform: "capitalize" }}>{window.sessionStorage.getItem("username")}</span></li>
                    <li><span className="dropdown-item color-white" style={{ fontSize: "13px", fontWeight: "600" }}> Hint: {window.sessionStorage.getItem("hints")}</span></li>

                    <li className="dropdown-item"><Link to="EditProfile"><button className='profilebutton' >Edit Profile</button></Link></li>
                    <li className="dropdown-item"><Link to="ChangesPassword"><button className='profilebutton' >Change Password</button></Link></li>

                    <li className="dropdown-item">{window.sessionStorage.getItem("logintype") === "facebook" ? <button className='signoutbutton' onClick={fbLogoutUser} >Sign Out</button> : <button className='signoutbutton' onClick={signOut} >Sign Out</button>}</li>
                  </ul>
                </li>

              </ul>

            </form>
          </div>
        </div>
      </nav>



    </>
  )
}

