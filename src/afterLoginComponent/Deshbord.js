import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from "react-router-dom";
import Menubar from './Menubar'
import Sharehook from './sharehook';
import Bannerad from './bannerad';
import Sidebanner from './sidebanner';
import { Link } from 'react-router-dom'
import html2canvas from "html2canvas";

import { useGoogleLogout } from 'react-google-login';
// For Local server uncomment below commentid
  const clientId =
 '981474111172-2tnnhqurattsr3a6nmt7asp8b52a356j.apps.googleusercontent.com';
//  For testing server uncomment below commentid
//  const clientId =
//  '981474111172-cgnkrhht7ete180b8qq39r3h9o20rpr7.apps.googleusercontent.com';

//  For Live server server uncomment below clientid
//    const clientId =
//  '981474111172-leavehm46ikosquejc55ofvtnl2i9eqa.apps.googleusercontent.com';


export default function Deshbord(props) {
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
  async function screenshot() {
    const screenshotTarget = document.body;

    html2canvas(screenshotTarget).then(async (canvas) => {
      const base64image = canvas.toDataURL();

      const response = await fetch(base64image);
      const blob = await response.blob();
      const filesArray = [
        new File([blob], "meme.jpg", {
          type: "image/jpeg",
          lastModified: new Date().getTime()
        })
      ];
      const shareData = {
        files: filesArray
      };
      navigator.share(shareData);
    });
  }
 
  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });
  const [soundon, setsoundon] = useState(window.sessionStorage.getItem("sound"))
  const [notificationon, setnotificationon] = useState(true)
  const [gameinfo, setgameinfostate] = useState(false)
  const [gameinfomedium, setgameinfomediumstate] = useState(false)
  const [gameinfoexpert, setgameinfoexpertstate] = useState(false)
  const [gameinfogen, setgameinfogenstate] = useState(false)


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


    props.audio.play();
  };

  const pauseAudio = () => {


    props.audio.pause();

  };
  const [datafound, setdatafound] = useState(true)
  const [item1, setitem1] = useState({ backgroundColor: "#6c7074", boxShadow: "0px 2px 0px 0px rgb(235 235 235)" })
  const [item2, setitem2] = useState({ backgroundColor: "#0170cd" })
  const [item3, setitem3] = useState({ backgroundColor: "#0170cd" })
  const [item4, setitem4] = useState({ backgroundColor: "#0170cd" })
  const [levelvalue, setlevelvalue] = useState("Easy")
  const [subscription,setsubscription] = useState("")



  const dateweek = useRef(getweek())
  const getdate = useRef(new Date().getDate() + "-" + (new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1) + "-" + new Date().getFullYear())
  
  function getweek() {
    var date = new Date(window.sessionStorage.getItem("createdAt")).getFullYear() + "-" + (new Date(window.sessionStorage.getItem("createdAt")).getMonth() + 1) + "-" + new Date(window.sessionStorage.getItem("createdAt")).getDate()
    var firstDay = new Date(date);
    var nextWeek = new Date(firstDay.getTime() + 8 * 24 * 60 * 60 * 1000);

    nextWeek.setMinutes(nextWeek.getMinutes() + nextWeek.getTimezoneOffset())


    let dateStr = nextWeek.getDate() + "-" + ((nextWeek.getMonth() + 1) < 10 ? "0" + (nextWeek.getMonth() + 1) : (nextWeek.getMonth() + 1)) + "-" + nextWeek.getFullYear();

    return dateStr;

  }



  const history = useHistory();



  useEffect(() => {
    let bodyElement = document.getElementsByTagName('body')[0];
    bodyElement.className = "Dashbord";
  })
  function monthDiff(d1, d2) {
    d1 = new Date(d1)
    d2 = new Date(d2)
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}
  useEffect(() => {

    const profileurl = `${process.env.REACT_APP_URL}/api/user/profile?id=` + window.sessionStorage.getItem("id");
    var myHeaders = new Headers();
    myHeaders.append(
      'APPKEY',
      'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
    );
    fetch(profileurl, {
      headers: myHeaders
    }).then((response) => response.json())
      .then((response) => {
        if (response.status === 200) {
          if(window.sessionStorage.getItem("subscribe") !== ""){
            setsubscription(monthDiff(response.subscription.start_date,response.subscription.end_date))
          }
          
          if (window.sessionStorage.getItem("logintype") === "username") {
            window.sessionStorage.setItem("image", response.image_path + "/" + response.data.image);
          }
          window.sessionStorage.setItem("hints", response.hints);
          window.sessionStorage.setItem("points", response.currentMonth_total_points);
          window.sessionStorage.setItem("totalpoints", response.total_points);
          window.sessionStorage.setItem("username", response.data.username);
          window.sessionStorage.setItem("monthtopyear", response.monthTop.yearMonth)
          window.sessionStorage.setItem("monthtoppoint", response.monthTop.points)
          window.sessionStorage.setItem("globalposition", response.global_postion)
          window.sessionStorage.setItem("national_postion", response.national_postion)
          window.sessionStorage.setItem("local_postion", response.local_postion)

          

          
        }
      })

  }, [])



  function getData() {
    setdatafound(false)
    var myHeaders = new Headers();
    myHeaders.append(
      'APPKEY',
      'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
    );
    const url2 = `${process.env.REACT_APP_URL}/api/user/profile?id=` + window.sessionStorage.getItem("id");
    const url1 = `${process.env.REACT_APP_URL}/api/start/match/computer?user_id=` + window.sessionStorage.getItem("id") + "&level=1"
    const dataFinder = new Promise(async (resolve, reject) => {
      await fetch(url1, {
        headers: myHeaders
      }).then((response) => response.json())
        .then((response) => {
          resolve(response)

        }).catch((err) => {
          reject(err)
        })
    })
    dataFinder.then(async (resp) => {
      if (resp.status === 200 && resp.message === "Success") {
        window.sessionStorage.setItem("mat_id", resp.user1.id);
        window.sessionStorage.setItem("match_id", resp.user1.match_id);
        await fetch(url2, {
          headers: myHeaders
        }).then((response) => response.json())
          .then((response) => {
            if (response.status === 200) {
              if (window.sessionStorage.getItem("logintype") === "username") {
                window.sessionStorage.setItem("image", response.image_path + "/" + response.data.image);
              }
              window.sessionStorage.setItem("hints", response.hints)
              window.sessionStorage.setItem("points", response.currentMonth_total_points)
              setdatafound(false);
              history.push("/Easy");
            } else {
              setdatafound(false);
              history.push("/Easy");
            }
          }).catch((err) => {
          })
      } else {
        alert("Data not found")
      }
    })
  }
  function getData2() {
    setdatafound(false)
    var myHeaders = new Headers();
    myHeaders.append(
      'APPKEY',
      'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
    );
    const url2 = `${process.env.REACT_APP_URL}/api/user/profile?id=` + window.sessionStorage.getItem("id");
    const url1 = `${process.env.REACT_APP_URL}/api/start/match/computer?user_id=` + window.sessionStorage.getItem("id") + "&level=2"
    const dataFinder = new Promise(async (resolve, reject) => {
      await fetch(url1, {
        headers: myHeaders
      }).then((response) => response.json())
        .then((response) => {
          resolve(response)

        }).catch((err) => {
          reject(err)
        })
    })
    dataFinder.then(async (resp) => {
      if (resp.status === 200 && resp.message === "Success") {
        window.sessionStorage.setItem("mat_id", resp.user1.id);
        window.sessionStorage.setItem("match_id", resp.user1.match_id);
        await fetch(url2, {
          headers: myHeaders
        }).then((response) => response.json())
          .then((response) => {
            if (response.status === 200) {
              if (window.sessionStorage.getItem("logintype") === "username") {
                window.sessionStorage.setItem("image", response.image_path + "/" + response.data.image);
              }
              window.sessionStorage.setItem("hints", response.hints)
              window.sessionStorage.setItem("points", response.currentMonth_total_points)
              setdatafound(false);
              history.push("/Medium");
            } else {
              setdatafound(false);
              history.push("/Medium");
            }
          }).catch((err) => {
          })
      } else {
        alert("Data not found")
      }
    })
  }

  function getData1() {
    setdatafound(false)
    var myHeaders = new Headers();
    myHeaders.append(
      'APPKEY',
      'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
    );
    const url2 = `${process.env.REACT_APP_URL}/api/user/profile?id=` + window.sessionStorage.getItem("id");
    const url1 = `${process.env.REACT_APP_URL}/api/start/match/computer?user_id=` + window.sessionStorage.getItem("id") + "&level=3"
    const dataFinder = new Promise(async (resolve, reject) => {
      await fetch(url1, {
        headers: myHeaders
      }).then((response) => response.json())
        .then((response) => {
          resolve(response)
        }).catch((err) => {
          reject(err)
        })
    })
    dataFinder.then(async (resp) => {
      if (resp.status === 200 && resp.message === "Success") {
        window.sessionStorage.setItem("mat_id", resp.user1.id);
        window.sessionStorage.setItem("match_id", resp.user1.match_id);
        await fetch(url2, {
          headers: myHeaders
        }).then((response) => response.json())
          .then((response) => {
            if (response.status === 200) {
              setdatafound(false);
              history.push("/Expert");
            } else {
              setdatafound(false);
              history.push("/Expert");
            }
          }).catch((err) => {
          })
      } else {
        alert("Data not found")
      }
    })
  }
  function getData3(e) {
    window.sessionStorage.setItem("length", e.target.name)
    setdatafound(false)
    var myHeaders = new Headers();
    myHeaders.append(
      'APPKEY',
      'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
    );
    const url2 = `${process.env.REACT_APP_URL}/api/user/profile?id=` + window.sessionStorage.getItem("id");
    const url1 = `${process.env.REACT_APP_URL}/api/start/match/computer?user_id=` + window.sessionStorage.getItem("id") + "&level=4&length=" + window.sessionStorage.getItem("length")
    const dataFinder = new Promise(async (resolve, reject) => {
      await fetch(url1, {
        headers: myHeaders
      }).then((response) => response.json())
        .then((response) => {
          resolve(response)

        }).catch((err) => {
          reject(err)
        })
    })
    dataFinder.then(async (resp) => {
      if (resp.status === 200 && resp.message === "Success") {
        window.sessionStorage.setItem("mat_id", resp.user1.id);
        window.sessionStorage.setItem("match_id", resp.user1.match_id);
        await fetch(url2, {
          headers: myHeaders
        }).then((response) => response.json())
          .then((response) => {
            if (response.status === 200) {
              setdatafound(false);
              history.push("/Genius");
            } else {
              setdatafound(false);
              history.push("/Genius");
            }
          }).catch((err) => {
          })
      } else {
        alert("Data not found")
      }
    })
  }

  function getmonth(number) {
    const currentMonth = new Date(number);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return currentMonth.getFullYear() + "-" + months[currentMonth.getMonth()]

  }





  return (
    <>
      {/* <Menubar audioRef={props.audio} /> */}
      <div className="container-fluid">
        <div className='row'>
          <div className='col-md-3 colleft'>
            <div className='text-center '>
              <img src={window.sessionStorage.getItem("image")} onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "./profilephoto.png";
              }} className="circal1" alt="..." style={{ width: "80px", height: "80px", marginTop: " 20px", borderRadius: "50%", opacity: "1" }} />
              <p className='profile-name'>
                <span style={{ fontSize: "20px", fontWeight: "500", textTransform: "capitalize", fontFamily: "Arial, Helvetica, sans-serif",fontStyle:"initial" }}><b>{window.sessionStorage.getItem("username")}</b></span>

              </p>

            </div>
            <div className='rankingtab'>
              <ul className="nav flex-column" >
                <li className="nav-item buttonbox1 mb-2">
                  <Link to="/ranking" className="nav-link active" onClick={() => { window.sessionStorage.setItem("nationaltype", "worldwide") }}>Rankings</Link>
                </li>
                <li className="nav-item buttonbox1 mb-2">
                  <Link to="/VocabularyCenter" className="nav-link " >Vocabulary centre </Link>
                </li>
                <li className="nav-item buttonbox1 mb-2">
                  <Link to="/Dictionary" className="nav-link">Dictionary - Your Help please  </Link>
                </li>



                <li className="nav-item buttonbox1 mb-2">
                  <Link to="/SuggestWordMeaning" className="nav-link " >Suggest a new word or meaning </Link>
                </li>
                
                <li className="nav-item buttonbox1 mb-2">
                  <Link to="/AimOfTheGame" className="nav-link">Aim of the game </Link>
                </li>

                {/* <li className="nav-item buttonbox1 mb-2" style={{ backgroundColor: "red" }}>
                    <a className="nav-link " href='https://youtu.be/fO9Zsk2YYwM' rel='noreferrer' target={"_blank"} style={{ color: "white" }}>How to play <span style={{ fontSize: "15px" }}>(YouTube Video)</span></a>
                  </li> */}
              </ul>
              <div className='planinfo'>
              <p className='hintsname' style={{ marginTop: "12px" }}>
              Account  <span style={{ fontSize: "13px", fontWeight: "600", color: "black" }}>{window.sessionStorage.getItem("subscribe") === ""?<><Link to ="/paymentplan"><button className="inactivesub">InActive</button></Link> Renew your plan</>:<><button className="activesub">Active</button>  </>}</span>
                </p>
                <p className='hintsname' style={{ marginTop: "5px" }}>
                Hints <span className='hints-name' style={{ fontSize: "16px", fontWeight: "600", color: "black" }}> {window.sessionStorage.getItem("hints")}</span>
                </p>
              
              </div>
              <div className='flex-container  connect-margi20p' >
                <div className='flexchildclass1'>
                  <div className='connectdiv h-100'>

                    <div style={{ color: "#ffffff", fontWeight: "600", padding: "2px", textAlign: "center", fontSize: "16px" }}>COMING SOON</div>
                    <div className='flex-container'>
                      <div className='podiv'>
                        <img src={require('../assets/images/image002.png')} className="circalbox7" alt="..." />
                      </div>
                      <div className='podiv1'>
                        <p className='text-center text-white' style={{ fontWeight: 700, fontSize: "16px" }}>NE <i>Connect</i> </p>
                      </div>
                      <div className='podiv'>
                        <img src={require('../assets/images/image004.png')} className="circalbox7" alt="..." style={{ float: 'right' }} />
                      </div>
                    </div>

                    <div className='paymentbtn2' style={{ marginTop: "10px", marginBottom: "0px" }}>
                      <h4><b><p className='p'>Coming Soon, Ne-Connect, where you can </p>
                        <p className='p'> play against friends and familiy and also </p>
                        <p className='p'>against players in the online pool of players.</p>
                        <p className='p live-chat-fac'>WITH LIVE CHAT FACILITY </p>
                        </b>
                        <div className='check-google-coonect'>
                        <a  target="_blank" href="https://ne-connect.com">Click Here</a>
                        </div>
                        
                        
                        </h4>
                       
                    </div>


                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className='col-md-6'>
          <div className='bg-color-middle'>
            {datafound ? "" : <div className="loader-wrapper">
              <div className="loader"></div>
            </div>}
            <div className='profilemenu1'>
              <div class="grid-container">

                <div class="item2" style={item1} onClick={() => { setitem1({ backgroundColor: "#6c7074", boxShadow: "0px 2px 0px 0px rgb(235 235 235)" }); setitem2({ backgroundColor: "#0170cd" }); setitem3({ backgroundColor: "#0170cd" }); setitem4({ backgroundColor: "#0170cd" }); setlevelvalue("Easy") }}>Easy</div>
                <div class="item3" style={item2} onClick={() => { setitem2({ backgroundColor: "#6c7074", boxShadow: "0px 2px 0px 0px rgb(235 235 235)" }); setitem1({ backgroundColor: "#0170cd" }); setitem3({ backgroundColor: "#0170cd" }); setitem4({ backgroundColor: "#0170cd" }); setlevelvalue("Medium") }}>Medium</div>
                <div class="item5" style={item3} onClick={() => { setitem3({ backgroundColor: "#6c7074", boxShadow: "0px 2px 0px 0px rgb(235 235 235)" }); setitem2({ backgroundColor: "#0170cd" }); setitem1({ backgroundColor: "#0170cd" }); setitem4({ backgroundColor: "#0170cd" }); setlevelvalue("Expert") }}>Expert</div>
                <div class="item4" style={item4} onClick={() => { setitem4({ backgroundColor: "#6c7074", boxShadow: "0px 2px 0px 0px rgb(235 235 235)" }); setitem2({ backgroundColor: "#0170cd" }); setitem3({ backgroundColor: "#0170cd" }); setitem1({ backgroundColor: "#0170cd" }); setlevelvalue("Genius") }}>Genius</div>

              </div>
            </div>
            <div className='left-men-img'><img src="./Newdesign/dashboard/banner-img.png" alt="" /></div>
            {levelvalue === "Easy" ? <div className='maingamelogic'>

         

              <p className="maingamepara">Play letters only behind </p>
              {window.sessionStorage.getItem("playButtonStatus") === '0' ? <button className='playeasybutton' disabled>Play</button> : <button className='playeasybutton' onClick={getData}>Play</button>}
              <p className="maingamepara mart80p"> How to play "Easy level"  <img class="marvideo10p pointer" src="./Newdesign/dashboard/info.png" style={{ width: "20px", height: "20px" }} alt=""  onClick={() => { setgameinfostate(true) }} /> </p>
              

            </div> : ""}
            {levelvalue === "Medium" ? <div className='maingamelogic'>

           
              <p className="maingamepara">play letters in front or behind </p>
              {window.sessionStorage.getItem("playButtonStatus") === '0'  ?  <button className='playeasybutton' disabled>Play</button> :   <button className='playeasybutton' onClick={getData2}>Play</button>}
            <br/>

              <p className="maingamepara mart80p"> How to play "Medium level"  <img class="marvideo10p pointer" src="./Newdesign/dashboard/info.png" style={{ width: "20px", height: "20px" }} alt=""  onClick={() => { setgameinfomediumstate(true) }} /> </p>
             
         

            </div> : ""}
            {levelvalue === "Expert" ? <div className='maingamelogic'>
              <p className="maingamepara">Play letters anywhere <br/>and keep them in same order</p>
            
              {window.sessionStorage.getItem("playButtonStatus") === '0' ? <button className='playeasybutton' disabled>Play</button> : <button className='playeasybutton' onClick={getData1}>Play</button>}
            

              <p className="maingamepara mart80p"> How to play "Expert level" <img class="marvideo10p pointer" src="./Newdesign/dashboard/info.png" style={{ width: "20px", height: "20px" }} alt="" onClick={() => { setgameinfoexpertstate(true) }} /></p>
              

            </div> : ""}
            {levelvalue === "Genius" ? <div className='maingamelogic'>
              <p className="maingamepara">Play letters anywhere <br/> and re-arrange them</p>
              
              {window.sessionStorage.getItem("subscribe") === '0'  ? <button className='playeasybutton' disabled>Play</button> : <button className='playeasybutton' data-bs-toggle="modal" data-bs-target="#staticBackdrop">Play</button>}
              <p className="maingamepara mart80p"> How to play "Genius level" <img class="marvideo10p pointer" src="./Newdesign/dashboard/info.png" style={{ width: "20px", height: "20px" }} onClick={() => { setgameinfogenstate(true) }} alt="" /></p>
              

            </div> : ""}

            <div className='edit-your-profile-center'>
            <p className='edit-your-profile'>edit profile to be included on the rankings</p>
            </div>

          <div class="advertisement-img"><a  target="_blank" href="https://ne-connect.com/"><img class="img-width" src="./Newdesign/dashboard/advertisement.png" alt="" /></a></div>
          </div>

          <p className='developed-by'>Designed and Developed by <a target="_blank" href="https://www.commediait.com/">Shriv ComMedia Solutions Pvt. Ltd.</a></p>
          </div>


          <div className='col-md-3 colright' >
            <div className='profilemenu'>
              <ul>


                <div className='rightpanel'>
                  <li className="nav-item dropdown">
                    <Link className="nav-link" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src="./Newdesign/dashboard/settings.png" style={{ width: "25px", height: "30px", paddingTop: "6px" }} alt="" />
                    </Link>
                    <ul className="dropdown-menu dropsetting" aria-labelledby="navbarDropdown">
                      <li className="dropdown-item"><Link to="history"><button className='profilebutton' >History</button></Link></li>
                      <li className="dropdown-item"><Link to="Points"><button className='profilebutton' >Points</button></Link></li>
                      <li className="dropdown-item"><Link to="Feedback"><button className='profilebutton' >Feedback</button></Link></li>
                      <li className="dropdown-item"><Link to="#"> {playing === "true" ? <button className='profilebutton' onClick={toggle} style={{ backgroundColor: '#1494ff' }}>Music</button> : <button className='profilebutton' onClick={toggle}>Music</button>}</Link></li>

                      <li className="dropdown-item"><Link to="#"> {soundon === "true" ? <button className='profilebutton' onClick={toggle1} style={{ backgroundColor: '#1494ff' }}>Sound</button> : <button className='profilebutton' onClick={toggle1}>Sound</button>}</Link></li>

                     
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <Link className="nav-link " to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src="./Newdesign/dashboard/shopping-cart.png" style={{ width: "25px", height: "30px", paddingTop: "6px" }} alt="" />
                    </Link>
                    <ul className="dropdown-menu dropcart" aria-labelledby="navbarDropdown">
                      <li className="dropdown-item"><Link to="Paymentplan"><button className='profilebutton' >Buy Game</button></Link></li>
                      <li className="dropdown-item"><Link to="Paypal"><button className='profilebutton' >Buy Hints</button></Link></li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <Link className="nav-link" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                      <div className="profile">
                        <img src="./Newdesign/dashboard/log-out.png" alt="..." style={{
                          borderRadius: "50%", height: "30px",
                          width: "30px"
                        }} />
                      </div>

                    </Link>
                    <ul className="dropdown-menu dropprofile" aria-labelledby="navbarDropdown" >

                      <li className="dropdown-item"><Link to="EditProfile"><button className='profilebutton' >Edit Profile</button></Link></li>
                      <li className="dropdown-item"><Link to="ChangesPassword"><button className='profilebutton' >Change Password</button></Link></li>

                      <li className="dropdown-item">{window.sessionStorage.getItem("logintype") === "facebook" ? <button className='signoutbutton' onClick={fbLogoutUser} >Sign Out</button> : <button className='signoutbutton' onClick={signOut} >Sign Out</button>}</li>
                    </ul>
                  </li>

                </div>
              </ul>
            </div>
            <div className='profilebanner'>

              <div className='connectdiv1 h-100'>

                <div style={{ color: "#fff", fontWeight: "700", padding: "2px", textAlign: "left", fontSize: "18px" }}>My Points Info</div>
                <ul className='pointhistory'>
                  <li>Total Points:  <span className='score-bold' style={{ float: "right" }}>{window.sessionStorage.getItem("totalpoints")}</span></li>
                  <li>Monthly Record:  <span className='score-bold' style={{ float: "right" }}>{window.sessionStorage.getItem("monthtopyear") === "null" ? "" : getmonth(window.sessionStorage.getItem("monthtopyear"))} {window.sessionStorage.getItem("monthtoppoint") !== "null" ? window.sessionStorage.getItem("monthtoppoint") : ""}</span></li>
                  <li>This Month: <span className='score-bold' style={{ float: "right" }}>{window.sessionStorage.getItem("points")}</span>  </li>

                </ul>

                <div style={{ color: "#fff", fontWeight: "700", padding: "2px", textAlign: "left", fontSize: "18px", marginTop: "10px" }}>My Ranking Info</div>
                <ul className='pointhistory'>
                  <li>Worldwide:  <span className='score-bold' style={{ float: "right" }}>{window.sessionStorage.getItem("globalposition")}</span></li>
                  <li>Nationally:  <span className='score-bold' style={{ float: "right" }}>{window.sessionStorage.getItem("national_postion")}</span></li> 
                  <li>Locally: <span className='score-bold' style={{ float: "right" }}>{window.sessionStorage.getItem("local_postion")}</span>  </li>
                </ul>

                {/*<div className='sharefriend' style={{ color: "#fff", fontWeight: "700", padding: "2px", textAlign: "center", fontSize: "18px", marginTop: "40px" }}>Share</div>
                <div><img src="./Newdesign/dashboard/share.png" style={{ width: "25px", height: "30px", paddingTop: "6px" }} alt="" /></div>*/}

                {/* <Sharehook />*/}
                <div className="row mart10pshar" >
                <div className="col-md-5"><button type="button" className="sherebox sherebtn share-new" onClick={screenshot}> <span className="marshar">Share</span> <span class="share-right"><i class="fas fa-share-square"></i></span></button></div>
                <div className="col-md-5"><button type="button" className="sherebox sherebtn share-new marl20pshare" onClick={screenshot}> <span className="marshar">Invite</span> <span class="share-right"><i class="fas fa-share-square"></i></span></button>
                </div>
                 
                 
                  
                </div>
                

              </div>

            </div>


            <div className='profilebanner banner2' >

              <div className='connectdiv1 h-100'>

                <img src="./images/navlogo.png" alt="..." style={{
                  height: "61px",
                
                  
                }} />

                <p style={{ fontSize: "12px", marginTop: "9px", color: "#fff", textAlign: "center" }}>
                  MANY FUN ORIGINAL<br/> BOARD AND CARD GAMES <br/> FROM <br/> NE GAMES LTD
                  <br/><br/>
                 
                  <p className='click-to'>Click to </p>
                <div className='android-link-icone'>
                <ul>
                <li><a target="_blank" href="https://ne-games.com/"><img src="./images/web-icone.png" /></a></li>
                <li><a target="_blank" href="https://play.google.com/store/apps/details?id=com.nelite.nelite"><img src="./images/ios-icone.png" /></a></li>
                <li><a target="_blank" href="https://play.google.com/store/apps/details?id=com.nelite.nelite"><img src="./images/android-icone.png" /></a></li>
                </ul>
                 </div>
                   </p>


              </div>


            </div>

          </div>
        </div>
      </div >

      {/* <div className="easybg_image" style={{ marginTop: "10px" }}> */}

      {/* <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <h4 className='text-center point' style={{ fontSize: "17px" }} ><b> Monthly Records: {window.sessionStorage.getItem("monthtopyear") === "null" ? "" : getmonth(window.sessionStorage.getItem("monthtopyear"))} {window.sessionStorage.getItem("monthtoppoint") !== "null" ? window.sessionStorage.getItem("monthtoppoint") : ""}</b></h4>

            </div>
            <div className="col-md-3">
              <h4 className='text-center point' style={{ fontSize: "17px" }} ><b>My Points This Month: {window.sessionStorage.getItem("points")}</b></h4>


            </div>
            <div className="col-md-3">
              <h4 className='text-center point' style={{ fontSize: "17px" }} ><b>My Total Points: {window.sessionStorage.getItem("totalpoints")}</b></h4>

            </div>
            <div className="col-md-3">

              <h4 className='text-center point' style={{ fontSize: "17px" }} ><b>Worldwide Ranking: {window.sessionStorage.getItem("globalposition")}</b></h4>

            </div>
          </div>
        </div> */}
      {/* <div className='layer1'>



          {datafound ? "" : <div className="loader-wrapper">
            <div className="loader"></div>
          </div>}

          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">








                
                <br />


              




              </div>
              <div className="col-md-7">




                <div className='row'>
                  <div className='col-md-6 mb-2'>
                    <div className="buttonboxeasy h-100 " >
                      <p className='headline'>EASY LEVEL</p>
                      <p className='subheadline'>Play letters only behind </p>
                      {window.sessionStorage.getItem("subscribe") === "" && dateweek.current <= getdate.current ? <img src="./images/play.png" alt="" style={{ marginTop: "10px" }} /> : <img src="./images/play.png" alt="" onClick={getData} style={{ marginTop: "10px" }} role={"button"} />}

                      <a href="https://youtu.be/2Wa10OGBrVM" target={"_blank"} rel="noreferrer"><img src="./images/youtube.png" alt="" /></a>

                    </div>
                  </div>
                  <div className='col-md-6  mb-2' >
                    <div className="buttonboxmedium h-100 ">
                      <p className='headline'>MEDIUM LEVEL</p>
                      <p className='subheadline'>Play letters at the front or behind  </p>

                      {window.sessionStorage.getItem("subscribe") === "" && dateweek.current <= getdate.current ? <img src="./images/play.png" style={{ marginTop: "10px" }} alt="" /> : <img src="./images/play.png" onClick={getData2} role={"button"} style={{ marginTop: "10px" }} alt="" />}





                      <a href="https://youtu.be/Kdzhlt1Db1w" target={"_blank"} rel="noreferrer"><img src="./images/youtube.png" alt="" /></a>







                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6 mb-2'>
                    <div className="buttonboxexpert h-100">
                      <p className='headline'>EXPERT LEVEL</p>
                      <p className='subheadline'>Play letters anywhere   </p>

                      {window.sessionStorage.getItem("subscribe") === "" && dateweek.current <= getdate.current ? <img src="./images/play.png" style={{ marginTop: "10px" }} alt="" /> : <img src="./images/play.png" style={{ marginTop: "10px" }} onClick={getData1} role={"button"} alt="" />}




                      <a href="https://youtu.be/h6s_8Cuj9DM" target={"_blank"} rel="noreferrer" > <img src="./images/youtube.png" alt="" /></a>




                    </div>
                  </div>
                  <div className='col-md-6 mb-2'>
                    <div className="buttonboxgenius  h-100">
                      <p className='headline'>GENIUS LEVEL</p>
                      <p className='subheadline'>Play letters anywhere and re-arrange them  </p>

                      {window.sessionStorage.getItem("subscribe") === "" && dateweek.current <= getdate.current ? <img src="./images/play.png" style={{ marginTop: "10px" }} alt="" /> : <img src="./images/play.png" style={{ marginTop: "10px" }} data-bs-toggle="modal" data-bs-target="#staticBackdrop" role={"button"} alt="" />}




                      <a href="https://youtu.be/NLXwRYELZyY" target={"_blank"} rel="noreferrer" ><img src="./images/youtube.png" alt="" /></a>





                    </div>

                  </div>
                </div>




              </div>

              <div className="col-md-2" >

                <Sidebanner />


              </div>

            </div>
            <div className='row'>
              <div className='col-md-12'>
                <Bannerad />
              </div>
            </div>

          </div>
        </div>
      </div>



      
 */}
      <div className="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ position: "absolute", bottom: "0", backgroundColor: "transparent" }}>
            <div className="modal-body geniusmodal">
              <button type="button" className=" buttonboxcopy3" data-bs-dismiss="modal">X</button>
              <div className='selectbutton'>
                <div className='tit'> PLEASE SELECT A WORD LENGTH</div>
                <button className='bttn' name="8" onClick={getData3} data-bs-dismiss="modal">8</button>
                <button className='bttn' name="9" onClick={getData3} data-bs-dismiss="modal">9</button>
                <button className='bttn' name="10" onClick={getData3} data-bs-dismiss="modal">10</button>
              </div>
            </div>
          </div>
        </div>
      </div>


      {gameinfo ?
        <div className='modalmaindiv2' id='welcomeDiv1'>
            <div className='modaldiv'>
            <button className='text-center mb-1 close-btn ' type="text" onClick={() => { setgameinfostate(false) }}><span aria-hidden="true">×</span></button>
          <div className="cardbox easy-img">
                <img  className='img-responsive' src="./images/easy1.png" alt="" />
                </div>
            </div>
        </div>
        : ""}

      {gameinfomedium ?
        <div className='modalmaindiv2' id='welcomeDiv1'>
            <div className='modaldiv'>
            <button className='text-center mb-1 close-btn ' type="text" onClick={() => { setgameinfomediumstate(false) }}><span aria-hidden="true">×</span></button>
          <div className="cardbox easy-img">
                <img  className='img-responsive' src="./images/medium1.png" alt="" />
                </div>
            </div>
        </div>
        : ""}


       {gameinfoexpert ?
        <div className='modalmaindiv2' id='welcomeDiv1'>
            <div className='modaldiv'>
            <button className='text-center mb-1 close-btn ' type="text" onClick={() => { setgameinfoexpertstate(false) }}><span aria-hidden="true">×</span></button>
          <div className="cardbox easy-img">
                <img  className='img-responsive' src="./images/expert1.png" alt="" />
                </div>
            </div>
        </div>
        : ""}
       
       {gameinfogen ?
        <div className='modalmaindiv2' id='welcomeDiv1'>
            <div className='modaldiv'>
            <button className='text-center mb-1 close-btn ' type="text" onClick={() => { setgameinfogenstate(false) }}><span aria-hidden="true">×</span></button>
          <div className="cardbox easy-img">
                <img  className='img-responsive' src="./images/genius1.png" alt="" />
                </div>
            </div>
        </div>
        : ""}


      




    </>
  )
}
