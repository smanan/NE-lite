import React, { useEffect, useState, useRef } from 'react';
import Bannerad from './bannerad';
import Menubar from './Menubar';
import Sharehook from './sharehook';
import { Link } from "react-router-dom"


export default function Records(props) {
  const [settingshow, setsettingshow] = useState(props.setting)
  const [under11data, setunder11data] = useState([])
  const [under15data, setunder15data] = useState([])
  const [under18data, setunder18data] = useState([])
  const [AllAgesdata, setAllAgesdata] = useState([])
  const [under11datacountry,setunder11datacountry] = useState("")
  const [under15datacountry, setunder15datacountry] = useState("")
  const [under18datacountry, setunder18datacountry] = useState("")
  const [AllAgesdatacountry, setAllAgesdatacountry] = useState("")
  const [error, seterror] = useState("")
  const [world, setworld] = useState(false)
  const [national, setnational] = useState(false)
  const [local, setlocal] = useState(false)
  const [record, setrecord] = useState(true)
  const showtop = useRef("record")
  const nationaltype = useRef("worldwide")
  const search = useRef("")


  useEffect(() => {
    let bodyElement = document.getElementsByTagName('body')[0];
    bodyElement.className = "Dashbord";
  }, [])




  function Worldwide() {

    under11getdat()
    under15getdat()
    under18getdat()
    Allagesgetdat()

  }
  useEffect(() => {
    if (nationaltype.current === "worldwide") {


      Worldwide()
    }
  }, [])


  async function under11getdat() {
    var myHeaders = new Headers();

    myHeaders.append("APPKEY", "Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const url = `${process.env.REACT_APP_URL}/api/${nationaltype.current}?id=` + window.sessionStorage.getItem("id") + "&under_age=11&search=" + search.current

    await fetch(url, requestOptions)
      .then(response => response.json())
      .then(async (response) => {
        if (response.status === 200 && response.message === "Success") {

          if (showtop.current === "record") {
            setunder11data(response.monthtop)
            setunder11datacountry(response.monthtop_country_code)
          } else {
            setunder11data(response.data)
          }
        } else {
          seterror(response.error_message)
        }


      }).catch((err) => {

      })

  }


  async function under15getdat() {
    var myHeaders = new Headers();

    myHeaders.append("APPKEY", "Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };


    await fetch(`${process.env.REACT_APP_URL}/api/${nationaltype.current}?id=` + window.sessionStorage.getItem("id") + "&under_age=15&search=" + search.current, requestOptions)
      .then(response => response.json())
      .then(async (response) => {
        if (response.status === 200 && response.message === "Success") {

          if (showtop.current === "record") {
            setunder15data(response.monthtop)
            setunder15datacountry(response.monthtop_country_code)
          } else {
            setunder15data(response.data)
          }

        } else {
          seterror(response.error_message)
        }


      }).catch((err) => {

      })

  }

  async function under18getdat() {
    var myHeaders = new Headers();

    myHeaders.append("APPKEY", "Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    await fetch(`${process.env.REACT_APP_URL}/api/${nationaltype.current}?id=` + window.sessionStorage.getItem("id") + "&under_age=18&search=" + search.current, requestOptions)
      .then(response => response.json())
      .then(async (response) => {
        if (response.status === 200 && response.message === "Success") {
          if (showtop.current === "record") {
            setunder18data(response.monthtop)
            setunder18datacountry(response.monthtop_country_code)
          } else {
            setunder18data(response.data)
          }


        } else {
          seterror(response.error_message)
        }


      }).catch((err) => {

      })

  }

  async function Allagesgetdat() {
    var myHeaders = new Headers();

    myHeaders.append("APPKEY", "Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const url3 = `${process.env.REACT_APP_URL}/api/${nationaltype.current}?id=` + window.sessionStorage.getItem("id") + "&under_age=&search=" + search.current

    await fetch(url3, requestOptions)
      .then(response => response.json())
      .then(async (response) => {
        if (response.status === 200 && response.message === "Success") {
          if (showtop.current === "record") {
            setAllAgesdata(response.monthtop)
            setAllAgesdatacountry(response.monthtop_country_code)
          } else {
            setAllAgesdata(response.data)
          }




        } else {
          seterror(response.error_message)
        }


      }).catch((err) => {

      })

  }





  function mainfunction(e) {
    nationaltype.current = e.target.name
    if (e.target.name === "worldwide") {
      showtop.current = "worldwide"
      setworld(true)
      setnational(false)
      setlocal(false)
      setrecord(false)
    } else if (e.target.name === "nationally") {
      showtop.current = "nationally"
      setworld(false)
      setnational(true)
      setlocal(false)
      setrecord(false)
    } else if (e.target.name === "locally") {
      showtop.current = "locally"
      setworld(false)
      setnational(false)
      setlocal(true)
      setrecord(false)
    } else {
      showtop.current = "record"
      nationaltype.current = "worldwide"
      setworld(false)
      setnational(false)
      setlocal(false)
      setrecord(true)
      Worldwide()
    }
    Worldwide()
  }


  const handleSearch = async (event) => {
    let value = event.target.value;
    search.current = value

    under11getdat()
    under15getdat()
    under18getdat()
    Allagesgetdat()






  }
  function getmonth(number) {
    const currentMonth = new Date(number);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return currentMonth.getFullYear()+"-"+months[currentMonth.getMonth()]

  }





  return <>

    <Menubar setpop={setsettingshow} audioRef={props.audio} />
    <br />
    {error !== "" ? <h1 className='text-center'>{error}</h1>
      :
      <>

        <div className="container-fluid  tabbutton">
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <Link to="#" style={{ textDecoration: "none" }}>{world ? <button className="nav-link active1  butmargin" id="nav-profile-tab " data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false" name="worldwide" onClick={mainfunction}>Worldwide</button> : <button className="nav-link  butmargin" id="nav-profile-tab " data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false" name="worldwide" onClick={mainfunction}>Worldwide</button>}</Link>


            <Link to="#" style={{ textDecoration: "none" }}>{national ? <button className="nav-link active1 butmargin" id="nav-contact-tab " data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false" name="nationally" onClick={mainfunction}>Nationally</button> : <button className="nav-link  butmargin" id="nav-contact-tab " data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false" name="nationally" onClick={mainfunction}>Nationally</button>}</Link>
              <Link to="#" style={{ textDecoration: "none" }}>{local ? <button className="nav-link active1 butmargin" id="nav-contacts-tab " data-bs-toggle="tab" data-bs-target="#nav-contacts" type="button" role="tab" aria-controls="nav-contacts" aria-selected="false" name="locally" onClick={mainfunction}>Locally</button> : <button className="nav-link  butmargin" id="nav-contacts-tab " data-bs-toggle="tab" data-bs-target="#nav-contacts" type="button" role="tab" aria-controls="nav-contacts" aria-selected="false" name="locally" onClick={mainfunction}>Locally</button>}</Link>


             
             
              <Link to="#" style={{ textDecoration: "none" }}>{record ? <button className="nav-link active1  butmargin" id="nav-contacts-tab " data-bs-toggle="tab" data-bs-target="#nav-contacts" type="button" role="tab" aria-controls="nav-contacts" aria-selected="false" name="record" onClick={mainfunction}>Records</button> : <button className="nav-link  butmargin" id="nav-contacts-tab " data-bs-toggle="tab" data-bs-target="#nav-contacts" type="button" role="tab" aria-controls="nav-contacts" aria-selected="false" name="record" onClick={mainfunction}>Records</button>}</Link>
              {world? 
                <form className="search-form form ms-auto" >
                {/* <label> */}
                <span className="screen-reader-text">Search for...</span>
                <input type="search" className="search-field" onChange={handleSearch} placeholder="Search for username" />
                {/* </label> */}
                <div className='searchbtnbox' >
                  <i className="fas fa-search" id='searicon'></i>
                  <input type="button" className="search-submit button" value="" />
                </div>
              </form> : ""}
          
              {national ? <form className="search-form form ms-auto" >
                {/* <label> */}
                <span className="screen-reader-text">Search for...</span>
                <input type="search" className="search-field" onChange={handleSearch} placeholder="Search for username" />
                {/* </label> */}
                <div className='searchbtnbox' >
                  <i className="fas fa-search" id='searicon'></i>
                  <input type="button" className="search-submit button" value="" />
                </div>
              </form> : ""}
              {local ? <form className="search-form form ms-auto" >
                {/* <label> */}
                <span className="screen-reader-text">Search for...</span>
                <input type="search" className="search-field" onChange={handleSearch} placeholder="Search for username" />
                {/* </label> */}
                <div className='searchbtnbox' >
                  <i className="fas fa-search" id='searicon'></i>
                  <input type="button" className="search-submit button" value="" />
                </div>
              </form> : ""}


            </div>

          </nav>
          <br />





        </div>
        {/* {showtop.current === "record" ?
          <><div className="container-fluid">
            <div className="tab-content" id="nav-tabContent">
              <div className="tab-pane fade   show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">

                <div className="row">
                  <div className="col-md-3  mb-2">

                    <div className="headtext">
                      <p>  {under11data.length && under11data[0].total_points} pts{" "}
                        {under11data.length && under11data[0].players_name} "
                        {under11data.length && under11data[0].countryCode}"
                        {under11data.length && under11data[0].date}</p>
                    </div>





                  </div>
                  <div className="col-md-3  mb-2">

                    <div className="headtext1">
                      <p>  {under15data.length && under15data[0].total_points} pts{" "}
                        {under15data.length && under15data[0].players_name} "
                        {under15data.length && under15data[0].countryCode}"
                        {under15data.length && under15data[0].date}</p>
                    </div>







                  </div>
                  <div className="col-md-3 mb-2">


                    <div className="headtext2">
                      <p>  {under18data.length && under18data[0].total_points} pts{" "}
                        {under18data.length && under18data[0].players_name} "
                        {under18data.length && under18data[0].countryCode}"
                        {under18data.length && under18data[0].date}</p>
                    </div>








                  </div>
                  <div className="col-md-3 mb-2">


                    <div className="headtext3">
                      <p>  {AllAgesdata.length && AllAgesdata[0].total_points} pts{" "}
                        {AllAgesdata.length && AllAgesdata[0].players_name} "
                        {AllAgesdata.length && AllAgesdata[0].countryCode}"
                        {AllAgesdata.length && AllAgesdata[0].date}</p>
                    </div>









                  </div>
                </div>
              </div>
            </div>
          </div>
            <br /></>
          : ""} */}

        <div className="container-fluid">
        {record && <h3 className='all-time'>ALL TIME MONTHLY RECORDS WORLDWIDE</h3>}
          <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade   show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">


              <div className="row">

              <div className="col-md-3 mb-2">

<div className="cardboxes ">
  <div className="headtext3">
    <p style={{color:"white"}}> All Ages</p>
  </div>
  <div className="subheadingcopy" style={{ marginTop: "19px" }}>
    {/* {showtop.current !== "record"?<table >
      <thead className="subheading3">
        <th>

          <tr  >
            <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ marginRight: "17px", width: "81px" }}>Rank</div></td>
            <td style={{ wordBreak: "break-all" }}><div className='subtable12' style={{ width: "81px" }}>Name</div></td>
            <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "16px" }} >Points</td></tr>

        </th>
      </thead>
    </table>:""} */}
  </div>

  <div className='tablescroll' style={{ height: "168px !important" }}>
    <div className="subheadingcopy  table-responsive">
      <table className='tableallages'>

        {showtop.current !== "record" ? <>
          <thead className="subheading3">

            <tr  >
              <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ marginRight: "17px", width: "81px", fontWeight: "700" }}>Rank</div></td>
              <td style={{ wordBreak: "break-all" }}><div className='subtable12' style={{ width: "81px", fontWeight: "700" }}>Name</div></td>
              <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "16px", fontWeight: "700" }} >Points</td></tr>


          </thead>




          <tbody>
            {AllAgesdata.length > 0 && AllAgesdata.map((number, key) =>

              <tr key={key} >
                <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>{number.position}</div></td>
                <td style={{ wordBreak: "break-all" }}><div className='subtable12' style={{ width: "81px" }}>{number.players_name}</div></td>
                <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "8px" }} >{parseInt(number.total_points) < 0 ? <span style={{ color: "red" }}>{number.total_points}</span> : <span >{number.total_points}</span>}</td></tr>
            )}</tbody></> : <>
          <tbody>
            <tr >
              <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>Points</div></td>
              <td style={{ wordBreak: "break-all" }}><div className='subtable11' style={{ width: "123px" }}>{AllAgesdata.total}</div></td>
            </tr>
            <tr >
              <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>Username</div></td>
              <td style={{ wordBreak: "break-all" }}><div className='subtable11' style={{ width: "123px" }}>{AllAgesdata.username}</div></td>
            </tr>
            <tr >
              <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>Locally</div></td>
              <td style={{ wordBreak: "break-all" }}><div className='subtable11' style={{ width: "123px" }}>{AllAgesdata.city}</div></td>
            </tr>
            <tr >
              <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>Country</div></td>
              <td style={{ wordBreak: "break-all" }}><div className='subtable11' style={{ width: "123px" }}>{AllAgesdatacountry}</div></td>
            </tr>
            <tr >
              <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>Date</div></td>
              <td style={{ wordBreak: "break-all" }}><div className='subtable11' style={{ width: "123px" }}>{getmonth(AllAgesdata.month_year)}</div></td>
            </tr>
           </tbody></>
        }





      </table>
    </div>
  </div>
  <br />

