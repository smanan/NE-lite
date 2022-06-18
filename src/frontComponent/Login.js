import React, { useState } from 'react'
// import Footer from './component/Footer';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import LoginHooks from './LoginHooks';


// import * as Yup from "yup";

// const Schema = Yup.object().shape({
//   password: Yup.string().required("This field is required")
// })



export default function Login(props) {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [color, setcolor] = useState("coral")

  // const[validaionemail,setvalidaionemail]= useState()


  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);


  };

  function closebtn() {
    props.removeerrbox(false)
    props.removepopup(false)
    document.getElementById('welcomeDiv').style.display = 'none';



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



  return <>
    <Header />
    <br /><br /><br /><br />

    <div  className='Newbannerbox login-bg-design'>
    <div className='container-fluid'>
      <div className='maincontainer'>
        {props.loader ? <div className="loader-wrapper" id="loaderbox">
          <div className="loader"></div></div> : ""}
        <div className='formbox' style={{ height: "100%" }}>

          <div className='formboxs p-5'>
            <h2 className="text-center">Get Startediuiiopop</h2>
            <p className='text-center'>To login or register please enter your email <br /> address or mobile number</p>


            <form className='centerbox '  >

              <input type="text" placeholder='Email' name='name' velue={name}
                onChange={emailclick}
              />
              <span style={{ color: "red" }}>{props.emailcheck}{props.updatefill}</span>



              {/* <span style={{color:"red"}} ></span> */}

              <br />

              <div className='passwordbox'>

                <input className='passinputbox' type={passwordShown ? "text" : "password"} name='password' placeholder='Password' velue={password}
                  onChange={passcheck} />

                <i className="far fa-eye   field-icon" id="togglePassword" onClick={togglePasswordVisiblity}  ></i>


                <span style={{ color: "red" }}>{props.err}</span>
              </div>

              <br />
              <p className='forgot'><Link to='/ForgotPassword'>Forgot Password?</Link></p>
              <div className='centered'>
                <Button className=' btnbox text-center mb-3' onClick={userName} style={{ backgroundColor: color }} >Login</Button>
                {/* disabled={name !== "" && password !== ""?false:true} */}
                <br />
                <Link to="/">Have a Referral Code</Link>

                <br /><br />
                <div className="line"></div>

                <br />
                <p><Link to='/Register' onClick={regis}>New user? click here for sign Up</Link></p>
                <div className="flex-container">
                  <span className="iconbox">
                    <i className="fab fa-facebook-f text-white"></i>
                  </span>
                  &nbsp;
                  <LoginHooks />

                </div>
                <br />
                <p>By Continuing you agree to the <br /><Link to='/'>Terms of Services</Link> and<Link to='/'> Privacy Policy</Link></p>
              </div>
            </form>


          </div>

        </div>

        <div>{props.popup ?
          <div className='modalmaindiv' id='welcomeDiv'>
            <div className='modaldiv'>
              <div className=" cardbox " style={{ backgroundColor: color }} >

                <div className='eorriconbox'><i className="fas fa-exclamation-triangle"></i></div>
                <br />
                <h2 className='text-center text-white'>{props.err}</h2>
                <br />
                <div className='mainerrorclosebtn'>
                  <div className="errorclosebtn " onClick={closebtn}><p>OK</p></div>
                </div>

              </div>
            </div>
          </div>

          : ''}</div>

      </div>
    </div>
    </div>

    <br /><br />

    <Footer />




  </>
}

