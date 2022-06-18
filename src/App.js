import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import '../src/assets/css/Index.css'
import '../src/assets/css/responsive.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import Home from './Home'
import About from './frontComponent/About'
import Contact from './frontComponent/Contact';
import Register from './frontComponent/Register';
import Forgot from './frontComponent/Forgot';
import Deshbord from './afterLoginComponent/Deshbord';
import Easy from './afterLoginComponent/Easy';
import Ranking from './afterLoginComponent/Ranking';
import Expert from './afterLoginComponent/Expert';
import Genius from './afterLoginComponent/Genius';
import GeniusMain from "./afterLoginComponent/GeniusMain"
import Medium from './afterLoginComponent/Medium';
import EditProfile from './afterLoginComponent/EditProfile'
import History from './afterLoginComponent/History';
import VocabularyCenter from './afterLoginComponent/VocabularyCenter';
import Subscribeplan from './afterLoginComponent/subscribeplan';
import Subscribeplandetail from "./afterLoginComponent/subscribeplandetail"
import SuggestWordMeaning from './afterLoginComponent/SuggestWordMeaning ';
import Paymentplan from './afterLoginComponent/Paymentplan';
import ChangesPassword from './afterLoginComponent/ChangesPassword';
import Paypal from "./afterLoginComponent/paypal"
import Nelite from "./frontComponent/Nelite"
import Dictionary from './afterLoginComponent/Dictionary';
import AimOfTheGame from './afterLoginComponent/AimOfTheGame';
import PrivacyPolicy from './frontComponent/PrivacyPolicy';
import TermsOfService from './frontComponent/TermsOfService';
import music from './assets/music/newbackground.mpeg'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Points from './afterLoginComponent/points';
import Records from './afterLoginComponent/records';
import Feedback from './afterLoginComponent/Feedback';
import NewHome from './NewHome';
import NewForgot from './frontComponent/NewForgot';
import NewRegister from './frontComponent/NewRegister';

