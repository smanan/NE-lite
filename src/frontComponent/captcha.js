import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
function Captcha() {
  const [user, setUser] = useState({ username: "" });
  const [name1, setName1] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");
  const [captcha, setCaptcha] = useState(generateString(6))
  const [error, seterror] = useState("")
  const [success, setSuccess] = useState("")
  function generateString(length) {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  let handleChange = (e) => {
    let value = e.target.value;

    setUser({
      username: value
    });
  }
  function updateCaptcha() {
    setCaptcha(generateString(6))
  }
  const validateEmail = (email) => {
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }

  async function handleSubmit() {
    console.log(user.username, captcha, name1, email, mobileNumber, message)
    if (captcha === user.username) {
      if (name1 === "") {
        seterror("Name is required")
        setTimeout(() => {
          seterror("")
        }, 2000)
      } else if (email === "") {
        seterror("Email is required")
        setTimeout(() => {
          seterror("")
        }, 2000)

      } else if (email !== "" && !validateEmail(email)) {
        seterror("Email is Not Valid")
        setTimeout(() => {
          seterror("")
        }, 2000)


      } else if (mobileNumber === "") {
        seterror("Mobile Number is required")
        setTimeout(() => {
          seterror("")
        }, 2000)

      } else if (message === "") {
        seterror("Message is required")
        setTimeout(() => {
          seterror("")
        }, 2000)

      } else {
        seterror("")
        var myHeaders = new Headers();
        myHeaders.append(
          'APPKEY',
          'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
        );
        var formdata = new FormData();
        formdata.append('name', name1);
        formdata.append('email', email);
        formdata.append('contact_no', mobileNumber);
        formdata.append('message', message);
        const url = `https://admin.ne-lite.com/api/contactSave`
        await fetch(url, {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow',
        }).then((response) => response.json())
          .then(async (response) => {

            if (response.status === 200) {
              setSuccess(response.success_message)
              seterror("")
              setName1("")
              setEmail("")
              setMobileNumber("")
              setMessage("")
              setUser({
                username: ""
              })
              setCaptcha(generateString(6))
              setTimeout(() => {
                setSuccess("")
              }, 2000)
            } else {
              console.log(response)
            }
          }).catch((err) => {
            console.log(err)
          })
      }
    } else {
      seterror("Captcha Not Matched")
      setTimeout(() => {
        seterror("")
      }, 2000)
    }
  };

  return (
    <div className="container" >
      <div className='form-group'>
        <label>Name</label>
        <input type="text" placeholder='Eg.jhon' className='form-control'
          value={name1}
          onChange={(e) => setName1(e.target.value)} />
      </div>
      <div className='form-group mt-3'>
        <label>Email</label>
        <input type="email" placeholder='eg.someone@example.com' className="form-control"
          value={email} style={{ border: "1px solid lightgray", borderRadius: "4px", height: "43px" }}
          onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-group mt-3">
        <label>Phone No</label>
        <input type='number' placeholder='+9198xxxxxx' maxLength="10" className='form-control'
          value={mobileNumber} style={{ border: "1px solid lightgray", borderRadius: "4px", height: "43px" }}
          onChange={(e) => setMobileNumber(e.target.value.length < 11 ? e.target.value : mobileNumber)} />
      </div>
      <div className="form-group mt-3">
        <label>Message</label>
        <textarea className='form-control' rows='3' maxLength="150" placeholder='Enter your Message' value={message} onChange={(e) => setMessage(e.target.value)} >

        </textarea>
      </div>
      <div className="form-group mt-3" style={{ textAlign: "center" }}>
        <div className="row">
          <div className="col-md-8" style={{ float: "right" }}>
            <p id="captcha" ><s style={{ userSelect: "none", backgroundColor: "#b5aeae", color: "white", padding: "0px 10px" }}>{captcha}</s></p>
          </div>
          <div className="col-md-2">
            <img src="./refresh.png" height="20px" width="20px" style={{ cursor: "pointer" }} onClick={updateCaptcha} alt="" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <input type="text" id="inputType" className="form-control" placeholder="Enter Captcha" value={user.username}
              name="username" onChange={handleChange} autoComplete="off"
            />
          </div>
        </div>
        <span style={{ color: "red" }}>{error}</span>
      </div>
      <button className='test_btn' type="button" onClick={handleSubmit}>SUBMIT</button>
      <div style={{ textAlign: "center" }}>
        <span style={{ color: "green" }}>{success}</span>
      </div>
    </div>
  );
}
export default Captcha;
