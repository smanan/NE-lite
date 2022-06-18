import React, { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer';
import FbLoginHooks from "./fbloginhook"
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import LoginHooks from './LoginHooks';
export default function Nelite(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [color, setcolor] = useState("coral")
  const [poploginshow, setpoploginshow] = useState(false)

  const [showimgdata, setshowimgdata] = useState("./images/historyscreen.png")

  // const[validaionemail,setvalidaionemail]= useState()
  useEffect(() => {
    let bodyElement = document.getElementsByTagName('body')[0];
    bodyElement.className = "Dashbord";
  })

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
    window.sessionStorage.setItem("navlink", "nelite")
    document.addEventListener("keydown", function (event) {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        document.getElementById("submit-element").click();
      }
    });
  }, []);


  function showimage(e) {

    setshowimgdata(e.target.src)
    console.log(e.target.src)

  }

  return (

    <div>

      <Header loginshow={setpoploginshow} />

      {poploginshow ? <>
        <div className='modalmaindiv' id='welcomeDiv'>
          <div className="modaldiv">

            <div className="cardbox" >


              <div className='container-fluid' >
                <div className='maincontainer'  >
                  {/* <img src="./images/Loading.gif" height={"100px"}/> */}
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

                          <p><b>New User? Click here for <Link to='/Register' onClick={regis} style={{ color: "white" }}>Sign Up</Link></b></p>
                          <div className="flex-container">
                            <FbLoginHooks showloader={props.setloader} />
                            &nbsp;&nbsp;
                            <LoginHooks showloader={props.setloader} />
                          </div>

                          <b><p>By Continuing you agree to the <br /><a href='https://ne-games.com/terms_and_conditions' rel="noreferrer" target={"_blank"} style={{ color: "white" }}>Terms of Services</a> and<a href='https://ne-games.com/privacy_policy' rel="noreferrer" target={"_blank"} style={{ color: "white" }}> Privacy Policy</a></p></b>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div>
                    {props.popup ?
                      <div className='modalmaindiv' id='welcomeDiv'>
                        <div className='modaldiv'>
                          <div className=" cardbox " style={{ backgroundColor: color }} >
                            <div className='eorriconbox'><i className="fas fa-exclamation-triangle"></i></div>
                            <br />
                            <p className='text-center text-white'>{props.err}</p>
                            <br />
                            <div className='mainerrorclosebtn'>
                              <div className="errorclosebtn " onClick={closebtn}><p className="footerp">OK</p></div>
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

      {/* <p className="text-center"> Nelite</p> */}

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">

            <div className="row">

              <div className="col-md-6 mb-4">



                <div className="flex-container" >
                  <div className="rowes" style={{ border: "3px solid #1c9ce5", width: "20%", marginRight: "10px", padding: "10px" }}>
                    <div className="column mb-3">
                      <img src="./images/historyscreen.png" alt="Nature" style={{ width: "100%" }} name="../assets/images/1637563769.jpg" onClick={showimage} />
                    </div>
                    <div className="column  mb-3">
                      <img src="./images/winningscreen.png" alt="Snow" style={{ width: "100%" }} name="../assets/images/1637563753.jpg" onClick={showimage} />
                    </div>
                    <div className="column mb-3">
                      <img src="./images/losescreen.png" alt="Mountains" style={{ width: "100%" }} name="../assets/images/1637563734.jpg" onClick={showimage} />
                    </div>
                    <div className="column mb-3">
                      <img src="./images/playscreen.png" alt="Lights" style={{ width: "100%" }} name="../assets/images/1637563714.jpg" onClick={showimage} />
                    </div>
                  </div>

                  <div className="">
                    {/* <span className="closebtn">&times;</span> */}
                    <img src={showimgdata} style={{ width: "100%" }} />

                  </div>

                </div>

              </div>



              <div className="col-md-6">

                <p className="footerp"><b>NE <i>Lite</i></b></p>

                <p className="footerp"><i className="fas fa-users" style={{ color: "#137ab5" }}></i> Players: Solo Play</p>
                <br />
                <p className="footerp"> <i className="fas fa-child" style={{ color: "#137ab5" }} ></i> Age: 7 upwards</p>
                <br />
                <p className="footerp"> <i className="far fa-arrows-alt" style={{ color: "#137ab5" }} ></i> Genre: Educational, English</p>
                <br />
                <p className="footerp"><b>Standard Delivery:</b> Instant download!</p>
                <p className="footerp"><b>Details:</b> Online Competitive Word Game</p>
                <br />
                <div className="mainbutton  flex-container">
                  <a href='https://youtu.be/fO9Zsk2YYwM' rel="noreferrer" target={"_blank"} className="active headbutons text-white nav-link text-center"> Watch Video</a>&nbsp; &nbsp;
                  <Link to="/Register" className="active headbutons1 text-white nav-link text-center"> Register to play</Link>
                </div>
              </div>





            </div>
            <br />

            <div className='flex-container '>

              <div style={{ marginRight: "5px" }}>
                <img src="./images/historyscreen.png" height={"360px"} className="d-block w-100" alt="..." />
              </div>

              <div style={{ marginRight: "5px" }}>
                <img src="./images/winningscreen.png" height={"360px"} className="d-block w-100" alt="..." />

              </div>

              <div style={{ marginRight: "5px" }}>
                <img src="./images/losescreen.png" height={"360px"} className="d-block w-100" alt="..." />

              </div>

              <div style={{ marginRight: "5px" }}>
                <img src="./images/playscreen.png" height={"360px"} className="d-block w-100" alt="..." />

              </div>

            </div>


          </div>
          <div className="col-md-4  mt-3  sideborder" >
            <p className="footerp"><b>NE <i>Lite</i>  BASIC PRINCIPLES</b></p>
            <p className="footerp">(watch the video for a visual explanation)</p>
            <br />
            <p className="footerp">You take turns with the computer playing letters towards making a word of more than three letters.</p>
            <br />
            <p className="footerp">The computer always plays the first letter.</p>
            <p className="footerp"><b>You win and earn points</b>, if you can make computer play a letter that ends a word.</p>
            <br />
            <p className="footerp"><b>You lose and lose points</b>, if you play a letter that ends a word or play a letter from which a word cannot be made.</p>
            <br />
            <p className="footerp"><b>There are four difficulty levels:</b></p>
            <p className="footerp"><b>Easy Level</b> - You can only play letters behind</p>
            <p className="footerp"><b>Medium Level</b> - You can play letters in front and behind</p>
            <p className="footerp"><b>Expert Level</b> - You can play letters in front of, behind and in-between letters already placed </p>
            <p className="footerp">but must keep all letters in the same order</p>
            <p className="footerp"><b>Genius Level </b>- you can play letters anywhere but letters may then be re-arranged.</p>
            <br />
            <p className="footerp">These difficulty levels mean that players can find the level of difficulty that suits them with </p>
            <p className="footerp">easy level being playable by children as young as seven or eight and genius level </p>
            <p className="footerp">challenging the very best word-smiths.</p>
            <br />
            <p className="footerp"><b>AGE, LOCAL, NATIONAL and WORLDWIDE RANKINGS</b></p>
            <p className="footerp">The points you win as you play rank you by Age (Under 11, Under 15, Under 18 and All</p>
            <p className="footerp">Ages) locally (best in your state, county or province), nationally (best in your country) and </p>
            <p className="footerp">worldwide (best in the world)</p>
            <br />
            <p className="footerp"><b>THE WONDERFUL “VOCABULARY CENTRE” & MEANINGS</b></p>
            <p className="footerp">Throughout play, the game shows the meanings of all words and lists all the words you </p>
            <p className="footerp">didn’t know in the “Vocabulary Centre” along with their meanings so that you can take your </p>
            <p className="footerp">time and go back over the words you didn’t know and learn them in your own time.  What a </p>
            <p className="footerp">wonderful educational tool</p>


          </div>


        </div>


      </div>

      <br />


      <Footer />
    </div>
  )
}