function App(props) {
  const [error, seterror] = useState("")
  const [gameoverbox, setGameOverBox] = useState(false)
  const [errorsbox, setErrorsbox] = useState(false)
  const [reqemail, setReqemail] = useState('')
  const [validaionemail, setvalidaionemail] = useState("")
  const [logdata, setlogdata] = useState(false)
  const [isloggedIn, setisLoggedIn] = useState(false)
  const [settingpopup, setsettingpopup] = useState(false)
  const audioRef = useMemo(() => new Audio(music), []);

  useEffect(() => {
    setisLoggedIn(window.sessionStorage.getItem("token"))
  }, [isloggedIn])

  function afterlogin() {
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
      debugger
      console.log(resp)
      if (resp.status === 200 && resp.message === "Success") {
        window.sessionStorage.setItem("match_id", resp.user1.match_id);
        await fetch(url2, {
          headers: myHeaders
        }).then((response) => response.json())
          .then((response) => {
            if (response.status === 200) {
              console.log(response)
              window.sessionStorage.setItem("image", response.image_path + "/" + response.data.image);
              window.sessionStorage.setItem("hints", response.hints)
              window.sessionStorage.setItem("points", response.currentMonth_total_points)
              window.sessionStorage.setItem("playButtonStatus", response.playButtonStatus)
            } else {
              //  window.sessionStorage.setItem("image", require('../assets/images/profilephoto.png'));
            }
          }).catch((err) => {
            console.log('i am err', err)
          })
      } else {
        alert("Data not found")
      }
    })
  }

  async function login(user, pass) {
    setlogdata(true)
    var myHeaders = new Headers();
    myHeaders.append(
      'APPKEY',
      'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
    );
    var formdata = new FormData();
    formdata.append('username', user);
    formdata.append('password', pass);
    formdata.append('register_type', 'email');
    formdata.append('lat', '56454');
    formdata.append('lng', '5645645');
    formdata.append('device_id', 'dsvdsvdsvdsvd');
    formdata.append('fcm_token', 'dsvdsvdsvdsvdsvdfbgfbg');
    const url = `${process.env.REACT_APP_URL}/api/user/login`
    await fetch(url, {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    }).then((response) => response.json())
      .then(async (response) => {
        if (response.status === 200) {
          setGameOverBox(false)
          setlogdata(false)
          window.sessionStorage.setItem("logintype", "username")
          window.sessionStorage.setItem("username", response.data.username);
          window.sessionStorage.setItem("id", response.data.id);
          window.sessionStorage.setItem("createdAt", response.data.created_at)
          window.sessionStorage.setItem("music", false)
          window.sessionStorage.setItem("sound", false)
          const url2 = `${process.env.REACT_APP_URL}/api/user/profile?id=` + response.data.id;
          await fetch(url2, {
            headers: myHeaders
          }).then((response) => response.json())
            .then((response) => {
              if (response.status === 200) {
                window.sessionStorage.setItem("image", response.image_path + "/" + response.data.image);
                window.sessionStorage.setItem("hints", response.hints);
                window.sessionStorage.setItem("points", response.currentMonth_total_points);
                window.sessionStorage.setItem("totalpoints", response.total_points);
                window.sessionStorage.setItem("username", response.data.username);
                window.sessionStorage.setItem("monthtopyear", response.monthTop.yearMonth)
                window.sessionStorage.setItem("monthtoppoint", response.monthTop.points)
                window.sessionStorage.setItem("globalposition", response.global_postion)
                window.sessionStorage.setItem("national_postion", response.national_postion)
                window.sessionStorage.setItem("local_postion", response.local_postion)
                window.sessionStorage.setItem("navlink","home")
                window.sessionStorage.setItem("playButtonStatus", response.playButtonStatus)
                afterlogin()
              } else {
              }
            })
          console.log(response)

          if (response.data.subscription_id === null) {
            window.sessionStorage.setItem("subscribe", "")
          } else {
            window.sessionStorage.setItem("subscribe", "data")
          }
          //   window.sessionStorage.setItem("token", true);
          //   setisLoggedIn(true)
          //   window.open("/Subscribeplan", "_self")
          // }else{
          window.sessionStorage.setItem("token", true);
          setisLoggedIn(true)

          window.open("/Dashboard", "_self")
          // }
        } else {
          setvalidaionemail("")
          console.log(response)
          seterror(response.error_message)
          setGameOverBox(true)
          setReqemail("")
          setErrorsbox(true)
          setlogdata(false)
        }
      })
  }
  return (
    <div >
      <Router>
        <Switch>
          <Route exact path="/Dictionary">
            {isloggedIn ? <Dictionary audio={audioRef} setting={settingpopup} setpopup={setsettingpopup} /> : <Nelite loginhandler={login} emailcheck={validaionemail} changeemail={setvalidaionemail} err={error} passwerr={seterror} loader={logdata} setloader={setlogdata} popup={gameoverbox} removepopup={setErrorsbox} removeerrbox={setGameOverBox} updatefill={reqemail} mailfillds={setReqemail} />}
          </Route>
          <Route exact path="/AimOfTheGame">
            {isloggedIn ? <AimOfTheGame audio={audioRef} setting={settingpopup} setpopup={setsettingpopup} /> : <Nelite loginhandler={login} emailcheck={validaionemail} changeemail={setvalidaionemail} err={error} passwerr={seterror} loader={logdata} setloader={setlogdata} popup={gameoverbox} removepopup={setErrorsbox} removeerrbox={setGameOverBox} updatefill={reqemail} mailfillds={setReqemail} />}
          </Route>
          <Route exact path="/Nelite">
            {isloggedIn ? <Deshbord audio={audioRef} setting={settingpopup} setpopup={setsettingpopup} /> : <Nelite loginhandler={login} emailcheck={validaionemail} changeemail={setvalidaionemail} err={error} passwerr={seterror} loader={logdata} setloader={setlogdata} popup={gameoverbox} removepopup={setErrorsbox} removeerrbox={setGameOverBox} updatefill={reqemail} mailfillds={setReqemail} />}
          </Route>
          <Route exact path="/ChangesPassword">
            {isloggedIn ? <ChangesPassword audio={audioRef} setting={settingpopup} setpopup={setsettingpopup} /> : <Home loginhandler={login} emailcheck={validaionemail} changeemail={setvalidaionemail} err={error} passwerr={seterror} loader={logdata} setloader={setlogdata} popup={gameoverbox} removepopup={setErrorsbox} removeerrbox={setGameOverBox} updatefill={reqemail} mailfillds={setReqemail} />}
          </Route>
          <Route exact path="/Paymentplan">
            {isloggedIn ? <Paymentplan audio={audioRef} setting={settingpopup} setpopup={setsettingpopup} /> : <Home loginhandler={login} emailcheck={validaionemail} changeemail={setvalidaionemail} err={error} passwerr={seterror} loader={logdata} popup={gameoverbox} setloader={setlogdata} removepopup={setErrorsbox} removeerrbox={setGameOverBox} updatefill={reqemail} mailfillds={setReqemail} />}
          </Route>
          <Route exact path="/SuggestWordMeaning">
            {isloggedIn ? <SuggestWordMeaning audio={audioRef} setting={settingpopup} setpopup={setsettingpopup} /> : <Home loginhandler={login} emailcheck={validaionemail} changeemail={setvalidaionemail} err={error} passwerr={seterror} loader={logdata} popup={gameoverbox} setloader={setlogdata} removepopup={setErrorsbox} removeerrbox={setGameOverBox} updatefill={reqemail} mailfillds={setReqemail} />}
          </Route>

          <Route exact path="/VocabularyCenter">
            {isloggedIn ? <VocabularyCenter audio={audioRef} setting={settingpopup} setpopup={setsettingpopup} /> : <Home loginhandler={login} emailcheck={validaionemail} changeemail={setvalidaionemail} err={error} passwerr={seterror} loader={logdata} popup={gameoverbox} setloader={setlogdata} removepopup={setErrorsbox} removeerrbox={setGameOverBox} updatefill={reqemail} mailfillds={setReqemail} />}
          </Route>
          <Route exact path="/History">
            {isloggedIn ? <History audio={audioRef} setting={settingpopup} setpopup={setsettingpopup} /> : <Home loginhandler={login} emailcheck={validaionemail} changeemail={setvalidaionemail} err={error} passwerr={seterror} loader={logdata} popup={gameoverbox} setloader={setlogdata} removepopup={setErrorsbox} removeerrbox={setGameOverBox} updatefill={reqemail} mailfillds={setReqemail} />}
          </Route>
          <Route exact path="/Feedback">
            {isloggedIn ? <Feedback audio={audioRef} setting={settingpopup} setpopup={setsettingpopup}/> : <Home loginhandler={login} emailcheck={validaionemail} changeemail={setvalidaionemail} err={error} passwerr={seterror} loader={logdata} popup={gameoverbox} setloader={setlogdata} removepopup={setErrorsbox} removeerrbox={setGameOverBox} updatefill={reqemail} mailfillds={setReqemail} />}
          </Route>
          <Route exact path="/EditProfile">
            {isloggedIn ? <EditProfile audio={audioRef} setting={settingpopup} setpopup={setsettingpopup} /> : <Home loginhandler={login} emailcheck={validaionemail} changeemail={setvalidaionemail} err={error} passwerr={seterror} loader={logdata} popup={gameoverbox} setloader={setlogdata} removepopup={setErrorsbox} removeerrbox={setGameOverBox} updatefill={reqemail} mailfillds={setReqemail} />}
          </Route>
          <Route exact path="/Paypal">
            {isloggedIn ? <Paypal audio={audioRef} setting={settingpopup} setpopup={setsettingpopup} /> : <Home loginhandler={login} emailcheck={validaionemail} changeemail={setvalidaionemail} err={error} passwerr={seterror} loader={logdata} popup={gameoverbox} setloader={setlogdata} removepopup={setErrorsbox} removeerrbox={setGameOverBox} updatefill={reqemail} mailfillds={setReqemail} />}
          </Route>
          <Route exact path="/Medium">
            {isloggedIn ? <Medium audio={audioRef} setting={settingpopup} setpopup={setsettingpopup} /> : <Home loginhandler={login} emailcheck={validaionemail} changeemail={setvalidaionemail} err={error} passwerr={seterror} loader={logdata} popup={gameoverbox} setloader={setlogdata} removepopup={setErrorsbox} removeerrbox={setGameOverBox} updatefill={reqemail} mailfillds={setReqemail} />}
          </Route>
          <Route exact path="/Expert">
            {isloggedIn ? <Expert audio={audioRef} setting={settingpopup} setpopup={setsettingpopup} /> : <Home loginhandler={login} emailcheck={validaionemail} changeemail={setvalidaionemail} err={error} passwerr={seterror} loader={logdata} popup={gameoverbox} setloader={setlogdata} removepopup={setErrorsbox} removeerrbox={setGameOverBox} updatefill={reqemail} mailfillds={setReqemail} />}
          </Route>
          <Route exact path="/Points">
            {isloggedIn ? <Points audio={audioRef}/> : <Home loginhandler={login} emailcheck={validaionemail} changeemail={setvalidaionemail} err={error} passwerr={seterror} loader={logdata} popup={gameoverbox} setloader={setlogdata} removepopup={setErrorsbox} removeerrbox={setGameOverBox} updatefill={reqemail} mailfillds={setReqemail} />}
          </Route>
          <Route exact path="/Ranking">
            {isloggedIn ? <Ranking audio={audioRef} setting={settingpopup} setpopup={setsettingpopup} /> : <Home loginhandler={login} emailcheck={validaionemail} changeemail={setvalidaionemail} err={error} passwerr={seterror} loader={logdata} popup={gameoverbox} setloader={setlogdata} removepopup={setErrorsbox} removeerrbox={setGameOverBox} updatefill={reqemail} mailfillds={setReqemail} />}
          </Route>
          <Route exact path="/Records">
            {isloggedIn ? <Records audio={audioRef} setting={settingpopup} setpopup={setsettingpopup} /> : <Home loginhandler={login} emailcheck={validaionemail} changeemail={setvalidaionemail} err={error} passwerr={seterror} loader={logdata} popup={gameoverbox} setloader={setlogdata} removepopup={setErrorsbox} removeerrbox={setGameOverBox} updatefill={reqemail} mailfillds={setReqemail} />}
          </Route>
          <Route exact path="/Easy">
            {isloggedIn ? <Easy audio={audioRef} setting={settingpopup} setpopup={setsettingpopup} /> : <Home loginhandler={login} emailcheck={validaionemail} changeemail={setvalidaionemail} err={error} passwerr={seterror} loader={logdata} popup={gameoverbox} setloader={setlogdata} removepopup={setErrorsbox} removeerrbox={setGameOverBox} updatefill={reqemail} mailfillds={setReqemail} />}
          </Route>
          <Route exact path="/Genius">
            {isloggedIn ? <Genius audio={audioRef} setting={settingpopup} setpopup={setsettingpopup} /> : <Home loginhandler={login} emailcheck={validaionemail} changeemail={setvalidaionemail} err={error} passwerr={seterror} loader={logdata} popup={gameoverbox} setloader={setlogdata} removepopup={setErrorsbox} removeerrbox={setGameOverBox} updatefill={reqemail} mailfillds={setReqemail} />}
          </Route>
          <Route exact path="/GeniusMain">
            {isloggedIn ? <GeniusMain audio={audioRef} setting={settingpopup} setpopup={setsettingpopup} /> : <Home loginhandler={login} emailcheck={validaionemail} changeemail={setvalidaionemail} err={error} passwerr={seterror} loader={logdata} popup={gameoverbox} setloader={setlogdata} removepopup={setErrorsbox} removeerrbox={setGameOverBox} updatefill={reqemail} mailfillds={setReqemail} />}
          </Route>
          <Route exact path="/Dashboard">
            {isloggedIn ? <Deshbord audio={audioRef} setting={settingpopup} setpopup={setsettingpopup} /> : <Home loginhandler={login} emailcheck={validaionemail} changeemail={setvalidaionemail} err={error} passwerr={seterror} loader={logdata} popup={gameoverbox} setloader={setlogdata} removepopup={setErrorsbox} removeerrbox={setGameOverBox} updatefill={reqemail} mailfillds={setReqemail} />}
          </Route>
          <Route exact path="/Subscribeplan">
            {isloggedIn ? <Subscribeplan /> : <Home loginhandler={login} emailcheck={validaionemail} changeemail={setvalidaionemail} err={error} passwerr={seterror} loader={logdata} popup={gameoverbox} setloader={setlogdata} removepopup={setErrorsbox} removeerrbox={setGameOverBox} updatefill={reqemail} mailfillds={setReqemail} />}
          </Route>
          <Route exact path="/Subscribeplandetail">
            {isloggedIn ? <Subscribeplandetail /> : <Home loginhandler={login} emailcheck={validaionemail} changeemail={setvalidaionemail} err={error} passwerr={seterror} loader={logdata} popup={gameoverbox} setloader={setlogdata} removepopup={setErrorsbox} removeerrbox={setGameOverBox} updatefill={reqemail} mailfillds={setReqemail} />}
          </Route>
          <Route path="/ForgotPassword">
            <Forgot />
          </Route>
          <Route path="/about" >
            {isloggedIn ? <Deshbord audio={audioRef} setting={settingpopup} setpopup={setsettingpopup} /> : <About loginhandler={login} emailcheck={validaionemail} changeemail={setvalidaionemail} err={error} passwerr={seterror} loader={logdata} setloader={setlogdata} popup={gameoverbox} removepopup={setErrorsbox} removeerrbox={setGameOverBox} updatefill={reqemail} mailfillds={setReqemail} />}
          </Route>
          <Route path="/Contact">
            {isloggedIn ? <Deshbord audio={audioRef} setting={settingpopup} setpopup={setsettingpopup} /> : <Contact loginhandler={login} emailcheck={validaionemail} changeemail={setvalidaionemail} err={error} passwerr={seterror} loader={logdata} setloader={setlogdata} popup={gameoverbox} removepopup={setErrorsbox} removeerrbox={setGameOverBox} updatefill={reqemail} mailfillds={setReqemail} />}
          </Route>

          <Route path="/PrivacyPolicy">
            {isloggedIn ? <PrivacyPolicy audio={audioRef} setting={settingpopup} setpopup={setsettingpopup} /> : <PrivacyPolicy loginhandler={login} emailcheck={validaionemail} changeemail={setvalidaionemail} err={error} passwerr={seterror} loader={logdata} setloader={setlogdata} popup={gameoverbox} removepopup={setErrorsbox} removeerrbox={setGameOverBox} updatefill={reqemail} mailfillds={setReqemail} />}
          </Route>

          <Route path="/TermsOfService">
            {isloggedIn ? <TermsOfService audio={audioRef} setting={settingpopup} setpopup={setsettingpopup} /> : <TermsOfService loginhandler={login} emailcheck={validaionemail} changeemail={setvalidaionemail} err={error} passwerr={seterror} loader={logdata} setloader={setlogdata} popup={gameoverbox} removepopup={setErrorsbox} removeerrbox={setGameOverBox} updatefill={reqemail} mailfillds={setReqemail} />}
          </Route>
          
          
           
          <Route path="/Register">
            <Register />
          </Route>
          <Route exact path="/">
          {isloggedIn ? <Deshbord audio={audioRef} setting={settingpopup} setpopup={setsettingpopup} /> :
          <NewHome loginhandler={login} emailcheck={validaionemail} changeemail={setvalidaionemail} err={error} passwerr={seterror} loader={logdata} setloader={setlogdata} popup={gameoverbox} removepopup={setErrorsbox} removeerrbox={setGameOverBox} updatefill={reqemail} mailfillds={setReqemail} />        
        }
          </Route>
          <Route exact path="/NewForgotPassword">
          <NewForgot />
          </Route>
          <Route exact path="/NewRegister">
          <NewRegister />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

// <Route path="/">
// {isloggedIn ? <Deshbord audio={audioRef} setting={settingpopup} setpopup={setsettingpopup} /> : <Home loginhandler={login} emailcheck={validaionemail} changeemail={setvalidaionemail} err={error} passwerr={seterror} loader={logdata} setloader={setlogdata} popup={gameoverbox} removepopup={setErrorsbox} removeerrbox={setGameOverBox} updatefill={reqemail} mailfillds={setReqemail} />}
// </Route>