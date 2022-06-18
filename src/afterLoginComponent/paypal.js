import { useEffect, useState } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import Menubar from './Menubar';
import { Link } from "react-router-dom"

// const amount = "2.00"
const currency = "USD";
const style = { "layout": "vertical" };

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
                        const url3 = `${process.env.REACT_APP_URL}/api/buyHints`

                        var myHeaders = new Headers();
                        myHeaders.append(
                            'APPKEY',
                            'Py9YJXgBecbbqxjRVaHarcSnJyuzhxGqJTkY6xKZRfrdXFy72HPXvFRvfEjy'
                        );
                        var formdata = new FormData();
                        formdata.append("user_id", window.sessionStorage.getItem("id"));
                        formdata.append("count", countvalue)
                        formdata.append("amount", amount)
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

                    }
                });

            }}
            onError={async function (err) {

            }}
        />
    </>
    );
}
export default function Paypal(props) {
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
    return (
        <div>

            <Menubar setpop={setsettingshow} audioRef={props.audio} />
            
            {showpop ?
                <div className='modalmaindiv' id='welcomeDiv1'>
                    <div className='modaldiv'>
                        <div className=" cardbox " style={{ backgroundColor: color }} >

                            <p className='text-center text-white'><h4>{messagevalue}</h4></p>
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
                                        <h5>Total Hint:</h5>
                                    </div>
                                    <div className="col-md-4 text-center text-white" >
                                        <h5>{transactiondetail[0].TotalHint}</h5>
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
                                    <Link to="/Dashboard"><button type="button" className="mainroundbtn1 roundbtn" onClick={() => { setshowpop(false) }} style={{ width: "200px" }}> OK</button></Link>

                                </div>
                                {/* <Link to="Dashboard"><div className="mainroundbtn1" onClick={()=>{ setshowpop(false)}}>
<img src="./nextplaybutton.png" className="roundbtn" style={{transform:"translate(38px, 2px)",width:"68%"}} alt="..."/>
</div></Link>
      */}
                            </div>




                        </div>
                    </div>
                </div>
                : ""}
            {paypalstate ? <>   
                <div className='container-fluid' >

                    <div className="containermain">
                        <div className="paypalbox">

                            <div className="container" style={{color:"black",backgroundImage: "linear-gradient(#0170cd, #0170cd)",padding:"20px",borderRadius:"5px"}}>
                                <b><h4 className="text-center color-white-payment-plan" style={{ fontWeight: "700", fontFamily: "Times New Roman, Times, serif" }}>Hint Packages</h4></b>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5 className="color-white-payment-plan ">10 Hints for &#xa3;1.00</h5>
                                    </div>
                                    <div className="col-md-4">

                                    </div>
                                    <div className="col-md-2">
                                        <button type="text" className="btn mediumlevel" name="1.00" value="10" onClick={payamount}>BUY</button>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5 className="color-white-payment-plan ">20 Hints for &#xa3;1.50</h5>
                                    </div>
                                    <div className="col-md-4">

                                    </div>
                                    <div className="col-md-2">
                                        <button type="text" className="btn mediumlevel" name="1.50" value="20" onClick={payamount}>BUY</button>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5 className="color-white-payment-plan ">30 Hints for &#xa3;2.00</h5>
                                    </div>
                                    <div className="col-md-4">

                                    </div>
                                    <div className="col-md-2">
                                        <button type="text" className="btn mediumlevel" name="2.00" value="30" onClick={payamount}>BUY</button>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5 className="color-white-payment-plan ">50 Hints for &#xa3;3.00</h5>
                                    </div>
                                    <div className="col-md-4">

                                    </div>
                                    <div className="col-md-2">
                                        <button type="text" className="btn mediumlevel" name="3.00" value="50" onClick={payamount}>BUY</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div></> :
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