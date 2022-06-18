import React, { useEffect, useState } from 'react'


export default function Bannerad() {
  const [data, setData] = useState([])
  const [firstdata, setfirst] = useState([])
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append(
      'APPKEY',
      'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
    );
    const url1 = `${process.env.REACT_APP_URL}/api/getApplink`
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

        var postData1 = <div className="carousel-item active" ><a href={resp.data[0].url} rel="noreferrer" target={"_blank"}><img src={resp.image_path + "/" + resp.data[0].image} className="d-block w-100" style={{ height: "100px", borderRadius: "5px" }} alt="" /></a></div>
        setfirst(postData1)
        var postData = resp.data.length > 1 && resp.data.slice(1, resp.data.length).map((pd, Key) => <div key={Key} className="carousel-item">

          <a href={pd.url} rel="noreferrer" target={"_blank"}>   <img src={resp.image_path + "/" + pd.image} className="d-block w-100 h-80" style={{ height: "100px", borderRadius: "5px" }} alt="" /></a>
        </div>)
        setData(postData)
      }
    })
  }, [])
  return (
    <>
      <div className="container">

        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            {firstdata}
            {data}
          </div>


        </div>
      </div>

      <br />

    </>

  )
}
