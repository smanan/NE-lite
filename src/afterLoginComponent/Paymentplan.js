import { useEffect, useState } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import Menubar from './Menubar';

// const amount = "2.00"
const currency = "USD";
const style = { "layout": "vertical" };

var currentDate = new Date()
var day = currentDate.getDate()
var month = currentDate.getMonth() + 1
var year = currentDate.getFullYear()

var monthTrack={1:"Jan",2:"Feb",3:"Mar",4:"Apr",5:"May",6:"Apr",7:"May",8:"Jun",9:"Jul",10:"Oct",11:"Nov",12:"Dec"}

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ transpop, transvalue, countvalue, col, msg, pop, changestate, amount, currency, showSpinner }) => {
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
                        changestate(true)

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
                        formdata.append("package_id", countvalue)
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
                        changestate(true)
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
                        formdata.append("package_id", countvalue)
                        formdata.append("payment_id", "0000");
                        formdata.append("amount", amount)
                        formdata.append("bankname", "")
                        formdata.append("coupon_code", "")
                        formdata.append("payment_status", "0")
                        formdata.append("transaction_id", "");

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
export default function Paymentplan(props) {
    const [settingshow, setsettingshow] = useState(props.setting)
    const [paypalstate, setpaypalState] = useState(true)
    const [currencyamount, setcurrencyamount] = useState("")
    const [count, setcount] = useState("")
    const [showpop, setshowpop] = useState(false)
    const [messagevalue, setmessagevalue] = useState("")
    const [transactionpop, settransactionpop] = useState(false)
    const [color, setcolor] = useState("")
       const [transactiondetail, settransactiondetail] = useState([{ "TransactionId": "0", "TotalHint": "0", "PaidAmount": "0" }])
    
    
    useEffect(() => {
        let bodyElement = document.getElementsByTagName('body')[0];
        bodyElement.className = "Dashbord";


    },[])
    function payamount(e) {
        setcount(e.target.value)
        var value = e.target.name

        setpaypalState(false)
        setcurrencyamount(value)

    }
    function getweek() {
        var date = new Date(window.sessionStorage.getItem("createdAt")).getFullYear() + "-" + (new Date(window.sessionStorage.getItem("createdAt")).getMonth() + 1) + "-" + new Date(window.sessionStorage.getItem("createdAt")).getDate()
        var firstDay = new Date(date);
        var nextWeek = new Date(firstDay.getTime() +1* 24 * 60 * 60 * 1000);
    
        nextWeek.setMinutes(nextWeek.getMinutes() + nextWeek.getTimezoneOffset())
    
    
        let dateStr = nextWeek.getDate() + "-" + ((nextWeek.getMonth() + 1) < 10 ? "0" + (nextWeek.getMonth() + 1) : (nextWeek.getMonth() + 1)) + "-" + nextWeek.getFullYear();
       
        return dateStr;
        
      }
    return (
        <div>

            <Menubar setpop={setsettingshow} audioRef={props.audio} />
            
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
                                {/* <Link to="Dashbord"><div className="mainroundbtn1" onClick={()=>{ setshowpop(false)}}>
<img src="./nextplaybutton.png" className="roundbtn" style={{transform:"translate(38px, 2px)",width:"68%"}} alt="..."/>
</div></Link>
      */}
                            </div>
                            {/* <div style={{display: "flex",
    justifyContent: "center"}}>
<div className="mainroundbtn1" onClick={()=>{ setshowpop(false);window.sessionStorage.clear();
    window.location.reload();
    window.open("/", "_self")}}>
<img src="./nextplaybutton.png" className="roundbtn" style={{transform:"translate(38px, 2px)",width:"68%"}} alt="..."/>
</div>
     
    </div> */}




                        </div>
                    </div>
                </div>
                : ""}
            {paypalstate ? <>
                <div className='container-fluid' >
                    <div className="containermain">
                        <div className="paypalbox1">
                          
                           
                            <div className="container" style={{color:"black",backgroundImage: "linear-gradient(#0170cd, #0170cd)",padding:"20px",borderRadius:"5px"}}> 
                                {/* <b><h5 className="text-center" style={{ fontWeight: "600" }}>NE LITE FEES</h5></b> */}
                                <div className="row ">
                                    <p className="color-white-payment-plan "> <b>NE <i> Lite</i> is free to download and play for a week from  <b> { String(day) + "/" + String(monthTrack[month]) + "/" + String(year)  }</b>
 </b></p>
                                </div>
                                <div className="row" >
                                    <div className="col-md-12" style={{ marginTop: "5px" }}>
                                       <p className="color-white-payment-plan "><b>After one week, you will lose access to the game unless you
                                       buy the game 
                                           {/* purchase the game for either */}
                                           </b></p>
                                        {/* <p>If purchased within 7 days of download - &#xa3;0.49 a month payable as &#xa3;5.88 for the year. You download the app on <span style={{ color: "blue" }}>{date.current}</span> so purchase by <span style={{ color: "blue" }}>{dateweek.current}</span> to qualify for the early bird fee. You will own and be able to play NE Lite until <span style={{ color: "blue" }}>{dateyear.current} </span></p> */}
                                    </div>


                                </div>
                                <div>
                                    <br/>
                               <div className="row" style={{textAlign:"center"}}>
                                   <div className="col-md-12" style={{display: "flex",flexDirection: "column"}}>
                                   <table >
                                       <thead style={{borderBottom:"1px solid #fff"}}>
                                          
                                           <td className="color-white-payment-plan " style={{width:"100px",fontWeight:"700"}}>
                                           Sr.No
                                            </td>
                                            <td className="color-white-payment-plan " style={{width:"100px",fontWeight:"700"}}>
                                            Price
                                            </td>
                                            <td className="color-white-payment-plan" style={{width:"100px",fontWeight:"700"}}>
                                            Duration
                                            </td>
                                            <td className="color-white-payment-plan" style={{width:"100px",fontWeight:"700"}}>
                                           Action
                                            </td>
                                          
                                       </thead>
                                       <br/>
                                    <tbody >
                                        <tr>
                                            <td className="color-white-payment-plan " style={{width:"100px",fontWeight:"700"}}>
                                            (1) 
                                            </td>
                                            <td className="color-white-payment-plan" style={{width:"100px",fontWeight:"700"}}>
                                            $ 15
                                            </td>
                                            <td className="color-white-payment-plan " style={{width:"100px",fontWeight:"700"}}>
                                            6 Months
                                            </td>
                                            <td className="color-white-payment-plan " style={{width:"100px",fontWeight:"700"}}>
                                            {window.sessionStorage.getItem("subscribe") !== "" ? <button type="text" className="btn mediumlevel" name="15" value="1" disabled={"true"} onClick={payamount}>Buy Now</button> : <button type="text" className="btn mediumlevel" name="15" value="1" onClick={payamount}>Buy Now</button>}
                                            </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                    <br/>
                                  
                                    {/* <div className="container-fluid">
                                    <div className="row">
                                      <div className="col-md-12">
                                      <h5><b>OR</b></h5>
                                      </div>
                                  </div>
                                    </div> */}

                                 
                                   
                                    <table>
                                    <tbody>
                                            <tr > 
                                            <td className="color-white-payment-plan " style={{width:"100px",fontWeight:"700"}}>
                                            (2)
                                            </td>
                                            <td className="color-white-payment-plan " style={{width:"100px",fontWeight:"700"}}>
                                            $ 18
                                            </td>
                                            <td className="color-white-payment-plan " style={{width:"100px",fontWeight:"700"}}>
                                            12 Months
                                            </td>
                                            <td className="color-white-payment-plan " style={{width:"100px",fontWeight:"700"}}>
                                            {window.sessionStorage.getItem("subscribe") !== "" ? <button type="text" className="btn mediumlevel" name="18" value="1" disabled={"true"} onClick={payamount}>Buy Now</button> : <button type="text" className="btn mediumlevel" name="18" value="1" onClick={payamount}>Buy Now</button>}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                   </div>
                               </div>
                                </div>
                               
                               
                               
                                {/* <div className="row" style={{marginTop:"5px"}}>
                            <div className="col-md-11">
                                <b>FOR SCHOOLS ONLY</b>
                            </div>
                        
                            <div className="col-md-2">
                                <button type="text" className="btn mediumlevel" name="0.00" value="50" >Buy Now</button>
                            </div>
                        </div> */}
                            </div>
                        </div>
                    </div>
                </div> </> :
                <>
                    <br /><br /><br /><br /><br /><br />
                    <div className='App' style={{color:"white"}}>

                        <p style={{ float: "right",color:"white" }}>USD: ${currencyamount}</p>
                        <br />
                        <PayPalScriptProvider
                            options={{
                                "client-id": "AYScJLLFzh9r-mZwpVWVvLmNwWuuME4ayvP1W-ym9H8J2nbpbW8MAz5kAdF5uzcajbQpNojCT5q-RPae",
                                components: "buttons",
                                currency: "USD"
                            }}
                        >
                            <ButtonWrapper
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