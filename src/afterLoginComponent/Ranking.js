import React, { useEffect, useState, useRef } from 'react';
import Bannerad from './bannerad';
import Menubar from './Menubar';
import Sharehook from './sharehook';
import { Link } from "react-router-dom"


export default function Ranking(props) {
  const [settingshow, setsettingshow] = useState(props.setting)
  const [under11data, setunder11data] = useState([])
  const [under15data, setunder15data] = useState([])
  const [under18data, setunder18data] = useState([])
  const [AllAgesdata, setAllAgesdata] = useState([])
  const [world, setworld] = useState(true)
  const [national, setnational] = useState(false)
  const [local, setlocal] = useState(false)
  const [error, seterror] = useState("")

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
          setunder11data(response.data)

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
          setunder15data(response.data)


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
          setunder18data(response.data)


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
          setAllAgesdata(response.data)



        } else {
          seterror(response.error_message)
        }


      }).catch((err) => {

      })

  }





  function mainfunction(e) {
    nationaltype.current = e.target.name
    if (e.target.name === "worldwide") {
      setworld(true)
      setnational(false)
      setlocal(false)
    } else if (e.target.name === "nationally") {
      setworld(false)
      setnational(true)
      setlocal(false)
    } else if (e.target.name === "locally") {
      setworld(false)
      setnational(false)
      setlocal(true)
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





  return <>

    <Menubar setpop={setsettingshow} audioRef={props.audio} />
    <br />
    {error !== "" ? <h1 className='text-center'>{error}</h1>
      :
      <>

        <div className="container-fluid  tebbutton">
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <Link to="#" style={{ textDecoration: "none" }}>{world ? <button className="nav-link active1  butmargin" id="nav-profile-tab " data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false" name="worldwide" onClick={mainfunction}>Worldwide</button> : <button className="nav-link " id="nav-profile-tab " data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false" name="worldwide" onClick={mainfunction}>Worldwide</button>}</Link>
              
            <Link to="#" style={{ textDecoration: "none" }}>{national ? <button className="nav-link active1  butmargin" id="nav-contact-tab " data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false" name="nationally" onClick={mainfunction}>Nationally</button> : <button className="nav-link " id="nav-contact-tab " data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false" name="nationally" onClick={mainfunction}>Nationally</button>}</Link>
              
              
              <Link to="#" style={{ textDecoration: "none" }}>{local ? <button className="nav-link active1  butmargin" id="nav-contacts-tab " data-bs-toggle="tab" data-bs-target="#nav-contacts" type="button" role="tab" aria-controls="nav-contacts" aria-selected="false" name="locally" onClick={mainfunction}>Locally</button> : <button className="nav-link " id="nav-contacts-tab " data-bs-toggle="tab" data-bs-target="#nav-contacts" type="button" role="tab" aria-controls="nav-contacts" aria-selected="false" name="locally" onClick={mainfunction}>Locally</button>}</Link>



              <Link to="/Records" style={{ textDecoration: "none" }}><button className="nav-link   butmargin" id="nav-contacts-tab " data-bs-toggle="tab" data-bs-target="#nav-contacts" type="button" role="tab" aria-controls="nav-contacts" aria-selected="false" name="locally" onClick={mainfunction}>Records</button></Link>


              <form className="search-form form ms-auto" >
                {/* <label> */}
                <span className="screen-reader-text">Search for...</span>
                <input type="search" className="search-field" onChange={handleSearch} placeholder="Search for username" />
                {/* </label> */}
                <div className='searchbtnbox' >
                  <i className="fas fa-search" id='searicon'></i>
                  <input type="button" className="search-submit button" value="" />
                </div>
              </form>
            </div>

          </nav>
          <br />





        </div>



        <div className="container-fluid">
          <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade   show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">


              <div className="row">
              <div className="col-md-3 mb-2">

<div className="cardboxes ">
  <div className="headtext3">
    <p style={{color:"white"}}>All Ages</p>
  </div>
  <div className="subheadingcopy" style={{ marginTop: "19px" }}>
    {/* <table >
      <thead className="subheading3">
        <th>

          <tr  >
            <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ marginRight: "17px", width: "81px" }}>Rank</div></td>
            <td style={{ wordBreak: "break-all" }}><div className='subtable12' style={{ width: "81px" }}>Name</div></td>
            <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "15px" }} >Points</td></tr>

        </th>
      </thead>
    </table> */}
  </div>

  <div className='tablescroll'>
    <div className="subheadingcopy  ">
      <table className='tableallages'>
        <thead className="subheading3">


          <tr  >
            <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ marginRight: "17px", width: "81px", fontWeight: "700" }}>Rank</div></td>
            <td style={{ wordBreak: "break-all" }}><div className='subtable12' style={{ width: "81px", fontWeight: "700" }}>Name</div></td>
            <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "15px", fontWeight: "700" }} >Points</td></tr>

        </thead>

        <tbody>





          {AllAgesdata.map((number, key) =>
            <tr key={key} >
              <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>{number.position}</div></td>
              <td style={{ wordBreak: "break-all" }}><div className='subtable12' style={{ width: "81px" }}>{number.players_name}</div></td>
              <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "9px" }} >{parseInt(number.total_points) < 0 ? <span style={{ color: "red" }}>{number.total_points}</span> : <span >{number.total_points}</span>}</td></tr>
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
    <p style={{color:"white"}}>Under 18</p>
  </div>
  <div className="subheadingcopy" style={{ marginTop: "19px" }}>
    {/* <table >
      <thead className="subheading2">
        <th>

          <tr  >
            <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>Rank</div></td>
            <td style={{ wordBreak: "break-all" }}><div className='subtable12' style={{ width: "81px" }}>Name</div></td>
            <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "15px" }} >Points</td></tr>

        </th>
      </thead>
    </table> */}
  </div>


  <div className='tablescroll'>
    <div className="subheadingcopy">
      <table className='table18data'>
        <thead className="subheading2">


          <tr  >
            <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px", fontWeight: "700" }}>Rank</div></td>
            <td style={{ wordBreak: "break-all" }}><div className='subtable12' style={{ width: "81px", fontWeight: "700" }}>Name</div></td>
            <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "15px", fontWeight: "700" }} >Points</td></tr>


        </thead>

        <tbody>


          {under18data.map((number, key) =>
            <tr key={key} >
              <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>{number.position}</div></td>
              <td style={{ wordBreak: "break-all" }}><div className='subtable12' style={{ width: "81px" }}>{number.players_name}</div></td>
              <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "15px" }} >{parseInt(number.total_points) < 0 ? <span style={{ color: "red" }}>{number.total_points}</span> : <span >{number.total_points}</span>}</td></tr>
          )}





        </tbody>
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
                      {/* <table >
                        <thead className="subheading1">
                          <th>

                            <tr  >
                              <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>Rank</div></td>
                              <td style={{ wordBreak: "break-all" }}><div className='subtable12' style={{ width: "81px" }}>Name</div></td>
                              <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "15px" }} >Points</td></tr>

                          </th>
                        </thead>
                      </table> */}
                    </div>
                    <div className='tablescroll'>
                      <div className="subheadingcopy">
                        <table className='table15data'>
                          <thead className="subheading1">


                            <tr  >
                              <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px", fontWeight: "700" }}>Rank</div></td>
                              <td style={{ wordBreak: "break-all" }}><div className='subtable12' style={{ width: "81px", fontWeight: "700" }}>Name</div></td>
                              <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "15px", fontWeight: "700" }} >Points</td></tr>


                          </thead>
                          <tbody>






                            {under15data.map((number, key) =>
                              <tr key={key} >
                                <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>{number.position}</div></td>
                                <td style={{ wordBreak: "break-all" }}><div className='subtable12' style={{ width: "81px" }}>{number.players_name}</div></td>
                                <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "15px" }} >{parseInt(number.total_points) < 0 ? <span style={{ color: "red" }}>{number.total_points}</span> : <span >{number.total_points}</span>}</td></tr>
                            )}





                          </tbody>
                        </table>
                      </div>
                    </div>
                    <br />

                  </div>


                </div>
               


                <div className="col-md-3  mb-2">
                  <div className="cardboxes ">
                    <div className="headtext">
                      <p style={{color:"white"}}>Under 11</p>
                    </div>
                    <div className="subheadingcopy" style={{ marginTop: "19px" }}>
                      {/* <table >
                        <thead className="subheading">
                          <th>

                            <tr  >
                              <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>Rank</div></td>
                              <td style={{ wordBreak: "break-all" }}><div className='subtable12' style={{ width: "81px" }}>Name</div></td>
                              <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "15px" }} >Points</td></tr>

                          </th>
                        </thead>
                      </table> */}
                    </div>
                    <div className='tablescroll'>
                      <div className="subheadingcopy">
                        <table className='table11data'>

                          <thead className="subheading">
                            <tr >
                              <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px", fontWeight: "700" }}>Rank</div></td>
                              <td style={{ wordBreak: "break-all" }}><div className='subtable12' style={{ width: "81px", fontWeight: "700" }}>Name</div></td>
                              <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "15px", fontWeight: "700" }} >Points</td></tr>
                          </thead>
                          <tbody>




                            {under11data.map((number, key) =>
                              <tr key={key} >
                                <td style={{ paddingLeft: "20px" }}><div className='subtable12' style={{ width: "81px" }}>{number.position}</div></td>
                                <td style={{ wordBreak: "break-all" }}><div className='subtable12' style={{ width: "81px" }}>{number.players_name}</div></td>
                                <td className='ms-auto' style={{ width: "2%", textAlign: "right", paddingRight: "15px" }} >{parseInt(number.total_points) < 0 ? <span style={{ color: "red" }}>{number.total_points}</span> : <span >{number.total_points}</span>}</td></tr>
                            )}





                          </tbody>
                        </table>
                      </div>
                    </div>


                  </div>
                </div>
               
              </div>







            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <Sharehook />
          </div>
          <Bannerad />

        </div>





      </>}

  </>;
}