</div>




</div>


<div className="col-md-3 mb-2">

<div className="cardboxes ">
  <div className="headtext2">
    <p style={{color:"white"}}>Under 18</p>
  </div>
  <div className="subheadingcopy" style={{ marginTop: "19px" }}>

  </div>


  <div className='tablescroll'>
    <div className="subheadingcopy">
      <table className='table18data'>



        {showtop.current !== "record" ? <>
          <thead className="subheading2">


            <tr  >
              <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px", fontWeight: "700" }}>Rank</div></td>
              <td style={{ wordBreak: "break-all" }}><div className='subtable12' style={{ width: "81px", fontWeight: "700" }}>Name</div></td>
              <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "8px", fontWeight: "700" }} >Points</td></tr>


          </thead>


          <tbody>


            {under18data.length > 0 && under18data.map((number, key) =>
              <tr key={key} >
                <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>{number.position}</div></td>
                <td style={{ wordBreak: "break-all" }}><div className='subtable12' style={{ width: "81px" }}>{number.players_name}</div></td>
                <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "8px" }} >{parseInt(number.total_points) < 0 ? <span style={{ color: "red" }}>{number.total_points}</span> : <span >{number.total_points}</span>}</td></tr>
            )}</tbody></> : <>
          <tbody>
            <tr >
              <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>Points</div></td>
              <td style={{ wordBreak: "break-all" }}><div className='subtable11' style={{ width: "123px" }}>{under18data.total}</div></td>
            </tr>
            <tr >
              <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>Username</div></td>
              <td style={{ wordBreak: "break-all" }}><div className='subtable11' style={{ width: "123px" }}>{under18data.username}</div></td>
            </tr>
            <tr >
              <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>Locally</div></td>
              <td style={{ wordBreak: "break-all" }}><div className='subtable11' style={{ width: "123px" }}>{under18data.city}</div></td>
            </tr>
            <tr >
              <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>Country</div></td>
              <td style={{ wordBreak: "break-all" }}><div className='subtable11' style={{ width: "123px" }}>{under18datacountry}</div></td>
            </tr>
            <tr >
              <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>Date</div></td>
              <td style={{ wordBreak: "break-all" }}><div className='subtable11' style={{ width: "123px" }}>{getmonth(under18data.month_year) }</div></td>
            </tr>
            </tbody>
        </>}




      </table>
    </div>
  </div>
  <br />

