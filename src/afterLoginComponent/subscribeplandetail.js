import { useEffect, useState } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";

import { Link } from "react-router-dom"

// const amount = "2.00"
const currency = "USD";
const style = { "layout": "vertical" };

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ packageid, transpop, transvalue, countvalue, col, msg, pop, changestate, amount, currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);


    return (<>
        {(showSpinner && isPending) && <div className="spinner" />}
        <PayPalButtons
            style={style}
            disabled={false}
            forceReRender={[amount, currency, style]}
            fundingSource={undefined}
            createOrder={(data, actions) => {
                return actions.order
                    .create({
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: currency,
                                    value: amount,
                                },
                            },
                        ]
                    })
                    .then((orderId) => {
                        // Your code here after create the order
                        return orderId;
                    });
            }}
            onApprove={async function (data, actions) {
                return actions.order.capture().then(async function (response) {
                    if (response.status === "COMPLETED") {
                        changestate(false)

                        msg("Your Transaction has been Successfull")
                        pop(true)
                        col("#00c767")
                        transvalue([{
                            "TransactionId": response.purchase_units[0].payments.captures[0].id,
                            "TotalHint": countvalue,
                            "PaidAmount": amount
                        }])
                        transpop(true)
                        const url3 = `${process.env.REACT_APP_URL}/api/buyPackage`

                        var myHeaders = new Headers();
                        myHeaders.append(
                            'APPKEY',
                            'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
                        );

                        var formdata = new FormData();
                        formdata.append("user_id", window.sessionStorage.getItem("id"));
                        formdata.append("package_id", packageid)
                        formdata.append("payment_id", response.purchase_units[0].payments.captures[0].id);
                        formdata.append("amount", amount)
                        formdata.append("bankname", "")
                        formdata.append("coupon_code", "")
                        formdata.append("payment_status", "1")
                        formdata.append("transaction_id", response.purchase_units[0].payments.captures[0].id);

                        await fetch(url3, {
                            method: 'POST',
                            headers: myHeaders,
                            body: formdata,
                            redirect: 'follow',
                        }).then((resp) => resp.json())
                            .then(async (resp) => {

                                if (resp.status === 200 && resp.message === "Success") {


                                }
                            })



                    } else {
                        msg("Your Transaction has been Failed")
                        changestate(false)
                        pop(true)
                        col("#C70100")
                        transpop(false)
                        const url3 = `${process.env.REACT_APP_URL}/api/buyPackage`

                        myHeaders = new Headers();
                        myHeaders.append(
                            'APPKEY',
                            'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
                        );

                        formdata = new FormData();
                        formdata.append("user_id", window.sessionStorage.getItem("id"));
                        formdata.append("package_id", packageid)
                        formdata.append("payment_id", "00000");
                        formdata.append("amount", amount)
                        formdata.append("bankname", "")
                        formdata.append("coupon_code", "")
                        formdata.append("payment_status", "0")
                        formdata.append("transaction_id", "00000");

                        await fetch(url3, {
                            method: 'POST',
                            headers: myHeaders,
                            body: formdata,
                            redirect: 'follow',
                        }).then((resp) => resp.json())
                            .then(async (resp) => {

                                if (resp.status === 200 && resp.message === "Success") {


                                }
                            })

                    }
                });

            }}
            onError={async function (err) {

            }}
        />
    </>
    );
}
export default function Subscribeplan() {
    const [paypalstate, setpaypalState] = useState(true)
    const [currencyamount, setcurrencyamount] = useState("")
    const [count, setcount] = useState("")
    const [showpop, setshowpop] = useState(false)
    const [messagevalue, setmessagevalue] = useState("")
    const [transactionpop, settransactionpop] = useState(false)
    const [color, setcolor] = useState("")
    const [plandata, setPlandata] = useState([{ Title: "", Duration: "", Level: "", Hints: "", Price: "", id: "" }])
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [transactiondetail, settransactiondetail] = useState([{ "TransactionId": "0", "TotalHint": "0", "PaidAmount": "0" }])

    useEffect(() => {
        let bodyElement = document.getElementsByTagName('body')[0];
        bodyElement.className = "";
    })
    useEffect(() => {
        const url3 = `${process.env.REACT_APP_URL}/api/user/profile?id=` + window.sessionStorage.getItem("id");
        var myHeaders = new Headers();
        myHeaders.append(
            'APPKEY',
            'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
        );
        fetch(url3, {
            headers: myHeaders
        }).then((response) => response.json())
            .then((response) => {
                if (response.status === 200) {

                    setname(response.data.name)
                    setemail(response.data.email)






                } else {

                }


            })
        const url2 = `${process.env.REACT_APP_URL}/api/packageAvailable?user_id=` + window.sessionStorage.getItem("id");
        myHeaders = new Headers();
        myHeaders.append(
            'APPKEY',
            'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
        );
        fetch(url2, {
            headers: myHeaders
        }).then((response) => response.json())
            .then((response) => {
                if (response.status === 200) {

                    setPlandata([{ id: response.data.id, Title: response.data.title, Duration: response.data.duration_months, Level: (response.data.levels === 1, 2, 3, 4 ? "Easy,Medium,Expert,Genius" : response.data.levels), Hints: response.data.hints, Price: response.data.price }])





                } else {

                }


            })

    }, [])
    function payamount(e) {
        setcount(e.target.value)
        var value = e.target.name

        setpaypalState(false)
        setcurrencyamount(value)

    }
    return (
        <div>

            {showpop ?
                <div className='modalmaindiv' id='welcomeDiv1'>
                    <div className='modaldiv'>
                        <div className=" cardbox " style={{ backgroundColor: color }} >

                            <p className='text-center text-white'><h3>{messagevalue}</h3></p>
                            <br />
                            {transactionpop ? <>
                                <div className="row" style={{ transform: "translate(71px, 10px)" }}>
                                    <div className="col-md-4 text-center text-white" >
                                        <h5>Transaction Id:</h5>
                                    </div>
                                    <div className="col-md-4 text-center text-white" >
                                        <h5>{transactiondetail[0].TransactionId}</h5>
                                    </div>
                                </div>
                                <br />
                                {/* <div className="row" style={{transform:"translate(71px, 10px)"}}>
            <div className="col-md-4 text-center text-white" >
            <h5>Total Hint:</h5>
            </div>
            <div className="col-md-4 text-center text-white" >
            <h5>{transactiondetail[0].TotalHint}</h5>
            </div>
        </div>
        <br/> */}
                                <div className="row" style={{ transform: "translate(71px, 10px)" }}>
                                    <div className="col-md-4 text-center text-white" >
                                        <h5>Paid Amount:</h5>
                                    </div>
                                    <div className="col-md-4 text-center text-white" >
                                        <h5>${transactiondetail[0].PaidAmount}</h5>
                                    </div>
                                </div>
                                <br />
                            </> : ""}




                            <div style={{
                                display: "flex",
                                justifyContent: "center"
                            }}>
                                <div style={{ display: "flex", justifyContent: "center" }} >
                                    <button type="button" className="mainroundbtn1 roundbtn" onClick={() => {
                                        setshowpop(false); window.sessionStorage.clear();
                                        window.location.reload();
                                        window.open("/", "_self")
                                    }} style={{ width: "200px" }}> OK</button>

                                </div>

                            </div>




                        </div>
                    </div>
                </div>
                : ""}
            {paypalstate ? <>
                <div className="Dashbord">
                    <div className='subscribe1'>
                        <Link to="/Subscribeplan"> <button className="buttonboxexit" >EXIT</button></Link>
                        <br />
                        <br />

                        <h4 style={{ textAlign: "left", fontFamily: "Times New Roman, Times, serif", color: "rgb(0, 132, 253)" }}>Package name :</h4>


                        <div className="card cardplan"  >

                            <div className="card-body">
                                <div className='row'>
                                    <div className='col-md-5 col-sm-3'>
                                        <h6>Package type :</h6>
                                    </div>
                                    <div className='col-md-6'>
                                        <h6>{plandata[0].Title}</h6>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-5'>
                                        <h6>Levels Included :</h6>
                                    </div>
                                    <div className='col-md-7'>
                                        <h6>{plandata[0].Level}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card cardplan" >
                            <div className="card-body">
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <h6>{name}</h6>
                                    </div>
                                    <div className='col-md-12'>
                                        <h6>{email}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card cardplan" >
                            <div className="card-body">
                                <div className='row'>
                                    <div className='col-md-5'>
                                        <h6>Duration :</h6>
                                    </div>
                                    <div className='col-md-6'>
                                        <h6>{plandata[0].Duration} Month</h6>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-md-5'>
                                        <h6>Hints :</h6>
                                    </div>
                                    <div className='col-md-6'>
                                        <h6>{plandata[0].Hints}</h6>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-5'>
                                        <h6>Price :</h6>
                                    </div>
                                    <div className='col-md-6'>
                                        <h6>{plandata[0].Price}</h6>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-5'>
                                        <h6>Tax :</h6>
                                    </div>
                                    <div className='col-md-6'>
                                        <h6>12%</h6>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <hr style={{ color: "rgb(1 142 254)", height: "2px", opacity: 1 }}></hr>
                        {/* <div className='row'>
               <div className='col-md-4'>
                   <input type="text" placeholder='Enter coupan' style={{border: "none",borderBottom: "2px solid #0090fd",backgroundColor:"transparent"}}/>
               </div>
               <div className='col-md-4'>
                <p style={{fontFamily:"Times New Roman, Times, serif",color:"rgb(0, 132, 253)",cursor:"pointer",fontWeight:"700"}}> Apply</p>
               </div>
           </div> */}

                        <div className="card cardplan" style={{ marginTop: "10px", backgroundColor: "transparent" }} >
                            <div className="card-body">
                                <div className='row'>
                                    <div className='col-md-10'>
                                        <h3 style={{ color: "rgb(0, 132, 253)" }}>Total : <span style={{ color: "white" }}>&#xa3; {(((parseFloat(plandata[0].Price) * 12) / 100) + parseFloat(plandata[0].Price)).toFixed(2)}  </span></h3>
                                    </div>
                                    <div className='col-md-2'>

                                        <button type="button" className='paymentbtn' style={{ fontSize: "20px", width: "100px", transform: "translate(-13px, -7px)" }} name={(((parseFloat(plandata[0].Price) * 12) / 100) + parseFloat(plandata[0].Price)).toFixed(2)} value="10" onClick={payamount}>PAY</button>

                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </> :
                <>
                    <br /><br /><br /><br /><br /><br />
                    <div className='App' >

                        <p style={{ float: "right" }}>USD: ${currencyamount}</p>
                        <br />
                        <PayPalScriptProvider
                            options={{
                                "client-id": "AYScJLLFzh9r-mZwpVWVvLmNwWuuME4ayvP1W-ym9H8J2nbpbW8MAz5kAdF5uzcajbQpNojCT5q-RPae",
                                components: "buttons",
                                currency: "USD"
                            }}
                        >
                            <ButtonWrapper
                                packageid={plandata[0].id}
                                transpop={settransactionpop}
                                transvalue={settransactiondetail}
                                countvalue={count}
                                col={setcolor}
                                pop={setshowpop}
                                msg={setmessagevalue}
                                changestate={setpaypalState}
                                amount={currencyamount}
                                currency={currency}
                                showSpinner={false}
                            />
                        </PayPalScriptProvider>
                    </div>
                </>
            }

        </div>
    );
}





