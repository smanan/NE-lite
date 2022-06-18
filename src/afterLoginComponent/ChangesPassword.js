import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Menubar from './Menubar';
import Sound from "./Sound"

export default function ChangesPassword(props) {
  const [error, seterror] = useState("")
  const [passwordmatch, setpasswordmatch] = useState("")
  const [oldpassword, setOldPassword] = useState("")
  const [newpassword, setNewpassword] = useState("")
  const [confirmpassword, setconfirmpassword] = useState("")
  const [color, setcolor] = useState("coral")
  const [disabledvalue, setdisabledvalue] = useState(true)
  const [close, setclose] = useState(false)
  const [success, setsuccess] = useState("")
  const [settingshow, setsettingshow] = useState(props.setting)

  useEffect(() => {
    let bodyElement = document.getElementsByTagName('body')[0];
    bodyElement.className = "Dashbord";
  }, [])

  function matchpassword(e) {
    setconfirmpassword(e.target.value)
    if (e.target.value === "") {
      setpasswordmatch("")
      setcolor("coral")
    } else {
      if (e.target.value === newpassword && oldpassword !== "") {
        setdisabledvalue(false)
        setpasswordmatch("Password Matched")
        setcolor("#fd6730")
      } else if (e.target.value === newpassword && oldpassword === "") {
        setpasswordmatch("Password Matched")
        setcolor("coral")
      } else {
        setpasswordmatch("Password Not Matched")
        setcolor("coral")
      }
    }
  }

  async function changepass() {
    var myHeaders = new Headers();
    myHeaders.append(
      'APPKEY',
      'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
    );

    var formdata = new FormData();
    formdata.append('password', newpassword);
    formdata.append("old_password", oldpassword)
    formdata.append("id", window.sessionStorage.getItem("id"))



    const url = `${process.env.REACT_APP_URL}/api/user/change/password`


    await fetch(url, {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    }).then((response) => response.json())
      .then(async (response) => {
        if (response.status === 200) {
          setNewpassword("")
          setOldPassword("")
          setconfirmpassword("")
          setpasswordmatch("")
          setdisabledvalue(true)
          seterror("")
          setclose(true)
          setsuccess(response.success_message)
        } else {
          setNewpassword("")
          setconfirmpassword("")
          setpasswordmatch("")
          setdisabledvalue(true)
          seterror(response.error_message)

        }
      })
  }

  useEffect(() => {
    document.addEventListener("keydown", function (event) {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        document.getElementById("submit-changepassword").click();


      }
    });
  }, []);




  return <>
    <Menubar setpop={setsettingshow} audioRef={props.audio} />

    <div className='container-fluid'>
      <div className='maincontainer'>
        <div className='formbox'>
          <div className='formboxs p-5'>
            <p className='text-center' style={{ color: "#fff", fontSize: "16px" }}><b>To change password, please enter your old password, then new password</b></p>
         
            <form className='centerbox '  >
              <div className='passwordbox'>
                <input className='passinputbox' type="password" name='password' onChange={(e) => { setOldPassword(e.target.value); seterror("") }} value={oldpassword} placeholder='Old Password' />
                <p style={{ color: "red" }}>{error}</p>
              </div>
              <div className='passwordbox'>
                <input className='passinputbox' type="password" name='password' onChange={(e) => { setNewpassword(e.target.value) }} value={newpassword} placeholder='New Password' />
              </div>
              <div className='passwordbox'>
                <input className='passinputbox' type="text" name='password' onChange={matchpassword} value={confirmpassword} placeholder='Confirm Password' autoComplete='off' />
              </div>
              <p style={{ color: "red" }}>{passwordmatch}</p>

              <div className='centered'>
                <Button className=' btnbox text-center mb-3' id="submit-changepassword" style={{ backgroundColor: color }} disabled={disabledvalue} onClick={changepass}>Change Password</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    {settingshow ?
      <Sound settinghide={setsettingshow} audioRef={props.audio} />
      : ""}
    {close ?
      <>
        <div className='modalmaindiv' id='welcomeDiv'>
          <div className='modaldiv'>
            <div className=" cardbox " style={{ backgroundColor: "#00c767" }} >
              <div className='eorriconbox'><i className="fas fa-check"></i></div>
              <br />
              <h2 className='text-center text-white'>{success}</h2>
              <br />
              <div className='mainerrorclosebtn'>
                <div className="errorclosebtn " onClick={() => { setclose(false); window.sessionStorage.clear(); window.location.reload(); window.open("/", "_self") }}><p>OK</p></div>
              </div>
            </div>
          </div>
        </div>
      </> : ""}
  </>
}
