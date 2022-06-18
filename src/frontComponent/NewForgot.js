import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import BackButton from './BackButton';

const NewForgot = () => {
    const [error, seterror] = useState("")
    const [email, setemail] = useState("")
    const [color, setcolor] = useState("coral")
    const [disabledvalue, setdisabledvalue] = useState(true)
    const [close, setclose] = useState(false)
    const [success, setsuccess] = useState("")

    useEffect(() => {
        let bodyElement = document.getElementsByTagName('body')[0];
        bodyElement.className = "Dashbord";


    }, [])


    async function forgetpassword() {

        var myHeaders = new Headers();
        myHeaders.append(
            'APPKEY',
            'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
        );

        var formdata = new FormData();
        formdata.append('email', email);





        const url = `${process.env.REACT_APP_URL}/api/user/forgot/password`


        await fetch(url, {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow',
        }).then((response) => response.json())
            .then(async (response) => {
                if (response.status === 200) {

                    setdisabledvalue(true)
                    seterror("")
                    setclose(true)
                    setsuccess(response.success_message)
                } else {

                    setdisabledvalue(true)
                    seterror(response.error_message)

                }
            })
    }


    const validateEmail = (email) => {
        var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    }
    function checkemail(e) {
        if (e.target.value !== "") {
            if (validateEmail(e.target.value)) {
                setemail(e.target.value)
                seterror("Email Valid")
                setdisabledvalue(false)
            } else {
                setemail(e.target.value)
                seterror("Email Not Valid")
                setdisabledvalue(true)
            }
        } else {
            setemail(e.target.value)
            setdisabledvalue(true)
            seterror("Email Required")
        }

    }
    useEffect(() => {
        document.addEventListener("keydown", function (event) {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault();
                document.getElementById("submit-forgot").click();
            }
        });
    }, []);

    return (
        <div className="Newbannerbox">
        <BackButton />
        <div className='login-bg-design'>
            <div className='container-fluid'>
                <div className='maincontainer'>

                    <div className='formbox'>

                        <div className='formboxs' style={{ margin: "10px" }}>
                            <h5 className="text-center"><b>To Forget Password please enter your Email</b></h5>
                            <p  className='text-center font15px login-get-started'><b>Get Started</b></p>


                            <form className='centerbox '  >

                                <div className='passwordbox'>

                                    <input className='passinputbox' type="email" name='email' onChange={checkemail} value={email} placeholder='Enter Email'  onKeyPress={(event) => {if (/[, ,A-Z,!#$%^&*()-+=<>|]/.test(event.key)) {event.preventDefault();}}}
                                    />
                                    <p style={{ color: "red" }}>{error}</p>


                                </div>

                                <div className='centered'>
                                    <Button className=' btnbox text-center mb-3 forgot-btn-pass ' style={{ color: 'black', backgroundColor: color }} disabled={disabledvalue} id="submit-forgot" onClick={forgetpassword}> Forget Password</Button>



                                    <Link to="/"><p className='text-center'><b>Click to Login</b></p></Link>
                                </div>
                            </form>






                        </div>

                    </div>



                </div>
            </div>
            </div>
            {close ?
                 <div className='modalmaindiv' id='welcomeDiv'>
                    <div className='modaldiv'>
                        <div className=" cardbox " style={{ backgroundColor: "#00c767" }} >
                            <div className='eorriconbox'><i className="fas fa-check"></i></div>
                            <br />
                            <h2 className='text-center text-white'>{success}</h2>
                            <br />
                            <div className='mainerrorclosebtn'>
                                <div className="errorclosebtn " onClick={() => { setclose(false); window.sessionStorage.clear(); window.location.reload(); window.open("/", "_self") }}><p>OK</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div> : ""}
        </div>
    )
}

export default NewForgot