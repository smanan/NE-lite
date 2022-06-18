import React, { useState, useEffect } from 'react'
export default function Sound(props) {


  const [soundon, setsoundon] = useState(window.sessionStorage.getItem("sound"))
  const [notificationon, setnotificationon] = useState(false)

  const [playing, setplaying] = useState(window.sessionStorage.getItem("music"))

  function toggle1() {
    if (soundon === "true") {
      setsoundon("false")
      window.sessionStorage.getItem("sound", "false")

    } else {
      setsoundon("true")

      window.sessionStorage.getItem("sound", "true")
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
      <div className='modalmaindiv2' id='exitmodal'>
        <div className='modaldiv ' style={{ width: "650px" }} >
          <div className="modal-content modal-lg" style={{ height: "auto", borderRadius: "10px", backgroundImage: "linear-gradient(#977f72, #c3a26e)" }}>
            <div className="modal-body " style={{ textAlign: "center" }}>
              <div className='row' >
                <div className='col-md-11'>
                  <h2 className='text_color   marginnone' style={{ color: "#fff", marginRight: "-50px", fontWeight: "700" }}>Settings</h2>
                </div>
                <div className='col-md-1'>
                  <h3 className='text_color ' style={{ color: "white", cursor: "pointer" }}><i className="fa fa-times-circle" onClick={() => { props.settinghide(false) }}></i></h3>
                </div>
              </div>
              <br/>
              <br/>
              <div className="row">
                <div className='col-md-4'>
                  {soundon === "true" ? <div className="on" onClick={toggle1}><i className="fa fa-volume" style={{ fontSize: "40px", cursor: "pointer" }} ></i></div> : <div className="off" onClick={toggle1}><i className="fa fa-volume-slash" style={{ fontSize: "40px", cursor: "pointer" }}  ></i></div>}<span><b class="color-white">Sound</b></span>
                </div>
                <div className='col-md-4'>
                  {playing === "true" ? <div className="on" onClick={toggle}><i className="fas fa-music" style={{ fontSize: "35px", cursor: "pointer" }} ></i></div> : <div className="off" onClick={toggle}><img src="./musicoff.png" height="40px" width="40px" style={{ cursor: "pointer", marginTop: '-7px' }} alt=""/></div>} <span><b class="color-white">Music</b></span>
                </div>
                <div className='col-md-4'>
                  {notificationon ? <div className="on"><i className="fa fa-bell" style={{ fontSize: "40px", cursor: "pointer" }} onClick={() => { setnotificationon(false) }}> </i></div> : <div className="off"><i className="fa fa-bell-slash" style={{ fontSize: "40px", cursor: "pointer" }} onClick={() => { setnotificationon(true) }}></i></div>}<span><b class="color-white">Notification</b></span>
                </div>
              </div>
              <br />
              <a href="https://ne-games.com/ticket" rel="noreferrer" target={"_blank"} style={{ textDecoration: "none", color: "black" }}>
                <div className="row">
                  <div className="col-md-3" >
                    <img src="./fingure.png" height="110px" width="80px" alt=""/>

                  </div>
                  <div className="col-md-7 " style={{ textAlign: "left" }}>
                    <h3 className='textcenter color-white'><b>Feedback</b></h3>
                    <p className='color-white'><b>Send us any feedback you would like</b></p>
                    <p className='color-white'>Please use the "Suggest a Word" link in the menu on the profile page to suggest a new word and meaning</p>
                  </div>
                </div>
              </a>

            </div>
          </div>
        </div>
      </div>



    </>
  )
}
