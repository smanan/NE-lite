import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import LoginHooks from './LoginHooks';


const NewLogin = (props) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const [color, setcolor] = useState("coral")

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);


    };

    function closebtn() {
        props.removeerrbox(false)
        props.removepopup(false)
        document.getElementById('welcomeDiv').style.display = 'none';



    }

    async function userName() {


        if  (name !== "" && password !== "") {
            props.loginhandler(name, password)
            props.mailfillds("")

        } else if (password === "" && name !== "" ) {
            props.passwerr("Password is required")
            props.mailfillds("")
            props.changeemail("");
        } 
        else if (password === "" && name !== "") {
            props.passwerr("Password is required")
            props.changeemail("Email is not valid")
            props.mailfillds("")

        } 
        else if (password !== "" && name !== "" ) {
            props.passwerr("")
            props.changeemail("Email is not valid")
            props.mailfillds("")

        }
         else if (password !== "" && name === "") {
            props.passwerr("")
            props.changeemail("Email required")
            props.mailfillds("")

        }else if (password !== "" && name === "") {
            props.passwerr("")
            props.changeemail("Email required")
            props.mailfillds("")

        }
         else {
            props.passwerr("Password is required")
            props.mailfillds("Email is required")
            props.changeemail("");

        }
    }

    // const validateEmail = (email) => {
    //     var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     return regex.test(String(email).toLowerCase());
    // }

    function emailclick(e) {

        // ( email !== validaionemail?setvalidaionemailmsg("enter the valid email"):setvalidaionemailmsg("") )
        setName(e.target.value);
        // if(e.target.value === ""){
        //   props.mailfillds("mail is required")
        //   }else{
        //   props.mailfillds("")
        //   }
        // setvalidaionemail(e.target.value)



        if ( password === "") {
            // props.changeemail("Email valid");
            // props.passwerr("Password Required")
            props.mailfillds("")
        } else if (password !== "") {
            props.passwerr("")
            props.mailfillds("")
            props.changeemail("Email Required");
        } else if (password !== "") {
            props.passwerr("")
            props.mailfillds("")
            props.changeemail("Email Not Valid");
        } else if ( password === "") {
            props.passwerr("Password Required")
            props.mailfillds("")
            props.changeemail("Email Not Valid");
        } else if (e.target.value === "" && password !== "") {
            props.passwerr("")
            props.mailfillds("")
            props.changeemail("Email required");
        } else if (e.target.value === "" && password === "") {
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
        }else if(e.target.value.length < 5 ){
            props.passwerr("Password minimum length is 5")
            setcolor("coral")
            // setPassword("");
        } else if(e.target.value.length > 25 ){
            props.passwerr("Password maximum length is 25")
            setcolor("coral")
            // setPassword("");
        } 
        else {
            // if(e.target.value.length>15){
            //     e.target.value = e.target.value.subString(0,15)
            // }
            props.passwerr("")
            setPassword(e.target.value)
            setcolor("#fd6730")
        }
    }

    function regis() {
        props.removepopup(false)

    }
    return (

        <div className='login-bg-design'>
        <div className='container-fluid'>
            <div className='maincontainer'>
                {props.loader ? <div className="loader-wrapper" id="loaderbox">
                    <div className="loader"></div></div> : ""}
                <div className='formbox'>
                    <div style={{ borderRadius: '17px', width: '33%', margin: '10px'}} className='formboxs'>
                        <h3 className='text-center'><b> Login to Ne</b>-<i>Lite</i></h3>
                        <p className="text-center login-get-started"><b>Get Started</b></p>
                        <form className='centerbox'>

                        <input type="text" placeholder='Email/Username' name='name' velue={name}
                        onChange={emailclick} onKeyPress={(event) => { if (/[, ,A-Z,!#$%^&*()-+=<>|]/.test(event.key)) {event.preventDefault();} }}
                    />
                            <span style={{ color: "red" }}>{props.emailcheck}{props.updatefill}</span>


                            <div className='passwordbox'>

                                <input className='passinputbox' type={passwordShown ? "text" : "password"} name='password' placeholder='Password' velue={password}
                                    onChange={passcheck} maxlength={15} />

                                <i className="far fa-eye   field-icon" id="togglePassword" onClick={togglePasswordVisiblity}  ></i>


                                <span style={{ color: "red" }}>{props.err}</span>
                            </div>
                            <p className='forgot login-pagefortot'><Link  to='/NewForgotPassword' >Forgot Password?</Link></p>
                            <div className='centered text-dark'>
                                <Button className=' btnbox text-center mb-1' onClick={userName} style={{ backgroundColor: color }} >Login</Button>
                           
                                <LoginHooks />
                                <p class="new-login" style={{marginTop:'6px', marginbottom:'10px', fontSize: '15px'}}> New User? Click here for <Link style={{ color: 'white' }} to='/NewRegister' onClick={regis}> <b>Sign Up</b></Link></p>
                              
                                <p class="new-login" style={{ fontWeight: 'bold' }}>By Continuing you agree to the <br /><Link style={{ color: 'white' }} to='/TermsOfService'>Terms of Services </Link> and<Link style={{ color: 'white' }} to='/PrivacyPolicy'> Privacy Policy </Link></p>
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
    )
}

export default NewLogin