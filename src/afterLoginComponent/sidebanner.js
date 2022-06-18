import React, { useEffect, useState } from 'react'


export default function Sidebanner() {

  const [firstdata, setfirst] = useState([])
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append(
      'APPKEY',
      'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
    );
    const url1 = `${process.env.REACT_APP_URL}/api/getCampaigns`
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

        var postData1 = <a href={resp.data[0].header_url} rel="noreferrer" target={"_blank"}><img src={resp.image_path + "/" + resp.data[0].header_file} style={{ width: "100%", height: "407px", borderRadius: "5px" }} alt="" /></a>
        setfirst(postData1)

      }
    })
  }, [])
  return (
    <>
      {firstdata}



    </>

  )
}
