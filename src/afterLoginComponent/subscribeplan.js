import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

export default function Subscribeplan() {
    const [plandata, setPlandata] = useState([{ Title: "", Duration: "", Level: "", Hints: "", Price: "" }])
    useEffect(() => {
        let bodyElement = document.getElementsByTagName('body')[0];
        bodyElement.className = "Dashbord";
    })
    useEffect(() => {
        const url2 = `${process.env.REACT_APP_URL}/api/packageAvailable?user_id=` + window.sessionStorage.getItem("id");
        var myHeaders = new Headers();
        myHeaders.append(
            'APPKEY',
            'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
        );
        fetch(url2, {
            headers: myHeaders
        }).then((response) => response.json())
            .then((response) => {
                if (response.status === 200) {

                    setPlandata([{ Title: response.data.title, Duration: response.data.duration_months, Level: (response.data.levels === 1, 2, 3, 4 ? "Easy,Medium,Expert,Genius" : response.data.levels), Hints: response.data.hints, Price: response.data.price }])





                } else {

                }


            })

    }, [])
    return (
        <>

            <div className='subscribe'>
                <Link to="/Dashboard"> <h1 style={{ float: 'right', fontFamily: "Times New Roman, Times, serif", color: "black" }}>Skip</h1></Link>
                <br /><br /><br />
                <h1 style={{ textAlign: "center", fontFamily: "Times New Roman, Times, serif", fontWeight: "800" }}>Your Plan</h1>

                <br />

                <div style={{ margin: "5%" }}>
                    <div className='row'>
                        <div className='col-md-5'>
                            <h4>Title :</h4>
                        </div>
                        <div className='col-md-6'>
                            <h4>{plandata[0].Title}</h4>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-5'>
                            <h4>Duration Months :</h4>
                        </div>
                        <div className='col-md-6'>
                            <h4>{plandata[0].Duration}</h4>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-5'>
                            <h4>Level :</h4>
                        </div>
                        <div className='col-md-4'>
                            <h4>{plandata[0].Level}</h4>
                        </div>
                    </div>
                    <br />
                    <div className='row'>
                        <div className='col-md-5'>
                            <h4>Hints :</h4>
                        </div>
                        <div className='col-md-6'>
                            <h4>{plandata[0].Hints}</h4>
                        </div>
                    </div>
                    <br></br>
                    <div className='row'>
                        <div className='col-md-5'>
                            <h2>Price :</h2>
                        </div>
                        <div className='col-md-6'>
                            <h2>&#xa3;{plandata[0].Price}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className='paybutton'>
                <Link to="/Subscribeplandetail"><button type="button" className='payplan'>PAY</button></Link>
            </div>


        </>

    )
}
