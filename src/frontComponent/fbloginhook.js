import React from 'react';
import FacebookLogin from 'react-facebook-login';


function Fbloginhook(props) {

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

  const responseFacebook = async (response) => {


    if (response.accessToken) {
      props.showloader(true)

      var email = response.email === undefined ? (response.name.replaceAll(' ', '') + "@gmail.com") : response.email

      var username = response.name.replaceAll(' ', '') + "0"

      var formdata = new FormData()

      formdata.append("name", response.name)
      formdata.append("email", email)
      formdata.append("mobile", "")
      formdata.append("dob", "00-00-0000")
      formdata.append("username", username)
      formdata.append("password", "")
      formdata.append("register_type", "facebook")
      formdata.append("lat", "")
      formdata.append("lng", "")
      formdata.append("referralcode", "")
      formdata.append("ip_address", "")
      formdata.append("device_id", "")
      formdata.append("social_image", response.picture.data.url)





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

            window.sessionStorage.setItem("logintype", "facebook")

            window.sessionStorage.setItem("username", response.data.username);
            window.sessionStorage.setItem("id", response.data.id);
            window.sessionStorage.setItem("image", response.data.social_image);
            window.sessionStorage.setItem("music", false)
            window.sessionStorage.setItem("createdAt", response.data.created_at)
            window.sessionStorage.setItem("sound", false)
            const url2 = `${process.env.REACT_APP_URL}/api/user/profile?id=` + response.data.id;



            await fetch(url2, {
              headers: myHeaders
            }).then((response) => response.json())
              .then((response) => {

                if (response.status === 200) {

                  window.sessionStorage.setItem("hints", response.hints);
                  window.sessionStorage.setItem("points", response.currentMonth_total_points);
                  window.sessionStorage.setItem("totalpoints", response.total_points);
                  window.sessionStorage.setItem("username", response.data.username);
                  window.sessionStorage.setItem("monthtopyear", response.monthTop.yearMonth)
                  window.sessionStorage.setItem("monthtoppoint", response.monthTop.points)
                  window.sessionStorage.setItem("globalposition", response.global_postion)
                  window.sessionStorage.setItem("navlink","home")
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
    } else {

    }
  }
  //   function fbLogoutUser() {
  //     window.FB.getLoginStatus(function(response) {
  //       console.log(response)
  //         if (response && response.status === 'connected') {

  //           window.FB.logout(function(response) {
  //                 document.location.reload();
  //             });
  //         } else if (response.status === 'not_authorized') 
  //             {
  //               window.FB.logout(function(response) {
  //                 document.location.reload();
  //                 });
  //             }
  //     })}


  return (

    <>


      <FacebookLogin
        appId="672230194191065"
        autoLoad={false}
        fields="name,email,picture"
        scope="public_profile,user_friends"
        callback={responseFacebook}
        render={renderProps => (
          <button onClick={renderProps.onClick}>Custom</button>
        )}
        icon="fab fa-facebook-f"
        textButton=''
        cssClass='social-icon facebook'
      />

    </>



  );
}

export default Fbloginhook;