</div>


</div>

<div className="col-md-3  mb-2">
                  <div className="cardboxes  ">
                    <div className="headtext1">
                      <p style={{color:"white"}}>Under 15</p>
                    </div>

                    <div className="subheadingcopy" style={{ marginTop: "19px" }}>

                    </div>
                    <div className='tablescroll'>
                      <div className="subheadingcopy">
                        <table className='table15data'>
                          {showtop.current !== "record" ? <>
                            <thead className="subheading1">


                              <tr  >
                                <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px", fontWeight: "700" }}>Rank</div></td>
                                <td style={{ wordBreak: "break-all" }}><div className='subtable12' style={{ width: "81px", fontWeight: "700" }}>Name</div></td>
                                <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "8px", fontWeight: "700" }} >Points</td></tr>


                            </thead>


                            <tbody>



                              {under15data.length > 0 && under15data.map((number, key) =>
                                <tr key={key} >
                                  <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>{number.position}</div></td>
                                  <td style={{ wordBreak: "break-all" }}><div className='subtable12' style={{ width: "81px" }}>{number.players_name}</div></td>
                                  <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "8px" }} >{parseInt(number.total_points) < 0 ? <span style={{ color: "red" }}>{number.total_points}</span> : <span >{number.total_points}</span>}</td></tr>
                              )}</tbody></> : <>
                            <tbody>
                              <tr >
                                <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>Points</div></td>
                                <td style={{ wordBreak: "break-all" }}><div className='subtable11' style={{ width: "123px" }}>{under15data.total}</div></td>
                              </tr>
                              <tr >
                                <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>Username</div></td>
                                <td style={{ wordBreak: "break-all" }}><div className='subtable11' style={{ width: "123px" }}>{under15data.username}</div></td>
                              </tr>
                              <tr >
                                <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>Locally</div></td>
                                <td style={{ wordBreak: "break-all" }}><div className='subtable11' style={{ width: "123px" }}>{under15data.city}</div></td>
                              </tr>
                              <tr >
                                <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>Country</div></td>
                                <td style={{ wordBreak: "break-all" }}><div className='subtable11' style={{ width: "123px" }}>{under15datacountry}</div></td>
                              </tr>
                              <tr >
                                <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>Date</div></td>
                                <td style={{ wordBreak: "break-all" }}><div className='subtable11' style={{ width: "123px" }}>{getmonth(under15data.month_year) }</div></td>
                              </tr>
                              </tbody>
                          </>}



                        </table>
                      </div>
                    </div>
                    <br />

                  </div>


                </div>
               


                <div className="col-md-3  mb-2">
                  <div className="cardboxes " >
                    <div className="headtext">
                      <p style={{color:"white"}}>Under 11</p>
                    </div>
                    <div className="subheadingcopy" style={{ marginTop: "19px" }}>
                    </div>
                    <div className='tablescroll'>
                      <div className="subheadingcopy">
                        <table className='table11data'>
                          {showtop.current !== "record" ? <>
                            <thead className="subheading">


                              <tr  >
                                <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px", fontWeight: "700" }}>Rank</div></td>
                                <td style={{ wordBreak: "break-all" }}><div className='subtable12' style={{ width: "81px", fontWeight: "700" }}>Name</div></td>
                                <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "8px", fontWeight: "700" }} >Points</td></tr>


                            </thead>



                            <tbody>
                              {under11data?.length > 0 && under11data?.map((number, key) =>
                                <tr key={key} >
                                  <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>{number.position}</div></td>
                                  <td style={{ wordBreak: "break-all" }}><div className='subtable12' style={{ width: "81px" }}>{number.players_name}</div></td>
                                  <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "8px" }} >{parseInt(number.total_points) < 0 ? <span style={{ color: "red" }}>{number.total_points}</span> : <span >{number.total_points}</span>}</td></tr>
                              )}</tbody></> : <>

                            <tbody>
                              <tr >
                                <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>Points</div></td>
                                <td style={{ wordBreak: "break-all" }}><div className='subtable11' style={{ width: "123px" }}>{under11data?.total}</div></td>
                              </tr>
                              <tr >
                                <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>Username</div></td>
                                <td style={{ wordBreak: "break-all" }}><div className='subtable11' style={{ width: "123px" }}>{under11data?.username}</div></td>
                              </tr>
                              <tr >
                                <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>Locally</div></td>
                                <td style={{ wordBreak: "break-all" }}><div className='subtable11' style={{ width: "123px" }}>{under11data?.city}</div></td>
                              </tr>
                              <tr >
                                <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>Country</div></td>
                                <td style={{ wordBreak: "break-all" }}><div className='subtable11' style={{ width: "123px" }}>{under11datacountry}</div></td>
                              </tr>
                              <tr >
                                <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>Date</div></td>
                                <td style={{ wordBreak: "break-all" }}><div className='subtable11' style={{ width: "123px" }}>{getmonth(under11data?.month_year) }</div></td>
                              </tr>
                             </tbody>
                          </>}





                        </table>
                      </div>
                    </div>


                  </div>
                </div>
               
                
              </div>







            </div>
          </div>
          <div >
            <div className='flex-container' style={{ width: "100%" }} >
              <div style={{ width: "50%" }}>
                <Link to="/ranking">
                  <button type="button" className="sherebox sherebtn" style={{ float: "right", marginRight: "10px" }}><span class="back-btn-new"><img src="./images/entypo_back.png" style={{ marginTop: "-2px" }} alt="" /></span><span className='back-font'>Back</span></button></Link>

              </div>


              <div style={{ width: "50%" }}>
                <Sharehook />
              </div>
            </div>
            <br />
            <Bannerad />
          </div>
        </div>





      </>}

  </>;
}
