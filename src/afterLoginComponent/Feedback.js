import React, { useState, useEffect, useRef } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom"
import Menubar from './Menubar';
import Sound from "./Sound"


export default function Feedback(props) {
  const [settingshow, setsettingshow] = useState(props.setting)

  const imagefile = useRef()

  const [name, setname] = useState("")




  const [email, setemail] = useState("")
  const [mobile, setmobile] = useState("")
  const [message, setmessage] = useState("")

  const [color1, setcolor1] = useState("")
  const [error, seterror] = useState("")
  const [popshow, setpopshow] = useState(false)
  const [catcherror, setcatcherror] = useState(false)
  useEffect(() => {
    let bodyElement = document.getElementsByTagName('body')[0];
    bodyElement.className = "Dashbord";
  })
  const validateEmail = (email) => {
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }

  async function editprofile() {
    if (name === "") {
      seterror("Name is required")
      setpopshow(true)
      setcolor1("#C70100")
    } else if (email === "") {
      seterror("Email is required")
      setpopshow(true)
      setcolor1("#C70100")
    } else if (email !== "" && !validateEmail(email)) {
      seterror("Email is Not Valid")
      setpopshow(true)
      setcolor1("#C70100")

    
    } else if (message === "") {
      seterror("Message is required")
      setpopshow(true)
      setcolor1("#C70100")
    } else {
      var myHeaders = new Headers();
      myHeaders.append(
        'APPKEY',
        'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
      );

      var formdata = new FormData();
      formdata.append('name', name);
      formdata.append('email', email);
      if(mobile === ""){
        formdata.append('mobile','88888888'); 
      }else{
        formdata.append('mobile',mobile);
      }
      
      formdata.append('message', message)
      formdata.append("user_id", window.sessionStorage.getItem("id"))




      const url = `${process.env.REACT_APP_URL}/api/feedback`


      await fetch(url, {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      }).then((response) => response.json())
        .then(async (response) => {
          console.log(response)
          if (response.status === 200 && response.message === "Success") {

            seterror(response.success_message)
            setpopshow(true)
            setcolor1("#00c767")

          } else {
            console.log(response.error_message)

            seterror(response.error_message)
            setpopshow(true)
            setcolor1("#C70100")




          }
        }).catch((err) => {
          console.log(err)
          setcatcherror(true)
          seterror("Please check all Field")

          setcolor1("#C70100")
        })
    }
  }


  useEffect(() => {
    document.addEventListener("keydown", function (event) {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        document.getElementById("submit-editprofile").click();


      }
    });
  }, []);

  return <>
    <Menubar setpop={setsettingshow} audioRef={props.audio} />


    {catcherror ? <>
      <div className='modalmaindiv' id='welcomeDiv'>
        <div className='modaldiv'>
          <div className=" cardbox " style={{ backgroundColor: color1 }} >
            <div className='eorriconbox'><i className="fa fa-exclamation-triangle"></i></div>


            <br />
            <h2 className='text-center text-white'>{error}</h2>
            <br />
            <div className='mainerrorclosebtn'>
              <div className="errorclosebtn " onClick={() => { setpopshow(false); window.location.reload() }}><p>OK</p></div>
            </div>

          </div>
        </div>
      </div>

    </> :
      <>
        <div className='container-fluid'>

          <div className='formbox1'>

            <div className='formboxs'>
              <h2 className="text-center" style={{ color: "#fff" }}>Feedback</h2>
              <form className='centerbox'>
                <div className='row'>

                  <div className='col-md-12'>
                    <input type="text" name="name" className='feddback-mar' placeholder='Name*' value={name} onChange={(e) => { setname(e.target.value) }} />
                  </div>
                </div>


                <div className="row">
                  <div className="col-md-12">
                    <input type="email" name="town" className='feddback-mar' placeholder='Email*' value={email} onChange={(e) => { setemail(e.target.value) }} /><br />

                  </div>
                </div>
                <div className='row'>
                  <div className="col-md-12">
                    <input type="number" name="state" className='feddback-mar' placeholder='Phone Number(optional)' value={mobile} onChange={(e) => { setmobile(e.target.value.length < 11 ? e.target.value : mobile) }} /><br />

                  </div>
                </div>


                <textarea type="text" name="bio" className='feddback-mar feddback-textarea' placeholder='Message' value={message} onChange={(e) => { setmessage(e.target.value) }}></textarea>
                <br />

                <span className='feedbackno'>{String(message.length)}/{500-message.length}</span>



                <div className='centered' >
                  <Button className='  btnbox text-center mb-3' id="submit-editprofile" onClick={editprofile}>Submit</Button>
                  <br />




                </div>
              </form>

            </div>

          </div>

        </div>
        {popshow ? <>
          <div className='modalmaindiv2' id='welcomeDiv'>
            <div className='modaldiv'>
              <div className=" cardbox " style={{ backgroundColor: color1 }} >
                {color1 === "#C70100" ? <><div className='eorriconbox'><i className="fa fa-exclamation-triangle"></i></div></> : <><div className='eorriconbox'><i className="fa fa-badge-check"></i></div></>}



                <br />
                <h2 className='text-center text-white'>{error}</h2>
                <br />
                <div className='mainerrorclosebtn'>
                  {color1 === "#C70100" ? <><div className="errorclosebtn " onClick={() => { setpopshow(false) }}><p>OK</p></div></> :
                    <Link to="/Dashboard" style={{ textDecoration: "none" }}><div className="errorclosebtn1 " onClick={() => { setpopshow(false) }}><p>OK</p></div></Link>}

                </div>

              </div>
            </div>
          </div>
        </> : ""}
      </>}

  </>;


}
