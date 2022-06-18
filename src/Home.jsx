

import Headbanner from './frontComponent/Headbanner';
import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import FbLoginHooks from "./frontComponent/fbloginhook"
import LoginHooks from './frontComponent/LoginHooks';
import Footer from './frontComponent/Footer';
import Header from './frontComponent/Header';
function Home(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [color, setcolor] = useState("coral")
  const [poploginshow, setpoploginshow] = useState(false)


  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  function closebtn() {
    props.removeerrbox(false)
    props.removepopup(false)



  }















  async function userName() {


    if (validateEmail(name) && name !== "" && password !== "") {
      props.loginhandler(name, password)
      props.mailfillds("")

    } else if (password === "" && name !== "" && validateEmail(name)) {
      props.passwerr("Password is required")
      props.mailfillds("")
      props.changeemail("");
    } else if (password === "" && name !== "" && !validateEmail(name)) {
      props.passwerr("Password is required")
      props.changeemail("Email is not valid")
      props.mailfillds("")

    } else if (password !== "" && name !== "" && !validateEmail(name)) {
      props.passwerr("")
      props.changeemail("Email is not valid")
      props.mailfillds("")

    } else if (password !== "" && name === "" && !validateEmail(name)) {
      props.passwerr("")
      props.changeemail("Email required")
      props.mailfillds("")

    } else {
      props.passwerr("Password is required")
      props.mailfillds("Email is required")
      props.changeemail("");



    }






  }

  const validateEmail = (email) => {
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }

  function emailclick(e) {

    // ( email !== validaionemail?setvalidaionemailmsg("enter the valid email"):setvalidaionemailmsg("") )
    setName(e.target.value);
    // if(e.target.value === ""){
    //   props.mailfillds("mail is required")
    //   }else{
    //   props.mailfillds("")
    //   }
    // setvalidaionemail(e.target.value)



    if (validateEmail(e.target.value) && password === "") {
      props.changeemail("Email valid");
      props.passwerr("Password Required")
      props.mailfillds("")
    } else if (validateEmail(e.target.value) && password !== "") {
      props.passwerr("")
      props.mailfillds("")
      props.changeemail("Email valid");
    } else if (!validateEmail(e.target.value) && password !== "") {
      props.passwerr("")
      props.mailfillds("")
      props.changeemail("Email Not Valid");
    } else if (!validateEmail(e.target.value) && password === "") {
      props.passwerr("Password Required")
      props.mailfillds("")
      props.changeemail("Email Not Valid");
    } else if (!validateEmail(e.target.value) && e.target.value === "" && password !== "") {
      props.passwerr("")
      props.mailfillds("")
      props.changeemail("Email required");
    } else if (!validateEmail(e.target.value) && e.target.value === "" && password === "") {
      props.passwerr("")
      props.mailfillds("")
      props.changeemail("Email required");
    } else {
      props.passwerr("Password Required")
      props.mailfillds("")
      props.changeemail("");
    }
  }
  function passcheck(e) {
    if (e.target.value === "") {
      props.passwerr("Password is required")
      setcolor("coral")
      setPassword("");
    } else {
      props.passwerr("")
      setPassword(e.target.value)
      setcolor("#fd6730")
    }
  }

  function regis() {
    props.removepopup(false)

  }
  useEffect(() => {
    window.sessionStorage.setItem("navlink", "home")
    document.addEventListener("keydown", function (event) {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        document.getElementById("submit-element").click();
      }
    });
  }, []);
  useEffect(() => {
    var i = 0;
    var j=0;
    var txt = 'THE NEVER';
    var txt1 = 'ENDING GAME'
    var speed = 200;

    function typeWriter() {

      if (i < txt.length) {
        document.getElementById("first").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }else if(j < txt1.length){
        document.getElementById("second").innerHTML += txt1.charAt(j);
        j++;
        setTimeout(typeWriter, speed);
      }
    }
    typeWriter()
  },[])

  return (
    <>

      <div className="bannerbox">

        {/* <img src="../images/rahul-raghav-design_03.jpg" style={{width:"100%",position: "absolute"}}/> */}
        <Header loginshow={setpoploginshow} />

        {poploginshow ? <>
          <div className='modalmaindiv' id='welcomeDiv'>
            <div className="modaldiv">

              <div className="cardbox" >


                <div className='container-fluid' >
                  <div className='maincontainer'  >

                    {props.loader ? <div className="loader-wrapper2" id="loaderbox">
                      <div className="loader"></div></div> : ""}
                    <div className='formbox' style={{ height: "100%" }}>

                      <div className='formboxs ' style={{ backgroundColor: "white", borderRadius: "17px", width: "100%" }} >
                        <i className='fa fa-close' style={{ float: "right", transform: "translate(13px,-17px)", fontSize: "20px", cursor: "pointer" }} onClick={() => { setpoploginshow(false) }}></i>
                        <p className="text-center" style={{ transform: "translateX(12px)", fontSize: "25px" }}><b>Login to Ne</b>-<i>Lite</i></p>

                        <p className='text-center'> <b>Get Started</b></p>
                        <form className='centerbox '  >
                          <input type="text" placeholder='Email' name='name' velue={name} onChange={emailclick} autoComplete="off" />
                          <span style={{ color: "red" }}><b>{props.emailcheck}{props.updatefill}</b></span>
                          <div className='passwordbox'>
                            <input className='passinputbox' type={passwordShown ? "text" : "password"} name='password' placeholder='Password' velue={password} onChange={passcheck} />
                            <i className="far fa-eye   field-icon" id="togglePassword" onClick={togglePasswordVisiblity}  ></i>
                            <span style={{ color: "red" }}><b>{props.err}</b></span>
                          </div>
                          <Link to='/ForgotPassword'>    <p className='forgot' style={{ color: "black" }}><b>Forgot Password?</b></p></Link>
                          <div className='centered'>
                            <Button className=' btnbox text-center mb-3' id="submit-element" onClick={userName}  >Login</Button>

                            <p><b>New User? Click here for <Link to='/Register' onClick={regis} style={{color:"white"}}>Sign Up</Link></b></p>
                            <div className="flex-container">
                              <FbLoginHooks showloader={props.setloader} />
                              &nbsp;&nbsp;
                              <LoginHooks showloader={props.setloader} />
                            </div>

                            <b><p>By Continuing you agree to the <br /><a href='https://ne-games.com/terms_and_conditions' rel="noreferrer" target={"_blank"} style={{color:"white"}}>Terms of Services</a> and<a href='https://ne-games.com/privacy_policy' rel="noreferrer" target={"_blank"} style={{color:"white"}}> Privacy Policy</a></p></b>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div>
                      {props.popup ?
                        <div className='modalmaindiv' id='welcomeDiv'>
                          <div className='modaldiv'>
                            <div className=" cardbox " style={{ backgroundColor: color }} >
                              <div className='eorriconbox'><i class="fas fa-exclamation-triangle"></i></div>
                              <br />
                              <p className='text-center text-white'>{props.err}</p>
                              <br />
                              <div className='mainerrorclosebtn'>
                                <div class="errorclosebtn " onClick={closebtn}><p>OK</p></div>
                              </div>

                            </div>
                          </div>
                        </div>

                        : ''}</div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </> : ""}
        <div className='row'>
          <div className='col-md-6'>
            <div className="headertextbox">
              {/* <h3 className='thenever'>
          THE NEVER ENDING GAME <span style={{fontSize:"18px"}}>(NE <i>Lite</i>)</span></h3> */}

              <div style={{width:"500px"}}>
              <p className="playheading " id="first"></p>
              <p className="playheading" id="second"></p>
              </div>
              <p className="topheadinpera">NE-<i>Lite</i></p>

            </div>
          </div>
          <div className='col-md-6'>
            <div className="headertextbox1">
              <img src="./Newdesign/banner-img.png" height={"550px"} />

            </div>
          </div>
        </div>
      </div>




      <Headbanner />




      <Footer />
    </>
  )
}
export default Home