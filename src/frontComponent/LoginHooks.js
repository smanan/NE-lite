import React from 'react';
import { useGoogleLogin } from 'react-google-login';


// refresh token
import { refreshTokenSetup } from '../utils/refreshToken';

// For Local server uncomment below commentid
 const clientId =
 '981474111172-2tnnhqurattsr3a6nmt7asp8b52a356j.apps.googleusercontent.com';
//  For testing server uncomment below commentid
// const clientId =
//   '981474111172-cgnkrhht7ete180b8qq39r3h9o20rpr7.apps.googleusercontent.com';

//  For Live server server uncomment below clientid
  // const clientId =
  //  '981474111172-leavehm46ikosquejc55ofvtnl2i9eqa.apps.googleusercontent.com';

function LoginHooks(props) {
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

      if (resp.status === 200 && resp.message === "Success") {

        window.sessionStorage.setItem("match_id", resp.user1.match_id);
        await fetch(url2, {
          headers: myHeaders
        }).then((response) => response.json())
          .then((response) => {
            if (response.status === 200) {



              // window.sessionStorage.setItem("image", response.image_path+"/"+response.data.image);
              window.sessionStorage.setItem("playButtonStatus", response.playButtonStatus)
              window.sessionStorage.setItem("hints", response.hints)
              window.sessionStorage.setItem("points", response.currentMonth_total_points)
              window.sessionStorage.setItem("totalpoints", response.total_points);
              window.sessionStorage.setItem("monthtopyear", response.monthTop.yearMonth)
              window.sessionStorage.setItem("monthtoppoint", response.monthTop.points)
             


            } else {
              //  window.sessionStorage.setItem("image", require('../assets/images/profilephoto.png'));


            }


          }).catch((err) => {

          })

      } else {
        alert("Data not found")


      }
    })



  }
  const onSuccess = async (res) => {
    props.showloader(true)


    var formdata = new FormData()
    formdata.append("name", res.profileObj.name)
    formdata.append("email", res.profileObj.email)
    formdata.append("mobile", "")
    formdata.append("dob", "00-00-0000")
    formdata.append("username", res.profileObj.name)
    formdata.append("password", "")
    formdata.append("register_type", "google")
    formdata.append("lat", "")
    formdata.append("lng", "")
    formdata.append("referralcode", "")
    formdata.append("ip_address", "")
    formdata.append("device_id", "")
    formdata.append("social_image", res.profileObj.imageUrl)





    var myHeaders = new Headers();
    myHeaders.append(
      'APPKEY',
      'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
    );
    const registerurl = `${process.env.REACT_APP_URL}/api/user/register`

    await fetch(registerurl, {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    }).then((response) => response.json())
      .then(async (response) => {


        if (response.status === 200) {

          window.sessionStorage.setItem("logintype", "google")

          window.sessionStorage.setItem("username", response.data.username);
          window.sessionStorage.setItem("id", response.data.id);
          window.sessionStorage.setItem("image", response.data.social_image);
          window.sessionStorage.setItem("music", false)
          window.sessionStorage.setItem("sound", false)
          window.sessionStorage.setItem("createdAt", response.data.created_at)
          const url2 = `${process.env.REACT_APP_URL}/api/user/profile?id=` + response.data.id;



          await fetch(url2, {
            headers: myHeaders
          }).then((response) => response.json())
            .then((response) => {

              if (response.status === 200) {


                window.sessionStorage.setItem("playButtonStatus", response.playButtonStatus)
                window.sessionStorage.setItem("hints", response.hints);
                window.sessionStorage.setItem("points", response.currentMonth_total_points);
                window.sessionStorage.setItem("totalpoints", response.total_points);
                window.sessionStorage.setItem("username", response.data.username);
                window.sessionStorage.setItem("monthtopyear", response.monthTop.yearMonth)
                window.sessionStorage.setItem("monthtoppoint", response.monthTop.points)
                window.sessionStorage.setItem("globalposition", response.global_postion)
                window.sessionStorage.setItem("navlink", "home")
                afterlogin()

              } else {



              }


            })
          props.showloader(false)
          if (response.data.subscription_id === null) {
            window.sessionStorage.setItem("subscribe", "")
          } else {
            window.sessionStorage.setItem("subscribe", "data")
          }
          //  if(response.data.subscription_id === null){
          //   window.sessionStorage.setItem("token", true);

          //   window.open("/Subscribeplan", "_self")
          // }else{
          window.sessionStorage.setItem("token", true);


          window.open("/Dashboard", "_self")
          // }




        } else {

        }




      })
    // refreshTokenSetup(res);
  };

  const onFailure = (res) => {

    props.showloader(false)

  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
    // responseType: 'code',
    // prompt: 'consent',
  });



  return (
    <div>
      <div className="social-icon facebook metro" style={{ cursor: "pointer", marginRight: '10px' }} onClick={signIn}>
        <i className="fab fa-facebook-f"></i>
      </div>
      <div className="social-icon facebook" style={{ cursor: "pointer" }} onClick={signIn}>
        <i className="fab fa-google" ></i>
      </div>
    </div>



  );
}

export default LoginHooks;

// <span className="iconbox" >
// <i className="fab fa-google" ></i>
// <i className='fa fa-google'></i>
// </span>