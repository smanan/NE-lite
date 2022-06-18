import React, { useState, useEffect } from 'react';

import Bannerad from './bannerad';
import Menubar from './Menubar';
import Sharehook from './sharehook';
import Sound from "./Sound"
export default function History(props) {
  const [settingshow, setsettingshow] = useState(props.setting)
  const [historudata, sethistorudata] = useState([])
  const [esaydata, setesaydata] = useState([])
  const [Medium, setMedium] = useState([])
  const [Expertdata, setExpertdata] = useState([])
  const [Geniusdata, setGeniusdata] = useState([])

  useEffect(() => {
    let bodyElement = document.getElementsByTagName('body')[0];
    bodyElement.className = "Dashbord";


  }, [])










  async function historygetdat() {
    var myHeaders = new Headers();

    myHeaders.append("APPKEY", "Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    var data1 = new Date();

    var data = data1.getFullYear() + "-" + (data1.getMonth() + 1 < 10 ? `0${data1.getMonth() + 1}` : data1.getMonth() + 1)

    await fetch(`${process.env.REACT_APP_URL}/api/user/history?user_id=` + window.sessionStorage.getItem("id") + "&level=1&date=" + data, requestOptions)
      .then(response => response.json())
      .then(async (response) => {
        sethistorudata(response.yearMonthData)



      }).catch((err) => {

      })

  }





  async function easygetdata() {
    var myHeaders = new Headers();

    myHeaders.append("APPKEY", "Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    var data1 = new Date();

    var data = data1.getFullYear() + "-" + (data1.getMonth() + 1 < 10 ? `0${data1.getMonth() + 1}` : data1.getMonth() + 1)


    await fetch(`${process.env.REACT_APP_URL}/api/user/history?user_id=` + window.sessionStorage.getItem("id") + "&level=1&date=" + data, requestOptions)
      .then(response => response.json())
      .then(async (response) => {
        setesaydata(response.data)



      }).catch((err) => {

      })

  }




  async function mediumgetdata() {
    var myHeaders = new Headers();

    myHeaders.append("APPKEY", "Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    var data1 = new Date();

    var data = data1.getFullYear() + "-" + (data1.getMonth() + 1 < 10 ? `0${data1.getMonth() + 1}` : data1.getMonth() + 1)

    await fetch(`${process.env.REACT_APP_URL}/api/user/history?user_id=` + window.sessionStorage.getItem("id") + "&level=2&date=" + data, requestOptions)
      .then(response => response.json())
      .then(async (response) => {
        setMedium(response.data)


      }).catch((err) => {

      })

  }



  async function Expertgetdata() {
    var myHeaders = new Headers();

    myHeaders.append("APPKEY", "Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    // await fetch("${process.env.REACT_APP_URL}/api/user/history?user_id=92&level=3&date=2022-02", requestOptions)



    var data1 = new Date();

    var data = data1.getFullYear() + "-" + (data1.getMonth() + 1 < 10 ? `0${data1.getMonth() + 1}` : data1.getMonth() + 1)


    await fetch(`${process.env.REACT_APP_URL}/api/user/history?user_id=` + window.sessionStorage.getItem("id") + "&level=3&date=" + data, requestOptions)

      .then(response => response.json())
      .then(async (response) => {
        setExpertdata(response.data)


      }).catch((err) => {

      })

  }


  async function Geniusgetdata() {
    var myHeaders = new Headers();

    myHeaders.append("APPKEY", "Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    var data1 = new Date();

    var data = data1.getFullYear() + "-" + (data1.getMonth() + 1 < 10 ? `0${data1.getMonth() + 1}` : data1.getMonth() + 1)

    await fetch(`${process.env.REACT_APP_URL}/api/user/history?user_id=` + window.sessionStorage.getItem("id") + "&level=4&date=" + data, requestOptions)
      .then(response => response.json())
      .then(async (response) => {
        setGeniusdata(response.data)


      }).catch((err) => {

      })

  }








  useEffect(() => {
    historygetdat()
    easygetdata()
    mediumgetdata()
    Expertgetdata()
    Geniusgetdata()
  }, [])

  function getmonth(number) {
    const currentMonth = new Date(number);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return currentMonth.getFullYear() + "-" + months[currentMonth.getMonth()]

  }
  function getmonthdate(number) {
    const currentMonth = new Date(number);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
   var value = String(currentMonth.getDate()).length === 1?"0"+currentMonth.getDate():currentMonth.getDate()
    return currentMonth.getFullYear() + "-" + months[currentMonth.getMonth()] + "-" +value

  }

  return <>

    <Menubar setpop={setsettingshow} audioRef={props.audio} />
    <div className="container-fluid">
      <div className="underdivs">


        <span className="color-game text-center point marbn10p"> <b>History</b></span>
      </div>
      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade   show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" style={{ marginTop: "-23px" }}>


          <div className="row">
            <div className="col-md-3  mb-2">


              <div className="subheadingcopy" style={{ marginTop: "19px" }}>
                {/* <table >
                  <th>
                    <thead className="subheading" style={{ backgroundColor: "#0078B6" }}>
                      {historudata.slice(0, 1).map((number) =>
                        <tr>
                          <td style={{ textAlign: "center", fontWeight: "700" }}><div className='subtable12' style={{width:"200px",fontSize: "17.2px"}}>{getmonth(number.yearMonth)}</div></td>
                          <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "8px" }} >{parseInt(number.YearMonthTotalPoint) < 0 ? <span style={{ color: "red" }}>{number.YearMonthTotalPoint}</span> : <span >{number.YearMonthTotalPoint}</span>}</td></tr>
                      )}

                    </thead>
                  </th>
                </table> */}
              </div>

              <div className="subheadingcopy">
                <table className='table11data'>


                  <thead className="subheading" style={{ backgroundColor: "#0078B6", color: "white" }}>
                    {historudata.slice(0, 1).map((number) =>
                      <tr>
                        <td style={{ textAlign: "center", fontWeight: "700" }}><div className='subtable12' style={{ width: "200px", fontSize: "17.2px" }}>{getmonth(number.yearMonth)}</div></td>
                        <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "8px", fontWeight: "700" }} >{parseInt(number.YearMonthTotalPoint) < 0 ? <span style={{ color: "red" }}>{number.YearMonthTotalPoint}</span> : <span >{number.YearMonthTotalPoint}</span>}</td></tr>
                    )}

                  </thead>

                  <tbody>

                    {historudata.slice(1, 3).map((number) =>
                      <tr>

                        <td style={{ textAlign: "center", fontWeight: "700" }}><div className='subtable12' style={{ width: "200px", fontSize: "17.2px" }}>{getmonth(number.yearMonth)}</div></td>
                        <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "8px", fontWeight: "700" }} >{parseInt(number.YearMonthTotalPoint) < 0 ? <span style={{ color: "red" }}>{number.YearMonthTotalPoint}</span> : <span >{number.YearMonthTotalPoint}</span>}</td></tr>
                    )}









                  </tbody>
                </table>
              </div>




            </div>
            <div className="col-md-3  mb-2">



              <div className="subheadingcopy" style={{ marginTop: "19px" }}>
                {/* <table >
                  <th>
                    <thead className="subheading1">

                      {historudata.slice(3, 4).map((number) =>
                        <tr>
                          <td style={{ textAlign: "center", fontWeight: "700" }}><div className='subtable12' style={{width:"200px"}}>{getmonth(number.yearMonth)}</div></td>
                          <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "8px" }} >{parseInt(number.YearMonthTotalPoint) < 0 ? <span style={{ color: "red" }}>{number.YearMonthTotalPoint}</span> : <span >{number.YearMonthTotalPoint}</span>}</td></tr>
                      )}
                    </thead>
                  </th>
                </table> */}
              </div>

              <div className="subheadingcopy">
                <table className='table15data'>

                  <thead className="subheading1">

                    {historudata.slice(3, 4).map((number) =>
                      <tr>
                        <td style={{ textAlign: "center", fontWeight: "700" }}><div className='subtable12' style={{ width: "200px", fontSize: "17.2px" }}>{getmonth(number.yearMonth)}</div></td>
                        <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "8px", fontWeight: "700" }} >{parseInt(number.YearMonthTotalPoint) < 0 ? <span style={{ color: "red" }}>{number.YearMonthTotalPoint}</span> : <span >{number.YearMonthTotalPoint}</span>}</td></tr>
                    )}
                  </thead>


                  <tbody>

                    {historudata.slice(4, 6).map((number) =>
                      <tr>
                        <td style={{ textAlign: "center", fontWeight: "700" }}><div className='subtable12' style={{ width: "200px", fontSize: "17.2px" }}>{getmonth(number.yearMonth)}</div></td>
                        <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "8px", fontWeight: "700" }} >{parseInt(number.YearMonthTotalPoint) < 0 ? <span style={{ color: "red" }}>{number.YearMonthTotalPoint}</span> : <span >{number.YearMonthTotalPoint}</span>}</td></tr>
                    )}


                  </tbody>
                </table>
              </div>





            </div>
            <div className="col-md-3 mb-2">



              <div className="subheadingcopy" style={{ marginTop: "19px" }}>
                {/* <table >
                  <th>
                    <thead className="subheading2">

                      {historudata.slice(6, 7).map((number) =>
                        <tr>
                          <td style={{ textAlign: "center", fontWeight: "700" }}><div className='subtable12' style={{width:"200px",fontSize: "17.2px"}}>{getmonth(number.yearMonth)}</div></td>
                          <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "8px" }} >{parseInt(number.YearMonthTotalPoint) < 0 ? <span style={{ color: "red" }}>{number.YearMonthTotalPoint}</span> : <span >{number.YearMonthTotalPoint}</span>}</td></tr>
                      )}
                    </thead>
                  </th>
                </table> */}
              </div>



              <div className="subheadingcopy">
                <table className='table18data'>
                  <thead className="subheading2">

                    {historudata.slice(6, 7).map((number) =>
                      <tr>
                        <td style={{ textAlign: "center", fontWeight: "700" }}><div className='subtable12' style={{ width: "200px", fontSize: "17.2px" }}>{getmonth(number.yearMonth)}</div></td>
                        <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "8px", fontWeight: "700" }} >{parseInt(number.YearMonthTotalPoint) < 0 ? <span style={{ color: "red" }}>{number.YearMonthTotalPoint}</span> : <span >{number.YearMonthTotalPoint}</span>}</td></tr>
                    )}
                  </thead>


                  <tbody>

                    {historudata.slice(7, 9).map((number) =>
                      <tr>
                        <td style={{ textAlign: "center", fontWeight: "700" }}><div className='subtable12' style={{ width: "200px", fontSize: "17.2px" }}>{getmonth(number.yearMonth)}</div></td>
                        <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "8px", fontWeight: "700" }} >{parseInt(number.YearMonthTotalPoint) < 0 ? <span style={{ color: "red" }}>{number.YearMonthTotalPoint}</span> : <span >{number.YearMonthTotalPoint}</span>}</td></tr>
                    )}



                  </tbody>
                </table>
              </div>






            </div>
            <div className="col-md-3 mb-2">



              <div className="subheadingcopy" style={{ marginTop: "19px" }}>
                {/* <table >
                  <th>
                    <thead className="subheading3">


                      {historudata.slice(9, 10).map((number) =>
                        <tr>
                          <td style={{ textAlign: "center", fontWeight: "700" }}><div className='subtable12' style={{width:"200px",fontSize: "17.2px"}}>{getmonth(number.yearMonth)}</div></td>
                          <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "8px" }} >{parseInt(number.YearMonthTotalPoint) < 0 ? <span style={{ color: "red" }}>{number.YearMonthTotalPoint}</span> : <span >{number.YearMonthTotalPoint}</span>}</td></tr>
                      )}
                    </thead>
                  </th>
                </table> */}
              </div>


              <div className="subheadingcopy  ">
                <table className='tableallages'>
                  <thead className="subheading3">


                    {historudata.slice(9, 10).map((number) =>
                      <tr>
                        <td style={{ textAlign: "center", fontWeight: "700" }}><div className='subtable12' style={{ width: "200px", fontSize: "17.2px" }}>{getmonth(number.yearMonth)}</div></td>
                        <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "8px", fontWeight: "700" }} >{parseInt(number.YearMonthTotalPoint) < 0 ? <span style={{ color: "red" }}>{number.YearMonthTotalPoint}</span> : <span >{number.YearMonthTotalPoint}</span>}</td></tr>
                    )}
                  </thead>

                  <tbody>


                    {historudata.slice(10, 12).map((number) =>
                      <tr>
                        <td style={{ textAlign: "center", fontWeight: "700" }}><div className='subtable12' style={{ width: "200px", fontSize: "17.2px" }}>{getmonth(number.yearMonth)}</div></td>
                        <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "8px", fontWeight: "700" }} >{parseInt(number.YearMonthTotalPoint) < 0 ? <span style={{ color: "red" }}>{number.YearMonthTotalPoint}</span> : <span >{number.YearMonthTotalPoint}</span>}</td></tr>
                    )}






                  </tbody>
                </table>
              </div>






            </div>
          </div>







        </div>
      </div>


    </div>

    <div className="underdivs" style={{ marginTop: "-5px" }}>


      <span className="color-game text-center point"> <b>Current Monthly Points</b></span>
    </div>


    <div className="container-fluid">
      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade   show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">


          <div className="row">
            <div className="col-md-3  mb-2">
              <div className="cardboxes ">
                <div className="headtext">
                  <p style={{color:"white"}}>Easy</p>
                </div>
                <div className="subheadingcopy" style={{ marginTop: "19px" }}>
                  {/* <table >
                    <th>
                      <thead className="subheading">

                        <tr  >
                          <td style={{ textAlign: "center", fontWeight: "700" }}><div className='subtable12' style={{width:"200px",fontSize: "17.2px"}}>Date & Time </div></td>

                          <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "8px" }} >Points</td></tr>

                      </thead>
                    </th>
                  </table> */}
                </div>
                <div className='tablescroll'>
                  <div className="subheadingcopy">
                    <table className='table11data'>
                      <thead className="subheading">

                        <tr  >
                          <td style={{ textAlign: "center", fontWeight: "700" }}><div className='subtable12' style={{ width: "200px", fontSize: "17.2px" }}>Date & Time </div></td>

                          <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "8px", fontWeight: "700" }} >Points</td></tr>

                      </thead>
                      <tbody>



                        {esaydata.map((esayLavel) =>
                          <tr>
                            <td style={{ textAlign: "center" }}><div className='subtable12' style={{ width: "200px", fontSize: "17.2px" }}>{getmonthdate(esayLavel.date)} {esayLavel.end_time}</div></td>
                            {esayLavel.total_points <= "0" ? <td className='ms-auto' style={{ width: "7.5%", textAlign: "right", paddingRight: "8px", color: "red" }} >{esayLavel.total_points}</td> : <td className='ms-auto' style={{ width: "7.5%", textAlign: "right", paddingRight: "8px" }} >{esayLavel.total_points}</td>}</tr>
                        )}








                      </tbody>
                    </table>
                  </div>
                </div>


              </div>
            </div>
            <div className="col-md-3  mb-2">
              <div className="cardboxes  ">
                <div className="headtext1">
                  <p style={{color:"white"}}> Medium</p>
                </div>

                <div className="subheadingcopy" style={{ marginTop: "19px" }}>
                  {/* <table >
                    <th>
                      <thead className="subheading1">

                        <tr  >
                          <td style={{ textAlign: "center", fontWeight: "700" }}><div className='subtable12' style={{width:"200px",fontSize: "17.2px"}}>Date & Time </div></td>

                          <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "8px" }} >Points</td></tr>

                      </thead>
                    </th> 
                  </table> */}
                </div>
                <div className='tablescroll'>
                  <div className="subheadingcopy">
                    <table className='table15data'>
                      <thead className="subheading1">

                        <tr  >
                          <td style={{ textAlign: "center", fontWeight: "700" }}><div className='subtable12' style={{ width: "200px", fontSize: "17.2px" }}>Date & Time </div></td>

                          <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "8px", fontWeight: "700" }} >Points</td></tr>

                      </thead>

                      <tbody>





                        {Medium.map((esayLavel) =>
                          <tr>
                            <td style={{ textAlign: "center" }}><div className='subtable12' style={{ width: "200px", fontSize: "17.2px" }}>{getmonthdate(esayLavel.date)} {esayLavel.end_time}</div></td>
                            {esayLavel.total_points <= "0" ? <td className='ms-auto' style={{ width: "10.5%", textAlign: "right", paddingRight: "8px", color: "red" }} >{esayLavel.total_points}</td> : <td className='ms-auto' style={{ width: "7.5%", textAlign: "right", paddingRight: "8px" }} >{esayLavel.total_points}</td>}</tr>
                        )}





                      </tbody>
                    </table>
                  </div>
                </div>
                <br />

              </div>


            </div>
            <div className="col-md-3 mb-2">

              <div className="cardboxes ">
                <div className="headtext2">
                  <p style={{color:"white"}}>Expert</p>
                </div>
                <div className="subheadingcopy" style={{ marginTop: "19px" }}>
                  {/* <table >
                    <th>
                      <thead className="subheading2">

                        <tr  >
                          <td style={{ textAlign: "center", fontWeight: "700" }}><div className='subtable12' style={{width:"200px",fontSize: "17.2px"}}>Date & Time </div></td>

                          <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "8px" }} >Points</td></tr>

                      </thead>
                    </th>
                  </table> */}
                </div>


                <div className='tablescroll'>
                  <div className="subheadingcopy">
                    <table className='table18data'>
                      <thead className="subheading2">

                        <tr  >
                          <td style={{ textAlign: "center", fontWeight: "700" }}><div className='subtable12' style={{ width: "200px", fontSize: "17.2px" }}>Date & Time </div></td>

                          <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "8px", fontWeight: "700" }} >Points</td></tr>

                      </thead>

                      <tbody>

                        {Expertdata.map((esayLavel) =>
                          <tr>
                            <td style={{ textAlign: "center" }}><div className='subtable12' style={{ width: "200px", fontSize: "17.2px" }}>{getmonthdate(esayLavel.date)} {esayLavel.end_time}</div></td>
                            {esayLavel.total_points <= "0" ? <td className='ms-auto' style={{ width: "10.5%", textAlign: "right", paddingRight: "8px", color: "red" }} >{esayLavel.total_points}</td> : <td className='ms-auto' style={{ width: "7.5%", textAlign: "right", paddingRight: "8px" }} >{esayLavel.total_points}</td>}</tr>
                        )}


                      </tbody>
                    </table>
                  </div>
                </div>
                <br />

              </div>


            </div>
            <div className="col-md-3 mb-2">

              <div className="cardboxes ">
                <div className="headtext3">
                  <p style={{color:"white"}}>Genius</p>
                </div>
                <div className="subheadingcopy" style={{ marginTop: "19px" }}>
                  {/* <table >
                    <th>
                      <thead className="subheading3">


                        <tr  >
                          <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{width:"130px"}}>Date & Time</div></td>
                          <td style={{ wordBreak: "break-all" }}><div className='subtable12' style={{width:"50px"}}>Word</div></td>
                          <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "8px" }} >Points</td></tr>

                      </thead>
                    </th>
                  </table> */}
                </div>

                <div className='tablescroll'>
                  <div className="subheadingcopy  ">
                    <table className='tableallages'>

                      <thead className="subheading3">


                        <tr  >
                          <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "140px", fontWeight: "700" }}>Date & Time</div></td>
                          <td style={{ wordBreak: "break-all" }}><div className='subtable12' style={{ width: "50px", fontWeight: "700" }}>Word</div></td>
                          <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "8px", fontWeight: "700" }} >Points</td></tr>

                      </thead>
                      <tbody>


                        {Geniusdata.map((GeniusLavel, key) =>
                          <tr key={key} >
                            <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "150px", marginLeft: "-10px" }}>{getmonthdate(GeniusLavel.date)}{" "}{GeniusLavel.end_time}</div></td>
                            <td style={{ wordBreak: "break-all" }}><div className='subtable12' style={{ width: "50px", textAlign: 'center' }}>{GeniusLavel.length}</div></td>
                            {GeniusLavel.total_points <= "0" ? <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "8px", color: "red" }} >{GeniusLavel.total_points}</td> : <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "8px" }} >{GeniusLavel.total_points}</td>}</tr>
                        )}







                      </tbody>
                    </table>
                  </div>
                </div>
                <br />

              </div>




            </div>
          </div>







        </div>
      </div>


    </div>

    {settingshow ?
      <Sound settinghide={setsettingshow} audioRef={props.audio} />
      : ""}

    <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
      <Sharehook />
    </div>
    <Bannerad />

  </>;
}
